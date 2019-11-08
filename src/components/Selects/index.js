import React from 'react';
import './../assets/index.css';

export default class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        openDrop:false,
        value:props.value,
        options:props.options,
        msg: null,
        showClose:props.openClose
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
        if(item.value === value){
          label= item.label
        }
      })
      return label;
    }

    setValue =(val)=>{
      const { multiple,openClose } = this.props;
      if(multiple){
        if(!val){
          if(openClose){
            this.setState({ value:[],})
            this.props.onChange([])
          }
        }else{
          var list = [];
          this.state.value.forEach((item)=>{
            if(list.indexOf(item) === -1){
              list.push(item)
            }
          })
          if(list.indexOf(val)>-1){
            list = list.filter(item => item !== val);
          }else{
            list.push(val)
          }
          list = list.filter((item,index,self)=>{
            return self.indexOf(item) === index
          })
          this.setState({ value:list,msg:""})
        }
      }else{
        if(!val && openClose){
          this.setState({ msg:"",value:"", })
          const { options } = this.props;
          this.setState({
            options:options
          })
        }
        this.setState({ value:val,})
        this.props.onChange(val)
      }
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
      const { options,multiple } = this.props;
      // this.state.options = options.filter(item => item.label.indexOf(e.target.value)>-1);
      if(multiple){
        this.setState ({
          options:options.filter(item => item.label.indexOf(e.target.value)>-1),
          msg: e.target.value,
        })
      }else{
        this.setState ({
          options:options.filter(item => item.label.indexOf(e.target.value)>-1),
          msg: e.target.value,
          value: e.target.value,
        })
      }
    }

    closeItem=(item)=>{
      var list = [];
      this.state.value.forEach((element)=>{
        if(element !==item){
          list.push(element)
        }
      })
      this.setState({
        value:list
      })
    }

    handleKeyDown=(e)=>{
      if (e.which === 46) {
        var list = [];
        this.state.value.forEach((item,index)=>{
          if(index !== this.state.value.length-1){
            list.push(item)
          }
        })
        this.setState({
          value:list
        })
      }
    }

    onMouseEnter=()=>{
      const { openClose } = this.props;
      if(openClose){
        this.setState({
          showClose:true
        })
      }
    }

    onMouseLeave=()=>{
      const { openClose } = this.props;
      if(openClose){
        this.setState({
          showClose:false
        })
      }
    }
    render() {
      const { openDrop,value,options,msg,showClose } = this.state;
      const { width,openSearch,multiple } = this.props;
      return (
        <div className="select select-enabled" style={{width:width?width:'500px'}} >
          <div tabIndex="1"  onFocus={this.onFocus} onBlur={this.onBlur}>
            <div className="select-selection select-selection--single" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{height:'auto',marginBottom:'6px'}}>
              <div className="select-selection__rendered">
                <div  className="select-selection__placeholder" style={{'display':'block'}}>
                  {
                    multiple?<div>
                        {
                        openSearch?
                        <div>
                          {
                            value?
                            <div>
                              {value && value.length>0?
                          <span>
                            {
                              value.map((item,index)=>(
                                <span className="select-selection__choice" tabIndex="2"  onKeyDown={(e)=>this.handleKeyDown(e)} style={{display:value.indexOf(item)<8?'inline-block':'none'}}>
                                  <span className="select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                                    <span className="quesheng">{this.getLabel(item)}</span>
                                    <i onClick={()=>this.closeItem(item)} className="iconfont" style={{marginLeft:'12px'}}>&#xe615;</i>
                                  </span>
                                </span>
                              ))
                            }
                            {value.length>8?
                              <span className="select-selection__choice" >
                              <span className="select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                                <span className="quesheng"> + {value.length-8}</span>
                              </span>
                            </span>
                              :null}
                              <span className="select-selection__choice" style={{backgroundColor:'#fff',}}>
                                <input type="text" value={msg}  onChange={this.searchChange} className="select-search__field"/>
                              </span>
                          </span>
                          : <span className="select-selection__choice" style={{backgroundColor:'#fff',padding:'0px'}}>
                          <input type="text" value={msg} placeholder="Placeholder 请选择" onChange={this.searchChange} className="select-search__field"/>
                        </span>}
                            </div>
                            :
                            <input type="text" value={msg} placeholder="Placeholder 请选择" onChange={this.searchChange} className="select-search__field"/>
                          }
                          </div>:
                        <div>{value && value.length>0?
                          <div>
                            {
                              value.map((item,index)=>(
                                <span className="select-selection__choice" tabIndex="2"  onKeyDown={(e)=>this.handleKeyDown(e)} style={{display:value.indexOf(item)<8?'inline-block':'none'}}>
                                  <span className="select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                                    <span className="quesheng">{this.getLabel(item)}</span>
                                    <i onClick={()=>this.closeItem(item)} className="iconfont" style={{marginLeft:'12px'}}>&#xe615;</i>
                                  </span>
                                </span>
                              ))
                            }
                            {value.length>8?
                              <span className="select-selection__choice" >
                              <span className="select-selection__choice__content" style={{display:'flex',flexFlow:'row',}}>
                                <span className="quesheng"> + {value.length-8}</span>
                              </span>
                            </span>
                              :null}
                          </div>
                          :<div>Placeholder 请选择</div>}</div>
                      }
                    </div>:
                    <div>
                      {
                        openSearch?
                        <div>
                          {
                            value?<input type="text" value={this.getLabel(value)}  placeholder="Placeholder 请选择" onChange={this.searchChange} className="select-search__field"/>
                            :
                            <input type="text" value={msg} placeholder="Placeholder 请选择" onChange={this.searchChange} className="select-search__field"/>
                          }
                          </div>:
                        <div>{value?this.getLabel(value):<div>Placeholder 请选择</div>}</div>
                      }
                    </div>
                  }
                </div>
              </div>
                <span className="select-selection__clear" onClick={()=>this.setValue(null)} style={{display:(multiple && value && value.length>0 && showClose) || (!multiple && value && showClose)?'inline-block':'none',}}><i className="select-selection__clear-icon"></i></span>
                <span className="select-arrow" style={{display:((multiple && value && value.length>0 ) || (!multiple && value )) && showClose ?'none':'inline-block'}}><i className="iconfont">&#xe610;</i></span>
            </div>
            <div className="select-dropdown select-dropdown-placement-topLeft" style={{display:openDrop?'block':'none',top:'auto'}}>
            <div className="select-dropdown-menu">
              <ul>
                {options.map((item)=>(
                  <li onClick={()=>this.setValue(item.value)} className={` ${multiple?(value.indexOf(item.value)>-1 ?"checked":null):(item.value === value?"checked":null)}`} style={{padding:'0px 12px',height:'32px',lineHeight:'32px'}}>{item.label}</li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        </div>
      );
    }
  }