import React from 'react';
import Selects from './components/Selects';
import './App.css';

 //#endregion

class App extends React.Component {
  state = {
    //单选，值为字符串
    // selectedOption: "skirt",
    //多选，值为数组
    selectedOption: ['skirt','sweater','trousers','sleeve','sweater','overcoat','jackets','dress','skirts'],
    options : [
      { value:'shoes',label:'鞋子' },
      { value:'skirt',label:'裙子' },
      { value:'trousers',label:'裤子' },
      { value:'sleeve',label:'短袖' },
      { value:'sweater',label:'卫衣' },
      { value:'overcoat',label:'大衣' },
      { value:'jackets',label:'羽绒服' },
      { value:'dress',label:'连衣裙' },
      { value:'skirts',label:'半身裙半身裙半身裙半身裙' },
    ]
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  getValue = () =>{
    console.log("值："+this.state.selectedOption)
  }

  render() {
    const { selectedOption,options } = this.state;
    return (
    <div style={{padding:'24px'}}>
       <div>
       <Selects
          width='500px'
          multiple={true}
          openSearch={false}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
        <button style={{'margin-left':'12px'}} onClick={this.getValue}>获取值</button>
       </div>
    </div>
    );
  }
}
export default App;