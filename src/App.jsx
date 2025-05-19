import './App.css'
import { VideoSeekSlider } from 'react-video-seek-slider'
import { useState } from 'react';
import "react-video-seek-slider/styles.css"
import { useEffect } from 'react';
import { useRef } from 'react';
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const animLength = 10;
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
          if(!(Math.ceil((animState[1]+1)*10000/animLength)>10000)){
            if(!mouseDown){
              setCurrentTime((prev)=>{return ((Math.round(prev*animLength/10000)*10000/animLength) + 10000/animLength)})
            }//setAnimState(Math.ceil((animState[1]+1)*10000/animLength));
          }
        }
      }

      //set a condition that prevents frame movement from being triggered if mouse is down
      if(animState[0]){
        frameCompute();
      }
    }
  },[ticker]);
  
  
  useEffect(()=>{
    //useEffect block used to set frame after time is modified
    function execMethod()
    {
      console.log('up the mouse');
      setAnimState((prev)=>{
        return [prev[0],Math.round((currentTime/10000)*animLength)]
      });
    }
    execMethod();
  },[currentTime])

  return (
    <>
    <button onClick={()=>{setAnimState((prev)=>{return [true,prev[1]]})}}>PLAY</button>
    <button onClick={()=>{setAnimState((prev)=>{return [false,prev[1]]})}}>PAUSE</button>
    <button onClick={()=>{setAnimState((prev)=>{return [false,prev[1]]});setCurrentTime(0)}}>RESET</button>
    <div>Frame = {animState[1]}</div>
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
            description: 'Description label of the first part',
          },
        ]}
        />
    </div>
    </>
  )
}

export default App
