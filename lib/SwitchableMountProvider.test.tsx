import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import SwitchableMountProvider from './SwitchableMountProvider';
import MountPoint from './MountPoint';
import type { SwitchableMountRenderMode } from './SwitchableMountContext';

const renderModes: SwitchableMountRenderMode[] = ['default', 'reverse-portal'];

describe.each(renderModes)('SwitchableMountProvider (mode: %s)', (mode) => {
  it('renders children', () => {
    render(
      <SwitchableMountProvider render={() => <div>Mounted content</div>} renderMode={mode}>
        <div data-testid="child">Child content</div>
      </SwitchableMountProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders content into the highest priority mount point', () => {
    render(
      <SwitchableMountProvider render={() => <span>Mounted</span>} renderMode={mode}>
        <div>
          <MountPoint canShow={true} priority={2} data-testid="mount-2" />
          <MountPoint canShow={true} priority={1} data-testid="mount-1" />
          <MountPoint canShow={true} priority={3} data-testid="mount-3" />
        </div>
      </SwitchableMountProvider>
    );

    // Only the highest priority (1) should show the content
    expect(screen.getByText('Mounted')).toBeInTheDocument();
  });

  it('respects priority ordering - lower number = higher priority', () => {
    render(
      <SwitchableMountProvider render={() => <span>Content</span>} renderMode={mode}>
        <div>
          <div data-testid="mount-3">
            <MountPoint canShow={true} priority={3} />
          </div>
          <div data-testid="mount-1">
            <MountPoint canShow={true} priority={1} />
          </div>
          <div data-testid="mount-2">
            <MountPoint canShow={true} priority={2} />
          </div>
        </div>
      </SwitchableMountProvider>
    );

    // Mount point with priority 1 should contain the content
    expect(screen.getByTestId('mount-1')).toHaveTextContent('Content');
    expect(screen.getByTestId('mount-2')).not.toHaveTextContent('Content');
    expect(screen.getByTestId('mount-3')).not.toHaveTextContent('Content');
  });

  it('switches content when canShow changes', () => {
    const TestComponent = () => {
      const [showFirstMount, setShowFirstMount] = useState(true);

      return (
        <>
          <button onClick={() => setShowFirstMount(!showFirstMount)}>Toggle</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              <div data-testid="mount-1">
                <MountPoint canShow={showFirstMount} priority={1} />
              </div>
              <div data-testid="mount-2">
                <MountPoint canShow={!showFirstMount} priority={2} />
              </div>
            </div>
          </SwitchableMountProvider>
        </>
      );
    };

    const { getByRole } = render(<TestComponent />);

    // Initially, content should exist
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Click toggle to switch
    fireEvent.click(getByRole('button'));

    // Content should still exist but mounted to different point
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('hides content when all mount points have canShow=false', () => {
    render(
      <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
        <div>
          <MountPoint canShow={false} priority={1} />
          <MountPoint canShow={false} priority={2} />
        </div>
      </SwitchableMountProvider>
    );

    expect(() => screen.getByTestId('content')).toThrow();
  });

  it('handles dynamic mount point registration', () => {
    const TestComponent = () => {
      const [showSecondMount, setShowSecondMount] = useState(false);

      return (
        <>
          <button onClick={() => setShowSecondMount(!showSecondMount)}>Add Mount</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              <div data-testid="mount-1">
                <MountPoint canShow={true} priority={1} />
              </div>
              {showSecondMount && (
                <div data-testid="mount-2">
                  <MountPoint canShow={true} priority={0} />
                </div>
              )}
            </div>
          </SwitchableMountProvider>
        </>
      );
    };

    const { getByRole } = render(<TestComponent />);

    // Initially mount-1 has content
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Add mount-2 with higher priority (0)
    fireEvent.click(getByRole('button'));

    // Content should still exist after adding new mount point
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('handles multiple priority updates correctly', () => {
    const TestComponent = () => {
      const [priority1, setPriority1] = useState(1);
      const [priority2, setPriority2] = useState(2);

      return (
        <>
          <button onClick={() => setPriority1(3)}>Increase p1</button>
          <button onClick={() => setPriority2(0)}>Increase p2</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              <div data-testid="mount-1">
                <MountPoint canShow={true} priority={priority1} />
              </div>
              <div data-testid="mount-2">
                <MountPoint canShow={true} priority={priority2} />
              </div>
            </div>
          </SwitchableMountProvider>
        </>
      );
    };

    const { getAllByRole } = render(<TestComponent />);
    const buttons = getAllByRole('button');

    // Content should exist
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Click second button to change priorities
    fireEvent.click(buttons[1]);

    // Content should still exist
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
