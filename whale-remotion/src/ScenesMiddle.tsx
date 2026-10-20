import React from 'react';
import {C, Whale, FONT} from './common';

type SceneProps = {f: number; duration: number};
const W=1920, H=1080;
const clamp=(v:number,a=0,b=1)=>Math.min(b,Math.max(a,v));
const r=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
const smooth=(v:number)=>v*v*(3-2*v);
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const spring=(f:number,d=0)=>{const t=Math.max(0,(f-d)/30); return f<d?0:1-Math.exp(-10*t)*Math.cos(15*t);};
const pulse=(f:number)=>Math.exp(-5*(((f+2)%14.0625)/14.0625));
const colors=[C.blue,C.orange,C.pink,C.yellow,C.green,C.blue,C.pink,C.orange,C.green,C.yellow,C.blue,C.pink,C.orange,C.green];
const font=FONT;
const Text:React.FC<{x:number;y:number;size:number;color?:string;children:React.ReactNode;style?:React.CSSProperties}>=({x,y,size,color=C.ink,children,style})=><div style={{position:'absolute',left:x,top:y,fontFamily:font,fontSize:size,fontWeight:900,lineHeight:1.08,whiteSpace:'nowrap',letterSpacing:-size*.055,color,...style}}>{children}</div>;
const Small:React.FC<{x:number;y:number;children:React.ReactNode;color?:string;style?:React.CSSProperties}>=({x,y,children,color=C.ink,style})=><div style={{position:'absolute',left:x,top:y,fontFamily:'Arial, sans-serif',fontSize:18,fontWeight:700,letterSpacing:3,color,...style}}>{children}</div>;
const Plus:React.FC<{x:number;y:number;color?:string;size?:number}>=({x,y,color=C.ink,size=22})=><svg width={size} height={size} style={{position:'absolute',left:x,top:y}}><path d={`M${size/2},0V${size} M0,${size/2}H${size}`} stroke={color} strokeWidth={2}/></svg>;
const PaperDots:React.FC<{color?:string;opacity?:number}>=({color=C.ink,opacity=.10})=><div style={{position:'absolute',inset:0,opacity,backgroundImage:`radial-gradient(${color} 1.15px, transparent 1.15px)`,backgroundSize:'25px 25px',maskImage:'linear-gradient(90deg,transparent 5%,black 75%,transparent)'}}/>;
const Bars:React.FC<{f:number;x:number;y:number;color?:string;count?:number;height?:number}>=({f,x,y,color=C.blue,count=24,height=70})=><div style={{position:'absolute',left:x,top:y,display:'flex',height,gap:5,alignItems:'flex-end'}}>{Array.from({length:count},(_,i)=><div key={i} style={{width:9,height:10+(height-10)*(.2+.8*Math.abs(Math.sin(f*.18+i*.58)))*(.6+.4*pulse(f+i)),background:i%5===0?C.orange:color}}/>)}</div>;
const Ring:React.FC<{x:number;y:number;rx:number;ry:number;color?:string;opacity?:number;width?:number}>=({x,y,rx,ry,color=C.ink,opacity=.15,width=2})=><div style={{position:'absolute',left:x-rx,top:y-ry,width:rx*2,height:ry*2,border:`${width}px solid ${color}`,borderRadius:'50%',opacity}}/>;

