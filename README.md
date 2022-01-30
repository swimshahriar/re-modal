### Features

- Supports Nested modal ✅
- Supports draggable dropdown menu ✅
- Style object for styling 🖌

### Installation

```zsh
npm i @swimshahriar/re-modal
# or
yarn add @swimshahriar/re-modal
```

### Examples

Link: [sandbox](https://codesandbox.io/s/swimshahriar-re-modal-cjbfd?file=/src/App.js)
<br/>

<iframe src="https://codesandbox.io/embed/swimshahriar-re-modal-cjbfd?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="@swimshahriar/re-modal"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Props

| Prop          | Type                        | isRequired                     |
| ------------- | --------------------------- | ------------------------------ |
| open          | boolean                     | required                       |
| onClose       | function                    | required                       |
| type          | string ('modal','dropdown') | optional                       |
| isOverlay     | boolean                     | optional                       |
| draggable     | boolean                     | optional                       |
| targetRef     | useRef Element              | required if type is 'dropdown' |
| style         | style object                | optional                       |
| dragAreaStyle | style object                | optional                       |
