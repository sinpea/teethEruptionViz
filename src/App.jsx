import './App.css'
import { VideoSeekSlider } from 'react-video-seek-slider'

import { useState } from 'react';
import "react-video-seek-slider/styles.css"
import { useEffect } from 'react';
import { useRef } from 'react';

import { TeethSvg } from './components/teethSvg';
import { dentalPathIds } from './controllers/dentalArcPathIds';

import ReactSwitch from 'react-switch';
//import each animation separately
import { animationLoopDataPrimaryDentition } from './controllers/animationManager';
import { animationLoopDataSecondaryDentition } from './controllers/animationManager';
import { Table } from './components/table';
function App() {
  //==============TEXT_DATA_FOR_DISPLAY-================================
  const dentitionText = 
{secondary:
<table>
  <thead>
    <tr>
      <th>Tooth</th>
      <th>Upper Eruption (years)</th>
      <th>Lower Eruption (years)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CI</td>
      <td>7–8</td>
      <td>6–7</td>
    </tr>
    <tr>
      <td>LI</td>
      <td>8–9</td>
      <td>7–8</td>
    </tr>
    <tr>
      <td>1M</td>
      <td>9–10</td>
      <td>6–7</td>
    </tr>
    <tr>
      <td>1P</td>
      <td>10–11</td>
      <td>10–12</td>
    </tr>
    <tr>
      <td>2P</td>
      <td>10–12</td>
      <td>11–12</td>
    </tr>
    <tr>
      <td>C</td>
      <td>11–12</td>
      <td>9–10</td>
    </tr>
    <tr>
      <td>2M</td>
      <td>12–13</td>
      <td>11–13</td>
    </tr>
    <tr>
      <td>3M</td>
      <td>17–21</td>
      <td>17–21</td>
    </tr>
  </tbody>
</table>,primary:
<table>
  <thead>
    <tr>
      <th>Tooth</th>
      <th>Lower Eruption (months)</th>
      <th>Upper Eruption (months)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CI</td>
      <td>6–10</td>
      <td>8–12</td>
    </tr>
    <tr>
      <td>LI</td>
      <td>10–16</td>
      <td>9–13</td>
    </tr>
    <tr>
      <td>1M</td>
      <td>14–18</td>
      <td>13–19 / 14–18</td>
    </tr>
    <tr>
      <td>C</td>
      <td>17–23</td>
      <td>16–22</td>
    </tr>
    <tr>
      <td>2M</td>
      <td>23–31 / 24–30</td>
      <td>25–33</td>
    </tr>
  </tbody>
</table>};

  const [teethListSelect,setTeethList] = useState([]);
  //==============ANIMATION CONTROL CODE================================
  const [currentTime, setCurrentTime] = useState(0);
  //const (((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1) = 10;
  const [animState,setAnimState] = useState([false,0]);
  const [ticker,setTicker] = useState(0);
  const seek = useRef(null);
  const [mouseDown,setMouseDown] = useState(false);
  //console.log comments every frame
  useEffect(()=>{console.log(`new frame ${currentTime},animFrame=${animState}, mouse down=${mouseDown}`)});

  //animation handleMouseDown and stuff
  useEffect(()=>{
    //setMouseDown((prev)=>false);
    window.addEventListener('mousedown',setMouseDownExec);
    window.addEventListener('mouseup',setMouseUpExec);
    function setMouseUpExec(e){
      
      console.log('mouse up');
      setMouseDown((prev)=>false);
      
      //mouseDownVar = false;
    }
    function setMouseDownExec(e){
      setMouseDown((prev)=>true);
      //mouseDownVar = true;
      console.log('mouseDown');
      
      
    }
    return ()=>{window.removeEventListener('mousedown',setMouseDownExec);
      window.removeEventListener('mouseup',setMouseUpExec);
    }
  },[])
  
  //animation ticker -> this is the ticker that keeps ticking to work all the frames
  useEffect(()=>{
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };//define an awaitable sleep function with ms wait time

    async function runTicker(){
      await sleep(500);
      setTicker((prev)=>prev+1)
    }

    runTicker();
  },[ticker])


  //animation loop
  useEffect(()=>{
    //run animation in each frame
    if(animState[0]){
      //now proceed with animation
      function frameCompute() {
        if(animState[0]){
          if(!(Math.ceil((animState[1]+1)*10000/(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1))>10000)){
            if(!mouseDown){
              setCurrentTime((prev)=>{return ((Math.round(prev*(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1)/10000)*10000/(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1)) + 10000/(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1))})
            }//setAnimState(Math.ceil((animState[1]+1)*10000/(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1)));
          }
          else{
            setAnimState((prev)=>{return [false,prev[1]]})
          }
        }
      }

      //set a condition that prevents frame movement from being triggered if mouse is down
      if(animState[0]){
        frameCompute();
      }
    }
  },[ticker]);
  
  //set frame from currentTime
  useEffect(()=>{
    //useEffect block used to set frame after time is modified
    function execMethod()
    {
      console.log('up the mouse');
      setAnimState((prev)=>{
        return [prev[0],Math.round((currentTime/10000)*(((switchState)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1))]
      });
    }
    execMethod();
  },[currentTime])

  //set Animation state for teethSvg here
  useEffect(()=>{
    //select which animation to choose based on switch state
    
    const changeObj = {};
    if(switchState){

      Object.assign(changeObj,animationLoopDataPrimaryDentition[animState[1]].changes);
    }
    else{
      Object.assign(changeObj,animationLoopDataSecondaryDentition[animState[1]].changes);
    }
    //highlight still selected stuff after animating
    //2 is the hifg
    for(const i of teethListSelect){
      if(changeObj[i]!=2){
        console.log('reset color')
        changeObj[i] = 3;
      }
    }
    setterMethodUnderAnimation(changeObj);
  },[animState[1]])
  //==============ANIMATION CONTROL CODE================================

  //==============TEETH-JSX CONTROL CODE================================
  const [teethState,setTeethState] = useState(()=>{
    const teethSt = {};
    for(const key in dentalPathIds){
      teethSt[key] = 0;
    }
    return teethSt;
  });

  const setterMethod = (e)=>{
    const a = e.target.attributes.teethType.value;
    setTeethState((prevState)=>{
      let obj = Object.create({});
      Object.assign(obj,prevState);
      if(obj[a]===0 && !(a in teethListSelect)){
        setTeethList((prev)=>[...prev,a]);
      }
      if(obj[a]!=0){
        setTeethList((prev)=>{
          return prev.filter((element)=>element !== a);
        })
      }
      obj[a] = obj[a]===0?3:0;
      return obj;
    })
  };

  //to be called during animation process
  const setterMethodUnderAnimation = (changeObj)=>{
    
    for(const i in changeObj){
      
        if(teethListSelect.findIndex((e)=>e===i)!=-1){
          console.log(changeObj[i]);
          setTeethState((prevState)=>{
            
            let obj = Object.create({});
            Object.assign(obj,prevState);
            obj[i] = changeObj[i];
            return obj;
          });  
        }
         
    }
  };

  //==============TEETH-JSX CONTROL CODE================================
  
  //==============SWITCH-CONTROL-CODE---================================
  //this is used to select between which animation to use -> Primary dentition 
  // or Permanent Dentition
  const [switchState,setSwitchState] = useState(false);
  const toggleSwitchState = (e)=>{
    setSwitchState(e);
    setAnimState((prev)=>{
      return [prev[0],Math.round((currentTime/10000)*(((e)?animationLoopDataPrimaryDentition.length:animationLoopDataSecondaryDentition.length)-1))]
    });
  }


  return (
    <>
    <div className='flexCol'>
      <div>
        <button onClick={()=>{setAnimState((prev)=>{return [true,prev[1]]})}}>PLAY</button>
        <button onClick={()=>{setAnimState((prev)=>{return [false,prev[1]]})}}>PAUSE</button>
        <button onClick={()=>{
          setAnimState((prev)=>{return [false,prev[1]]});
          setCurrentTime(()=>0);
          setTeethList(()=>[]);
          for(const i in dentalPathIds){
            setTeethState((prevState)=>{
              let obj = Object.create({});
              Object.assign(obj,prevState);
              obj[i] = 0;
              return obj;
            })  
          }
          }}>RESET</button>
        <button onClick={()=>{
        setTeethList(()=>[])
        for(const i in dentalPathIds){
          setTeethList((prev)=>[...prev,i]);
          setTeethState((prevState)=>{
            let obj = Object.create({});
            Object.assign(obj,prevState);
            obj[i] = 3;
            return obj;
          })
        }}}>SELECT ALL TEETH</button>
      </div>
      <div className='flexWrapperSide mini'><div>Secondary</div><ReactSwitch onChange={toggleSwitchState} checked={switchState}/><div>Primary</div></div>
      <div>Frame = {animState[1]}</div>
      <div>
        <div style={{maxWidth:600}}>
          <VideoSeekSlider max={10000}
              currentTime={currentTime}
              bufferTime={4000000}
              onChange={setCurrentTime}
              secondsPrefix="00:00:"
              minutesPrefix="00:"
              timeCodes={[
                {
                  fromMs: 0,
                  description: 'seek',
                },
              ]}
              />
        </div>
      </div>
      <div className='flexWrapperSide teethList'>
        <TeethSvg activationState={teethState} setterMethod={setterMethod}/>
        <div className='listTeeth'>
          <ul>
            {teethListSelect.map((teeth)=>{return <li key={teeth}>{teeth}</li>})}
          </ul>
        </div>
      </div>
      <h1>{switchState?"Primary Dentition":"Secondary Dentition"}</h1>
      {/*<div className="blackBgText">{switchState?dentitionText.primary:dentitionText.secondary}</div>*/}
      <Table switchState={switchState} activatedList={teethListSelect}/>
    </div>
    </>
  )
}

export default App
