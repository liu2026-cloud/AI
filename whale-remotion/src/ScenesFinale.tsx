import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT, Whale, KText, Label, Dots, pop, lerp, range, ease, beat} from './common';

type SceneProps = {f: number; duration: number};
const TAU = Math.PI * 2;
const colors = [C.blue, C.orange, C.yellow, C.pink, C.green, C.paper];

const Cross: React.FC<{x:number;y:number;size?:number;color?:string;rotate?:number;opacity?:number}> = ({x,y,size=24,color=C.yellow,rotate=0,opacity=1}) => (
  <div style={{position:'absolute',left:x,top:y,width:size,height:size,transform:`translate(-50%,-50%) rotate(${rotate}deg)`,opacity}}>
    <div style={{position:'absolute',left:0,top:size*.42,width:size,height:size*.16,background:color}}/>
    <div style={{position:'absolute',left:size*.42,top:0,width:size*.16,height:size,background:color}}/>
  </div>
);

const Rays: React.FC<{f:number;opacity?:number}> = ({f,opacity=.1}) => (
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity}} viewBox="0 0 1920 1080">
    <g transform={`rotate(${f*.12} 960 470)`} fill={C.paper}>
      {Array.from({length:24},(_,i)=>{
        const a=i*TAU/24, b=a+.065;
        return <polygon key={i} points={`960,470 ${960+2400*Math.cos(a)},${470+2400*Math.sin(a)} ${960+2400*Math.cos(b)},${470+2400*Math.sin(b)}`}/>;
      })}
    </g>
  </svg>
);

const Confetti: React.FC<{f:number;count?:number;opacity?:number;slow?:boolean}> = ({f,count=34,opacity=1,slow=false}) => <>
  {Array.from({length:count},(_,i)=>{
    const x=(i*271+147)%1920;
    const start=(i*177)%1280-260;
    const y=(start+f*(slow?1.7:4.5)+i%3*f*.15)%1320-100;
    const a=i*47+f*(i%2?1.7:-1.25);
    const c=colors[i%colors.length];
    return i%5===0 ? <Cross key={i} x={x+Math.sin(f*.028+i)*24} y={y} color={c} size={18+i%4*4} rotate={a} opacity={opacity}/> :
      <div key={i} style={{position:'absolute',left:x+Math.sin(f*.025+i)*20,top:y,width:i%3===0?10:19,height:i%3===0?10:6,borderRadius:i%3===0?'50%':1,background:c,transform:`rotate(${a}deg)`,opacity}}/>;
  })}
</>;

export const Scene9: React.FC<SceneProps> = ({f}) => {
  const change=ease(range(f,53,72));
  const impact=beat(f+3);
  const whaleX=lerp(505,1445,change);
  const whaleY=lerp(570,650,change);
  const whaleSize=lerp(960,675,change);
  const enter=pop(f,0,.8);
  return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
    <Dots color={C.paper} opacity={.09} spacing={38}/>
    <div style={{position:'absolute',left:lerp(1300,310,change),top:115,width:650,height:650,border:'2px solid #ffffff1e',borderRadius:'50%',transform:`rotate(${f*.3}deg)`}}/>
    <div style={{position:'absolute',left:45,top:45,right:45,bottom:45,border:'1px solid #ffffff24'}}/>
    <Label x={88} y={80} color={C.paper}>AMPLIFY THE FEELING</Label>
    <Label x={1690} y={80} color={C.yellow}>09 / 热爱</Label>
    <Whale x={whaleX} y={whaleY+Math.sin(f*.14)*8} size={whaleSize} color={C.blue} rotate={lerp(-17,14,change)+Math.sin(f*.09)*4} scale={enter*(1+impact*.035)}/>
    <Whale x={lerp(175,1730,change)} y={230} size={115} color={C.orange} rotate={lerp(23,-22,change)+f*.25}/>
    <div style={{position:'absolute',left:lerp(1020,150,change),top:lerp(175,206,change),width:lerp(755,980,change),height:580,borderTop:`9px solid ${C.orange}`,transform:`rotate(${lerp(-5,2,change)}deg)`}}/>
    <KText text="放大" x={lerp(1350,656,change)} y={lerp(365,395,change)} size={235} color={C.paper} rotate={lerp(-5,2,change)} shadow={true} style={{transform:`scale(${pop(f,3,.9)*(1+impact*.03)})`,letterSpacing:4,textShadow:`9px 12px 0 ${C.blue}`}}/>
    <KText text="热爱" x={lerp(1360,665,change)} y={lerp(664,691,change)} size={270} color={C.yellow} rotate={lerp(4,-4,change)} shadow={true} style={{transform:`scale(${pop(f,18,.9)*(1+beat(f+7)*.045)})`,letterSpacing:5,textShadow:`10px 13px 0 ${C.orange}`}}/>
    {Array.from({length:7},(_,i)=><Cross key={i} x={190+i*258} y={i%2?895:155} size={19+i%3*9} color={colors[(i+1)%5]} rotate={f*.8+i*24}/>)}
    <div style={{position:'absolute',left:88,bottom:80,height:4,width:1740,background:'#ffffff25'}}>
      <div style={{height:4,width:1740*range(f,0,112),background:C.blue}}/>
    </div>
    <Label x={88} y={968} color={C.paper}>把每一次跃动，都放大。</Label>
    <div style={{position:'absolute',right:88,top:940,display:'flex',gap:8}}>
      {[0,1,2,3,4,5,6,7,8].map(i=><div key={i} style={{width:14,height:18+((i*11+Math.floor(f/3))%31),background:i<6?C.blue:C.orange,alignSelf:'flex-end'}}/>)}
    </div>
  </AbsoluteFill>;
};

