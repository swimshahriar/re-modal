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