export const Scene5:React.FC<SceneProps>=({f,duration})=>{
 const p=pulse(f); const into=smooth(r(f,0,18)); const out=smooth(r(f,duration-24,duration));
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:C.ink}}>
  <PaperDots color={C.paper} opacity={.055}/>
  <div style={{position:'absolute',left:-160,top:-160,width:1450,height:1450,background:`radial-gradient(circle,${C.blue}35,transparent 63%)`}}/>
  {[0,1,2,3,4,5].map(i=>{const q=((f/48+i/6)%1);const size=350+q*1050;return <div key={i} style={{position:'absolute',left:545-size/2,top:548-size/2,width:size,height:size,border:`${i===0?4:2}px solid ${i%2?C.blue:C.paper}`,borderRadius:'50%',opacity:(1-q)*.28,transform:`scaleX(${1-out*.45})`}}/>;})}
  <svg width={W} height={H} style={{position:'absolute',inset:0}}>
   {Array.from({length:60},(_,i)=>{const a=i/60*Math.PI*2; const z=486+Math.sin(f*.14+i*.6)*17+p*25;return <line key={i} x1={545+Math.cos(a)*z} y1={548+Math.sin(a)*z} x2={545+Math.cos(a)*(z+12+(i%5===0?16:0))} y2={548+Math.sin(a)*(z+12+(i%5===0?16:0))} stroke={i%5===0?C.yellow:C.paper} strokeWidth={i%5===0?4:2} opacity={.45}/>;})}
  </svg>
  <Whale x={530+Math.sin(f*.055)*18} y={560-Math.sin(f*.11)*15} size={650} color={C.blue} rotate={-13+Math.sin(f*.075)*6} scale={spring(f,0)*(.98+p*.045)}/>
  <div style={{position:'absolute',left:975,top:255,transform:`translateY(${(1-into)*130}px) rotate(-3deg)`}}>
   {'放开'.split('').map((t,i)=><Text key={t} x={i*190} y={0} size={190} color={C.paper} style={{transform:`scale(${spring(f,5+i*7)})`,textShadow:'6px 8px 0 #303136'}}>{t}</Text>)}
  </div>
  <div style={{position:'absolute',left:980,top:495,transform:`rotate(3deg)`}}>
   {'想象'.split('').map((t,i)=><Text key={t} x={i*244} y={0} size={248} color={i?C.yellow:C.orange} style={{transform:`translateY(${(1-spring(f,27+i*9))*150}px) scale(${spring(f,27+i*9)})`,textShadow:`8px 10px 0 ${i?'#8c6622':'#8d352c'}`}}>{t}</Text>)}
  </div>
  <Small x={105} y={82} color={C.paper}>05 / OPEN YOUR IMAGINATION</Small>
  <Small x={1100} y={842} color={C.paper} style={{opacity:.55}}>LET IT RESONATE</Small>
  <Bars f={f} x={1098} y={889} color={C.green} count={32} height={52}/>
  <div style={{position:'absolute',left:1100,top:796,width:470,height:2,background:C.paper,opacity:.3}}/>
  <Plus x={1770} y={98} color={C.paper}/><Plus x={110} y={940} color={C.blue}/>
  {out>0&&Array.from({length:9},(_,i)=><div key={i} style={{position:'absolute',left:-120,top:i*120+Math.sin(i)*10,width:(1900+Math.sin(i)*220)*out,height:18+out*36,background:C.blue,opacity:out*.8,transform:`translateX(${(i%2?-1:1)*(1-out)*500}px)`}}/>)}
 </div>
};

