*Still in development mode - so examples may not work as expected!*

# What is it?

react-prioritised-mounts is a React library that provides an automatically switching mount-point based on a priority
system. That is - if you have multiple Mount Points, only one will render content at a time.

Also provides [react-reverse-portal](https://github.com/httptoolkit/react-reverse-portal) integration, allowing for a
single render between multiple mount points - great if you've got expensive or DOM-bound components.

# Why would you want it?

If you have a control that you can pop-out to one of several locations, and don't want to manage too much logic. Or if
you want to absolutely guarantee something's only rendering in one location - eg: a video stream.

# How to use it?

See the Storybook stories (`lib/*.stories.tsx`) for more examples.

## Install

```
npm install @tr00st/react-prioritised-mounts
npm install react-reverse-portal # Optional
```

## Use

```
// pass renderMode='reverse-portal' to use react-reverse-portal mounting here - but make sure you've added it as a
// dependency!
<SwitchableMountProvider render={() => <span>Mounted content</span>}>
    <p>First item should be mounted.</p>
    <ol>
        <li>
            <MountPoint canShow={true} priority={1} />
        </li>
        <li>
            <MountPoint canShow={true} priority={2} />
        </li>
        <li>
            <MountPoint canShow={true} priority={3} />
        </li>
    </ol>
</SwitchableMountProvider>
```

## Developing

### Requirements

You'll need:
* NVM
* Node LTS (last update - v24.x)

If you're developing on Windows, consider using WSL2, and your choice of distro (eg: Ubuntu LTS).

To get set up, check the repo out and run the following:

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Enable NVM on current terminal
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install latest LTS
nvm install --lts

# Switch to the LTS (only for the current terminal!)
nvm use lts/*

# Install dependencies
npm install
```

### Iterating locally

Whilst making changes, you'll probably want to run:

* Storybook for a visual confirmation, and creating examples
* Vitest for unit tests/quick feedback if you break anything

Recommendation is to use `npm run dev`, which starts both with web UIs, and should auto-launch a tab for each.

# Limitations

Current limitations (think of this as the development to-do list...)

* No support for multiple mount contents from the same provider. This means you can practically only use one set of mount
  points for a given section of the component tree.
* No per-mount props. We should look to allow setting props against specific mount points - eg: you might want a
  popout version of a control to render slightly differently.

# License

MIT - see LICENSE file.

