import  "./app.css";
import  './app.less';
import React from 'react'
import { render } from 'react-dom'
import { DatePicker, message } from 'antd';
// import 'antd/dist/antd.css';
// console.log('我是一个js文件');
// const doSomething=() => {
//     console.info('do do do')
// }
// doSomething();
// console.log('test hot loader');
// console.log('test hot loader')

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: '',
      };
    }
    handleChange(date) {
      message.info('您选择的日期是: ' + date.toString());
      this.setState({ date });
    }
    render() {
      return (
        <div style={{ width: 400, margin: '0px auto' }}>
          <DatePicker onChange={value => this.handleChange(value)} />
          <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
          <div style={{ marginTop: 40 }}>当前日期：{this.state.date.toString()}</div>  
        </div>
      );
    }
  }
render(<App />, document.getElementById('root'));
