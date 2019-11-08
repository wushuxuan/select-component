import React from 'react';
import './../assets/index.css';
// import { isTemplateElement } from '@babel/types';

export default class Index extends React.Component {
    // changeLang = ({ key }) => {
    //   setLocale(key);
    // };
    constructor(props) {
      super(props);
      this.state = {
        openclose:false,
        openDrop:false,
        value:props.value,
        options:props.options,
        msg: null
      }
      this.searchChange = this.searchChange.bind(this);
    }

    componentDidUpdate(nextProps) {
      document.addEventListener('keydown',this.handleKeyDown);
    }


    getLabel(value){
      const { options } = this.props;
      var label = null;
      options.forEach((item)=>{
        if(item.value == value){
          label= item.label
        }
      })
      return label;
    }

    setValue =(val)=>{
      const { multiple } = this.props;
      if(multiple){
        var list = [];
        this.state.value.forEach((item)=>{
          if(list.indexOf(item) == -1){
            list.push(item)
          }
        })
        if(list.indexOf(val)>-1){
          list = list.filter(item => item != val);
        }else{
          list.push(val)
        }
        list = list.filter((item,index,self)=>{
          return self.indexOf(item) === index
        })
        this.setState({ value:list,})
      }else{
        if(!val){
          this.setState({ msg:"",value:"", })
          const { options } = this.props;
          this.setState({
            options:options
          })
        }
        this.setState({ value:val,})
        this.props.onChange(val)
      }

      
      console.log("selectBox:"+document.getElementById("selectBox").offsetHeight)
    }


    onFocus=()=>{
      this.setState({
        openDrop: true,
      })
    }
    onBlur=()=>{
      this.setState({
        openDrop: false,
      })
    }

    
    searchChange (e) {
      const { options } = this.props;
      this.state.options = options.filter(item => item.label.indexOf(e.target.value)>-1);
      this.setState ({
          msg: e.target.value,
          value: e.target.value,
      })
    }

    closeItem=(item)=>{
      var list = [];
      this.state.value.forEach((element)=>{
        if(element !=item){
          list.push(element)
        }
      })
      this.setState({
        value:list
      })
    }

    keypress = (e) =>{
      console.log(e)
    }


    handleKeyDown=(e)=>{
      if (e.which == 46) {
        var list = [];
        this.state.value.forEach((item,index)=>{
          if(index != this.state.value.length-1){
            list.push(item)
          }
        })
        this.setState({
          value:list
        })
      }
    }
    render() {
      const { openclose,openDrop,value,options,msg } = this.state;
      const { width,openSearch,multiple } = this.props;
      return (
        <div className="rc-select rc-select-enabled" id="selectBox" style={{width:width?width:'500px'}}>
          <div className="rc-select-selection rc-select-selection--single" tabIndex="1" onFocus={this.onFocus} onBlur={this.onBlur}>
            <div className="rc-select-selection__rendered">
              <div  className="rc-select-selection__placeholder" style={{'display':'block'}}>
                {
                  multiple?<div>
                      {
                      openSearch?
                      <div>
                        {
                          value?<input type="text" value={this.getLabel(value)}  placeholder="请输入关键字" onChange={this.searchChange} className="rc-select-search__field"/>
                          :
                          <input type="text" value={msg} placeholder="请输入关键字" onChange={this.searchChange} className="rc-select-search__field"/>
                        }
                        </div>:
                      <div >{value?
                        <div>
                          {
                            value.map((item,index)=>(
                              <span className="rc-select-selection__choice" tabIndex="2"  onKeyDown={(e)=>this.handleKeyDown(e)} style={{display:value.indexOf(item)<8?'inline-block':'none'}}>
                                <span className="rc-select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                                  <span className="quesheng">{this.getLabel(item)}</span>
                                  <i onClick={()=>this.closeItem(item)} className="iconfont" style={{marginLeft:'12px'}}>&#xe615;</i>
                                </span>
                              </span>
                            ))
                          }
                          {value.length>8?
                            <span className="rc-select-selection__choice" >
                            <span className="rc-select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                              <span className="quesheng"> + {value.length-8}</span>
                            </span>
                          </span>
                            :null}
                        </div>
                        :'Placeholder 请选择'}</div>
                    }
                  </div>:
                  <div>
                    {
                      openSearch?
                      <div>
                        {
                          value?<input type="text" value={this.getLabel(value)}  placeholder="请输入关键字" onChange={this.searchChange} className="rc-select-search__field"/>
                          :
                          <input type="text" value={msg} placeholder="请输入关键字" onChange={this.searchChange} className="rc-select-search__field"/>
                        }
                        </div>:
                      <div >{value?this.getLabel(value):'Placeholder 请选择'}</div>
                    }
                  </div>
                }
              </div>
              <div class="rc-select-dropdown rc-select-dropdown-placement-topLeft" style={{display:openDrop?'block':'none',top:'42px'}}>
                <div className="rc-select-dropdown-menu">
                  <ul>
                    {options.map((item)=>(
                      <li onClick={()=>this.setValue(item.value)} className={` ${multiple?(value.indexOf(item.value)>-1 ?"checked":null):(item.value === value?"checked":null)}`} style={{padding:'0px 12px',height:'32px',lineHeight:'32px'}}>{item.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <span className="rc-select-selection__clear" onClick={()=>this.setValue(null)} style={{'user-select':'none',display:value?'inline-block':'none'}}><i className="rc-select-selection__clear-icon"></i></span>
            <span className="rc-select-arrow" style={{'user-select':'none',display:value?'none':'inline-block'}}><i className="iconfont">&#xe610;</i></span>
          </div>
        </div>
      );
    }
  }