export const Scene6:React.FC<SceneProps>=({f})=>{
 const pull=smooth(r(f,0,88)); const p=pulse(f); const zoom=mix(1.34,1,pull);
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:C.blue}}>
  <svg width={W} height={H} style={{position:'absolute',inset:0}}>
   {Array.from({length:28},(_,i)=>{const a=-Math.PI+i/27*Math.PI;return <path key={i} d={`M960,390 L${960+Math.cos(a)*2600},${390+Math.sin(a)*2600}`} stroke={i%2?'#5777FF':'#254AE1'} strokeWidth={i%2?80:70} opacity={.45}/>;})}
   <rect x={0} y={460} width={W} height={620} fill={C.blue} opacity={.5}/>
   {Array.from({length:19},(_,i)=><line key={'v'+i} x1={960+(i-9)*38} y1={480} x2={960+(i-9)*320} y2={1080} stroke={C.paper} strokeWidth={1.5} opacity={.19}/>)}
   {[500,527,564,615,685,780,910,1080].map((y,i)=><line key={'h'+i} x1={0} y1={y} x2={W} y2={y} stroke={C.paper} strokeWidth={1.5} opacity={.18}/>)}
  </svg>
  <Small x={105} y={82} color={C.paper}>06 / FOLLOW THE RHYTHM</Small>
  <div style={{position:'absolute',left:0,top:70,width:W,height:390,transform:`translateY(${(1-spring(f,4))*-170}px)`}}>
   <Text x={680} y={45} size={148} color={C.paper} style={{textShadow:'7px 8px 0 #1537AA',transform:'rotate(-3deg)'}}>跟上</Text>
   {'这节拍'.split('').map((t,i)=><Text key={t} x={643+i*185} y={214} size={178} color={i===0?C.paper:C.yellow} style={{transform:`translateY(${(1-spring(f,15+i*8))*150}px) rotate(${i%2?3:-2}deg)`,textShadow:`7px 9px 0 ${i===0?'#1537AA':'#B07720'}`}}>{t}</Text>)}
  </div>
  <div style={{position:'absolute',inset:0,transform:`translate(960px,740px) scale(${zoom}) translate(-960px,-740px)`}}>
   {Array.from({length:13},(_,i)=>{const targetX=150+i*136;const enter=smooth(r(f,7+i%6*4,40+i%6*5));const xx=mix(i<6?-500-i*100:2400+i*80,targetX,enter);const sz=98+(i%3)*18;return <Whale key={'back'+i} x={xx} y={653+Math.sin(f*.14+i*.65)*14} size={sz} color={colors[(i+2)%colors.length]} rotate={Math.sin(f*.09+i)*8} scale={.9+p*.08}/>;})}
   {Array.from({length:9},(_,i)=>{const targetX=130+i*208;const enter=smooth(r(f,10+i%5*3,40+i%5*3));const xx=mix(i<4?-430-i*100:2300+i*100,targetX,enter);return <React.Fragment key={'front'+i}><div style={{position:'absolute',left:xx-54,top:880,width:108,height:16,borderRadius:'50%',background:'#112DA5',opacity:.25}}/><Whale x={xx} y={800-Math.abs(Math.sin(f*.15+i*.6))*30} size={i===4?270:170} color={i===4?C.paper:colors[i]} rotate={-6+Math.sin(f*.1+i)*7} scale={1+p*.045}/></React.Fragment>;})}
  </div>
  <div style={{position:'absolute',left:120,top:982,width:1680,height:2,background:C.paper,opacity:.4}}/>
  <Small x={120} y={1001} color={C.paper}>ONE BEAT. ALL TOGETHER.</Small>
  <Small x={1630} y={1001} color={C.paper}>LET'S GO</Small>
  <Plus x={1770} y={98} color={C.yellow}/>
 </div>
};

const orbit=(i:number,n:number,rx:number,ry:number,phase=0)=>{const a=-2.5+i/n*Math.PI*2+phase;return {a,x:1070+Math.cos(a)*rx,y:650+Math.sin(a)*ry};};
export const Scene7:React.FC<SceneProps>=({f})=>{
 const formation=smooth(r(f,52,108)); const p=pulse(f); const pan=smooth(r(f,0,65)); const textExit=smooth(r(f,78,108));
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:C.paper}}>
  <PaperDots opacity={.07}/>
  <Small x={105} y={82}>07 / MORE & MORE</Small>
  <Plus x={1770} y={98} color={C.blue}/>
  <Text x={115} y={185} size={134} style={{opacity:1-textExit,transform:`translateX(${-textExit*240}px) rotate(-4deg) translateY(${(1-spring(f))*120}px)`}}>一个<span style={{color:C.blue}}>，</span></Text>
  <Text x={365} y={312} size={146} color={C.blue} style={{opacity:1-textExit,transform:`translateX(${-textExit*240}px) rotate(3deg) scale(${spring(f,23)})`,transformOrigin:'left center',textShadow:'5px 6px 0 #c5ccf2'}}>两个<span style={{color:C.ink}}>，</span></Text>
  <Text x={110} y={865} size={118} style={{opacity:1-textExit,transform:`translateX(${(1-spring(f,48))*-650-textExit*240}px)`}}>越来越<span style={{color:C.orange}}>多</span><span style={{color:C.blue}}>！</span></Text>
  {[0,1,2].map(i=><Ring key={i} x={1070} y={650} rx={660+i*24} ry={230+i*13} color={C.ink} opacity={formation*(.07-i*.015)}/>)}
  {Array.from({length:14},(_,i)=>{
    const o=orbit(i,14,660,230);const lineX=-260+i*177-pan*260;const lineY=674+Math.sin(i*.65)*45;
    const x=mix(lineX,o.x,formation); const y=mix(lineY,o.y,formation)-Math.abs(Math.sin(f*.12+i*.5))*12*(1-formation);
    const sz=i===4?228:mix(205-i*5,150+Math.sin(o.a)*30,formation); const appear=spring(f,i*2);
    return <React.Fragment key={i}><div style={{position:'absolute',left:x-sz*.22,top:y+sz*.36,width:sz*.44,height:12,borderRadius:'50%',background:'#bbb8ad',opacity:.14*appear}}/><Whale x={x} y={y} size={sz} color={i===4?C.blue:colors[i]} scale={appear*(1+p*.025)} rotate={mix(-12+Math.sin(f*.05+i)*5,Math.sin(o.a)*12,formation)}/></React.Fragment>
  })}
  <div style={{position:'absolute',left:117,top:1020,width:1690,height:2,background:C.ink,opacity:.2}}/>
  <Small x={1430} y={960} color={C.blue}>GOOD THINGS MULTIPLY</Small>
 </div>
};

