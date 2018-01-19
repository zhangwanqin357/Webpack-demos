const React = require('react')
const ReactDOM = require('react-dom')
// 引入局部CSS样式文件
var style = require('./CSSModule.css')

ReactDOM.render(
  <div>
    <h1 className = {style.h1}>Hello World</h1>
    <h2 className = "h2">Hello Webpack</h2>
  </div>,
  document.querySelector('#wrapper')
);