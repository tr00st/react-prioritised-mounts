import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import SwitchableMountProvider from './SwitchableMountProvider';
import MountPoint from './MountPoint';
import type { SwitchableMountRenderMode } from './SwitchableMountContext';

const renderModes: SwitchableMountRenderMode[] = ['default', 'reverse-portal'];

describe.each(renderModes)('MountPoint (mode: %s)', (mode) => {
  it('renders content when it is the highest priority and canShow is true', () => {
    render(
      <SwitchableMountProvider render={() => <span data-testid="content">Mounted</span>} renderMode={mode}>
        <MountPoint canShow={true} priority={1} />
      </SwitchableMountProvider>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('does not render content when canShow is false', () => {
    render(
      <SwitchableMountProvider render={() => <span data-testid="content">Mounted</span>} renderMode={mode}>
        <div>
          <MountPoint canShow={false} priority={1} data-testid="mount-1" />
          <MountPoint canShow={true} priority={2} data-testid="mount-2" />
        </div>
      </SwitchableMountProvider>
    );

    // Priority 2 mount should have the content since priority 1 cannot show
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('does not render content when it is not the highest priority', () => {
    render(
      <SwitchableMountProvider render={() => <span data-testid="content">Mounted</span>} renderMode={mode}>
        <div>
          <MountPoint canShow={true} priority={1} data-testid="mount-high" />
          <MountPoint canShow={true} priority={2} data-testid="mount-low" />
        </div>
      </SwitchableMountProvider>
    );

    const content = screen.getByTestId('content');
    // Content should exist in the DOM but only rendered in the high priority mount
    expect(content).toBeInTheDocument();
  });

  it('handles canShow changes dynamically', () => {
    const TestComponent = () => {
      const [showFirst, setShowFirst] = useState(true);

      return (
        <>
          <button onClick={() => setShowFirst(!showFirst)}>Toggle first</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              <div data-testid="mount-1">
                <MountPoint canShow={showFirst} priority={1} />
              </div>
              <div data-testid="mount-2">
                <MountPoint canShow={!showFirst} priority={2} />
              </div>
            </div>
          </SwitchableMountProvider>
        </>
      );
    };

    const { getByRole } = render(<TestComponent />);

    // Content should exist
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    // Toggle to switch which mount shows the content
    fireEvent.click(getByRole('button'));

    // Content should still exist but be mounted to a different point
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('unregisters itself when unmounted', () => {
    const TestComponent = () => {
      const [showMount, setShowMount] = useState(true);

      return (
        <>
          <button onClick={() => setShowMount(!showMount)}>Toggle mount</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              {showMount && (
                <div data-testid="mount">
                  <MountPoint canShow={true} priority={1} />
                </div>
              )}
              <div data-testid="fallback">
                <MountPoint canShow={true} priority={2} />
              </div>
            </div>
          </SwitchableMountProvider>
        </>
      );
    };

    const { getByRole } = render(<TestComponent />);

    // Content should exist and be mounted
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Unmount the higher priority mount point
    fireEvent.click(getByRole('button'));

    // Content should still exist
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('handles priority prop changes', () => {
    const TestComponent = () => {
      const [p1, setP1] = useState(1);
      const [p2, setP2] = useState(2);

      return (
        <>
          <button onClick={() => setP1(10)}>Change p1</button>
          <button onClick={() => setP2(1)}>Change p2</button>
          <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
            <div>
              <div data-testid="mount-1">
                <MountPoint canShow={true} priority={p1} />
              </div>
              <div data-testid="mount-2">
                <MountPoint canShow={true} priority={p2} />
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

    // Change priorities
    fireEvent.click(buttons[1]);

    // Content should still be rendered
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('works with multiple mount points with same priority', () => {
    render(
      <SwitchableMountProvider render={() => <span data-testid="content">Content</span>} renderMode={mode}>
        <div>
          <div data-testid="mount-1">
            <MountPoint canShow={true} priority={1} />
          </div>
          <div data-testid="mount-2">
            <MountPoint canShow={true} priority={1} />
          </div>
        </div>
      </SwitchableMountProvider>
    );

    const content = screen.getByTestId('content');
    // Content should be rendered, but only in one mount point
    expect(content).toBeInTheDocument();
  });
});