const Panel: React.FC<{f:number;index:number;stage:number;merge:number}> = ({f,index,stage,merge}) => {
  const firstX=index%2*960, firstY=Math.floor(index/2)*540;
  const x2=index%2*960, y2=index<2?0:1080;
  const x3=index===0?0:1920+(index-1)*960;
  const x=lerp(lerp(firstX,x2,stage),x3,merge);
  const y=lerp(firstY,y2,stage)*(1-merge);
  const w=lerp(960,index===0?1920:960,merge);
  const h=lerp(540,1080,stage);
  const panelColors=[C.blue,C.paper,C.pink,C.yellow];
  const whaleColors=[C.paper,C.blue,C.yellow,C.ink];
  const char=['现','在','一','起'][index];
  const giant=merge>.5;
  const pulse=beat(f+index*4)*.06;
  const wx=lerp(w*.55,590,ease(merge));
  const wy=lerp(h*.52,540,ease(merge));
  const size=lerp(400,740,stage)*(1+pulse);
  return <div style={{position:'absolute',left:x,top:y,width:w,height:h,overflow:'hidden',background:panelColors[index],boxSizing:'border-box',border:`7px solid ${C.ink}`}}>
    <div style={{position:'absolute',left:-w*.25,top:h*.7,width:w*1.7,height:2,background:index===0?'#ffffff60':'#11121435',transform:`rotate(${-26+index*17}deg)`}}/>
    <Whale x={wx+Math.sin(f*.08+index*2)*23} y={wy} size={size} color={whaleColors[index]} rotate={[-22,17,24,-16][index]+Math.sin(f*.08+index)*12+merge*15} scale={pop(f,index*3,.85)}/>
    <div style={{position:'absolute',left:34,top:24,fontFamily:FONT,fontWeight:900,fontSize:stage>.4?126:105,lineHeight:1,color:index===0?C.yellow:C.ink,transform:`rotate(${index%2?4:-5}deg)`,textShadow:index===0?'5px 5px 0 #111214':'4px 5px 0 #ffffff66'}}>
      {stage>.4?(index===0?'现在':'一起'):char}
    </div>
    {giant&&index===0&&<KText text="一起" x={1440} y={575} size={260} color={C.yellow} rotate={-7} style={{textShadow:`12px 15px 0 ${C.ink}`,transform:`scale(${pop(f,84,.9)})`}}/>}
    <div style={{position:'absolute',left:34,bottom:24,fontFamily:'monospace',fontSize:18,fontWeight:700,letterSpacing:4,color:index===0?C.paper:C.ink}}>{['BLUE / 01','PAPER / 02','PINK / 03','YELLOW / 04'][index]}</div>
    <Cross x={w-58} y={h-52} color={index===0?C.yellow:C.ink} size={30} rotate={f*.7+index*45}/>
  </div>;
};

export const Scene10: React.FC<SceneProps> = ({f}) => {
  const stage=ease(range(f,39,62));
  const merge=ease(range(f,78,101));
  return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
    {[3,2,1,0].map(i=><Panel key={i} f={f} index={i} stage={stage} merge={merge}/>)}
    {f<40&&<div style={{position:'absolute',left:960,top:540,width:105,height:105,borderRadius:'50%',background:C.ink,transform:`translate(-50%,-50%) rotate(${f*2}deg) scale(${pop(f,6)})`,border:`5px solid ${C.paper}`,boxShadow:'0 0 0 6px #111214'}}>
      <Whale x={52} y={52} size={70} color={C.paper} rotate={-f*2}/>
    </div>}
  </AbsoluteFill>;
};

