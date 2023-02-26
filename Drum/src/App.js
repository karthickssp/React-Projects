import './App.css';
import React from 'react'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const activeStyle = {
  opacity:0.75,
  transform:'scale(0.93)'
}

const inactiveStyle = {
  
}

class Box extends React.Component{
  constructor(props){
    super(props);
    this.audio = React.createRef();
    this.state = {
      currentStyleBtn: inactiveStyle
    }
  }
  
  componentDidMount(){  
    document.addEventListener('keydown', this.handleKeyPress);
  } 
  
  componentWillUnmount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  styleRegulator = ()=>{
    if(this.state.currentStyleBtn.opacity === 0.75){
      this.setState({
        currentStyleBtn: inactiveStyle
      })
    } else {
      this.setState({
        currentStyleBtn: activeStyle
      })
    }
  }
  
  handleKeyPress= (event)=>{    
    if(event.key.toUpperCase() === this.props.text){
      if(this.props.power){
        this.audio.current.currentTime = 0; 
        this.audio.current.play();        
      
        this.styleRegulator();
        setTimeout(()=>this.styleRegulator(),150); 
        const clip = this.props.clip;     
        this.props.updateDisplay(this.props.clip);
      }
    }
  }
  
  playSound=()=>{    
    if(this.props.power){
      this.audio.current.currentTime = 0; 
      this.audio.current.play();    
  
      this.styleRegulator();
      setTimeout(()=>this.styleRegulator(),150);      

      const clip = this.props.clip;     
      this.props.updateDisplay(this.props.clip);
    }      
  }
  
  render(){
    const {text, audio, clip,power} = this.props;    
    if(power){      
      return(
        <div className="box drum-pad" onClick={this.playSound} style={this.state.currentStyleBtn} id={`drum-${text}`}>{text}
          <audio ref={this.audio} src={audio} className='clip' id={text} clip={clip}/>
        </div>
      );      
    } else {
      return(
        <div className="box drum-pad" onClick={this.playSound} style={inactiveStyle} id={`drum-${text}`}>{text}
          <audio ref={this.audio} src={audio} className='clip' id={text} clip={clip}/>
        </div>
      );      
    }
  }  
}

class Pad extends React.Component{
  constructor(props){
    super(props);   
  }
  render(){
    const {sounds, updateDisplay, power} = this.props;
    let padBank;
    
    if (power){
      padBank = sounds.map((sound,idx)=>{
      return(
        <Box text={sound.keyTrigger} key={idx} audio={sound.url} clip={sound.id} updateDisplay={updateDisplay} power={power} />
        );
      });
    }else{
      padBank = sounds.map((sound,idx)=>{
      return(
        <Box text={sound.keyTrigger} key={idx} audio="#" clip="" updateDisplay={updateDisplay} power={power}/>
        );
      });
    }    
    return(     
      <div id="pad-bank"  className='col-md-6'>{padBank}</div>
    );
  }
}

class App extends React.Component {  
  constructor(props){
    super(props);
    this.state = {
      display: "",
      power:true,
      bank:bankOne
    };
    this.display = React.createRef();
  }
  
  updateDisplay= (name) =>{
    this.setState({
      display:name
    })
  }
  
  powerControl = () => {
    const currentPower = this.state.power;
    this.setState({
      power:!currentPower,
      display:""
    })
  }
  
  bankControl = () => {
    const currentBank = this.state.bank;
    if(this.state.power){
      if(currentBank === bankOne){
        this.setState({
          bank:bankTwo,
          display: "Smooth Piano Kit"
        })
      } else {
          this.setState({
          bank:bankOne,
          display: "Heater Kit"
        })
      }
    }

  }
  
  render(){
    const {power,display,bank} = this.state;    
    
    const powerStyle = power ? { float: 'right' } : { float: 'left' }; 
    const bankStyle = bank===bankOne ? {float: 'right'} : {float: 'left'}
    
    return(
      <div id='drum-machine' className='row'>
          <Pad sounds={bank} updateDisplay={this.updateDisplay} power = {power} />        
        
        <div id="controls" className='col-md-6'>
          <p>Power</p>
          <div className="select" onClick={this.powerControl}>
            <div className="select-btn" id="power-state" style={powerStyle}/>
          </div>
          <div id='display' ref={this.display}>{display}</div>
          <p>Bank</p>
          <div className="select" onClick={this.bankControl}>
            <div className="select-btn" id="bank-state" style={bankStyle}/>
          </div>
        </div>
      </div>
    );
 }
}

export default App