export const Scene8:React.FC<SceneProps>=({f})=>{
 const p=pulse(f); const expand=Math.sin(Math.PI*r(f,34,78))*42; const inner=smooth(r(f,9,45));
 return <div style={{position:'absolute',inset:0,overflow:'hidden',background:C.paper}}>
  <PaperDots opacity={.06}/>
  <Small x={105} y={82}>08 / ON THE SAME WAVELENGTH</Small>
  <Plus x={1770} y={98} color={C.orange}/>
  {[0,1,2].map(i=><Ring key={i} x={1070} y={650} rx={660+i*24+expand} ry={230+i*13+expand*.5} color={C.ink} opacity={.07-i*.015}/>)}
  <Ring x={1070} y={650} rx={400*inner+expand*.7} ry={145*inner+expand*.4} color={C.blue} opacity={.12}/>
  {Array.from({length:14},(_,i)=>{
    const o=orbit(i,14,660+expand,230+expand*.5,f*.004);const sz=i===4?228:150+Math.sin(o.a)*30;
    return <Whale key={'o'+i} x={o.x} y={o.y} size={sz} color={i===4?C.blue:colors[i]} scale={1+p*.035} rotate={Math.sin(o.a)*12}/>
  })}
  {Array.from({length:8},(_,i)=>{
    const o=orbit(i,8,405+expand*.6,145+expand*.4,-f*.006+.4);const sz=91+Math.sin(o.a)*17;
    return <Whale key={'i'+i} x={mix(1070,o.x,inner)} y={mix(650,o.y,inner)} size={sz} color={colors[(i+4)%14]} scale={spring(f,10+i*3)*.9} rotate={Math.sin(o.a)*14}/>
  })}
  <div style={{position:'absolute',left:830,top:440,transform:`scale(${spring(f,6)}) rotate(-3deg)`,transformOrigin:'240px 150px'}}>
   <div style={{position:'absolute',left:-30,top:-8,width:490,height:224,borderRadius:10,background:C.blue,boxShadow:'8px 12px 0 #b6bfe9',transform:'rotate(-2deg)'}}/>
   <Text x={16} y={-7} size={195} color={C.paper}>同频</Text>
  </div>
  <Text x={920} y={685} size={90} style={{transform:`rotate(3deg) scale(${spring(f,29)})`,transformOrigin:'center'}}>就一起<span style={{color:C.orange}}>！</span></Text>
  <Small x={118} y={965} color={C.blue}>A LITTLE DIFFERENT.</Small>
  <Small x={118} y={995}>A LOT TOGETHER.</Small>
  <Bars f={f} x={1530} y={963} color={C.blue} count={24} height={48}/>
 </div>
};
