import  "./app.css";
import  './app.less';
import React from 'react'
import { render } from 'react-dom'
console.log('我是一个js文件');
const doSomething=() => {
    console.info('do do do')
}
doSomething();
console.log('test hot loader');
console.log('test hot loader')
console.log(render)
render(<h1>Hello, world!
    <p>555</p>
</h1>,document.getElementById('root'))