export const Scene11: React.FC<SceneProps> = ({f}) => {
  const collect=ease(range(f,35,69));
  const open=pop(f,0,.9);
  const settle=ease(range(f,46,73));
  const fade=1-range(f,57,74);
  const whSize=lerp(775,520,settle);
  const whY=lerp(425,390,settle);
  return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
    <Rays f={f} opacity={.13}/>
    <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:fade}}>
      {[300,460,620,780].map((r,i)=><circle key={i} cx="960" cy="470" r={r+beat(f+i*3)*16} fill="none" stroke={i%2?C.orange:C.blue} strokeWidth={i===0?4:1.5} opacity={.65-i*.1}/>)}
    </svg>
    {Array.from({length:24},(_,i)=>{
      const a=i*TAU/24+f*.018*(i%2?1:-1);
      const radius=lerp(350+pop(f,0,1)*(i%3*190+150),30,collect);
      const x=960+Math.cos(a)*radius*1.3;
      const y=440+Math.sin(a)*radius*.82;
      return <Whale key={i} x={x} y={y} size={lerp(92+i%3*23,35,collect)} color={colors[(i+1)%colors.length]} rotate={a*180/Math.PI+90} opacity={fade} scale={open}/>;
    })}
    <Whale x={960} y={whY} size={whSize} color={C.blue} rotate={lerp(-12+Math.sin(f*.2)*4,0,settle)} scale={open*(1+beat(f)*.04*(1-settle))}/>
    <div style={{opacity:fade}}>
      <KText text="一起" x={650} y={810} size={206} color={C.paper} rotate={-5} style={{textShadow:`8px 10px 0 ${C.blue}`,transform:`scale(${pop(f,3,.95)})`}}/>
      <KText text="鲸动！" x={1240} y={810} size={212} color={C.yellow} rotate={5} style={{textShadow:`8px 11px 0 ${C.orange}`,transform:`scale(${pop(f,12,.95)})`}}/>
      <Label x={90} y={88} color={C.paper}>ALL TOGETHER / 一起鲸动</Label>
      <Cross x={1735} y={150} color={C.yellow} size={64} rotate={f*2}/>
      <Cross x={160} y={820} color={C.orange} size={44} rotate={-f*1.5}/>
    </div>
    <Confetti f={f} count={48} opacity={fade}/>
  </AbsoluteFill>;
};

export const Scene12: React.FC<SceneProps> = ({f}) => {
  const settle=pop(f,0,.75);
  const wobble=f<40?Math.sin(f*.3)*(1-range(f,0,40)):0;
  return <AbsoluteFill style={{background:C.paper,overflow:'hidden'}}>
    <Dots color={C.ink} opacity={.075} spacing={38}/>
    <div style={{position:'absolute',left:70,top:70,right:70,bottom:70,border:`1px solid #11121422`}}/>
    <div style={{position:'absolute',left:800,top:882,width:320,height:5,background:C.blue,transform:`scaleX(${ease(range(f,28,50))})`}}/>
    <Whale x={960} y={390-12*(1-settle)} size={520} color={C.blue} rotate={wobble} scale={.98+.02*settle}/>
    {['一','起','鲸','动'].map((ch,i)=><KText key={ch} text={ch} x={659+i*201} y={756} size={174} color={i===2?C.blue:C.ink} rotate={i===2?-3:0} style={{transform:`translateY(${(1-pop(f,i*8+2,.85))*110}px) scale(${pop(f,i*8+2,.85)})`,textShadow:i===2?`6px 7px 0 ${C.yellow}`:'none'}}/>)}
    <KText text="让一抹蓝，带动一整场热闹" x={960} y={941} size={27} color={C.ink} style={{letterSpacing:7,opacity:ease(range(f,30,51))}}/>
    <Label x={102} y={112} color={C.ink}>WHALE IN MOTION</Label>
    <Label x={1670} y={112} color={C.blue}>一起鲸动 / 45</Label>
    <Confetti f={f} count={27} opacity={.85} slow/>
    <Cross x={1640} y={720} color={C.orange} size={27} rotate={25}/>
    <Cross x={275} y={370} color={C.blue} size={24} rotate={-15}/>
  </AbsoluteFill>;
};
