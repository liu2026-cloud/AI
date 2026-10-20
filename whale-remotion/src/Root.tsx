import React,{useEffect,useState} from 'react';
import {AbsoluteFill,Audio,Composition,continueRender,delayRender,Img,staticFile,useCurrentFrame} from 'remotion';
import {C,Whale,ease,range,lerp} from './common';
import {Scene1,Scene2,Scene3,Scene4} from './ScenesOpening';
import {Scene5,Scene6,Scene7,Scene8} from './ScenesMiddle';
import {Scene9,Scene10,Scene11,Scene12} from './ScenesFinale';
import './style.css';

export const STARTS=[0,61,173,286,511,623,736,848,961,1073,1186,1260];
const ENDS=[...STARTS.slice(1),1350];
const SCENES=[Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8,Scene9,Scene10,Scene11,Scene12];
const TRANSITIONS=[0,18,22,19,18,20,20,0,19,18,17,22];

const blinds=(f:number,total:number,rows=12)=>{
 let d='';
 for(let i=0;i<rows;i++){
   const p=ease(range(f,(i%4)*1.1,total-4+(i%4)*1.1));
   const y=i*1080/rows, h=1080/rows+.5,w=1920*p;
   const x=i%2===0?0:1920-w;
   d+=`M${x} ${y}h${w}v${h}h${-w}Z `;
 }
 return `path('${d}')`;
};

const transitionStyle=(i:number,f:number):React.CSSProperties=>{
 const n=TRANSITIONS[i],p=ease(range(f,0,n));
 if(f>=n||n===0)return {};
 if(i===1)return {clipPath:`circle(${p*1600}px at 50% 68%)`};
 if(i===2){
  const s=lerp(300,11000,p);
  return {WebkitMaskImage:`url("${staticFile('54545.png')}")`,maskImage:`url("${staticFile('54545.png')}")`,WebkitMaskRepeat:'no-repeat',maskRepeat:'no-repeat',WebkitMaskSize:`${s}px ${s}px`,maskSize:`${s}px ${s}px`,WebkitMaskPosition:`${960-s*.28}px ${540-s*.3}px`,maskPosition:`${960-s*.28}px ${540-s*.3}px`};
 }
 if(i===3)return {clipPath:`circle(${p*1600}px at 50% 50%)`,transform:`rotate(${(1-p)*-22}deg) scale(${lerp(1.45,1,p)})`};
 if(i===4)return {transform:`perspective(2000px) rotateY(${(1-p)*88}deg) scale(${lerp(.86,1,p)})`,transformOrigin:'50% 50%',backfaceVisibility:'hidden'};
 if(i===5)return {clipPath:blinds(f,n,9)};
 if(i===6)return {transform:`translateX(${(1-p)*1920}px)`};
 if(i===8)return {clipPath:`inset(0 ${(1-p)*100}% 0 0)`};
 if(i===9)return {clipPath:blinds(f,n,14),transform:`translateX(${Math.sin(f*2.3)*(1-p)*45}px)`};
 if(i===10)return {clipPath:`inset(${(1-p)*50}% ${(1-p)*50}% round ${(1-p)*100}px)`,transform:`scale(${lerp(.8,1,p)})`};
 if(i===11)return {clipPath:`circle(${p*1700}px at 50% 40%)`};
 return {};
};

export const Film:React.FC=()=>{
 const frame=useCurrentFrame();
 const [fontHandle]=useState(()=>delayRender('Load bundled Chinese typeface'));
 useEffect(()=>{document.fonts.load('900 120px "Whale Sans"').then(()=>continueRender(fontHandle)).catch(()=>continueRender(fontHandle));},[fontHandle]);
 let i=STARTS.length-1;
 while(i>0&&frame<STARTS[i])i--;
 const f=frame-STARTS[i],inTransition=i>0&&f<TRANSITIONS[i];
 const Current=SCENES[i],Previous=SCENES[Math.max(0,i-1)];
 const p=ease(range(f,0,TRANSITIONS[i]||1));
 return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
  <Img src={staticFile('54545.png')} style={{position:'absolute',width:1,height:1,opacity:0}}/>
  {inTransition&&<AbsoluteFill style={i===6?{transform:`translateX(${-p*550}px)`}:undefined}><Previous f={frame-STARTS[i-1]} duration={ENDS[i-1]-STARTS[i-1]}/></AbsoluteFill>}
  <AbsoluteFill style={transitionStyle(i,f)}><Current f={f} duration={ENDS[i]-STARTS[i]}/></AbsoluteFill>
  {inTransition&&i===8&&<Whale x={lerp(-1350,3350,p)} y={570} size={2400} color={C.orange} rotate={-32}/>}
  {inTransition&&i===9&&[0,1,2,3].map((k)=><div key={k} style={{position:'absolute',left:Math.sin(f*1.8+k)*240,top:180+k*215,width:2300,height:14+(k%2)*13,background:k%2?C.blue:C.paper,opacity:(1-p)*.9}}/>)}
  <Audio src={staticFile('music.wav')} endAt={1350} volume={(audioFrame)=>audioFrame<1329?.9:Math.max(0,.9*(1350-audioFrame)/21)}/>
 </AbsoluteFill>;
};

export const Root:React.FC=()=> <Composition id="WhaleMotion" component={Film} durationInFrames={1350} fps={30} width={1920} height={1080}/>;
