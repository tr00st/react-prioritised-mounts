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

# Limitations

Current limitations (think of this as the development to-do list...)

* No support for multiple mount contents from the same provider. This means you can practically only use one set of mount
  points for a given section of the component tree.
* No per-mount props. We should look to allow setting props against specific mount points - eg: you might want a
  popout version of a control to render slightly differently.

# License

MIT - see LICENSE file.

