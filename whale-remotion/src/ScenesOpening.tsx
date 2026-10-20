import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT, Whale, KText, Label, Dots, pop, range, ease, lerp, beat, type SceneProps} from './common';

const thin = 'rgba(244,242,235,.2)';
const markFont = FONT;

const Rule: React.FC<{x:number;y:number;w:number;color?:string;rotate?:number}> = ({x,y,w,color=C.ink,rotate=0}) =>
  <div style={{position:'absolute',left:x,top:y,width:w,height:3,background:color,transform:`rotate(${rotate}deg)`,transformOrigin:'left center'}}/>;

const Tick: React.FC<{x:number;y:number;color?:string;size?:number}> = ({x,y,color=C.orange,size=30}) => <div style={{position:'absolute',left:x,top:y,width:size,height:size,transform:'translate(-50%,-50%)'}}><div style={{position:'absolute',left:0,top:size/2-2,width:size,height:4,background:color}}/><div style={{position:'absolute',left:size/2-2,top:0,width:4,height:size,background:color}}/></div>;

const Bars: React.FC<{f:number;x:number;y:number;light?:boolean}> = ({f,x,y,light=false}) => <div style={{position:'absolute',left:x,top:y,display:'flex',alignItems:'flex-end',gap:7,height:64}}>{Array.from({length:16},(_,i)=><div key={i} style={{width:10,height:8+48*(.25+.75*Math.abs(Math.sin(f*.16+i*.71))),background:i%5===0?C.orange:light?C.paper:C.blue}}/>)}</div>;

export const Scene1: React.FC<SceneProps> = ({f}) => {
  const launch=pop(f,7,.85);
  const tilt=ease(range(f,44,61));
  const whaleY=lerp(1160,730,launch)-Math.sin(f*.14)*18;
  const chars=['听','见','了','吗','？'];
  return <AbsoluteFill style={{background:C.ink,overflow:'hidden'}}>
    <Dots color={C.paper} opacity={.075} spacing={54}/>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 52% 67%, rgba(49,85,245,.30), transparent 56%)'}}/>
    <Label x={90} y={77} color={C.paper}>WHALE MOTION / 01</Label>
    <Label x={1560} y={77} color={C.paper}>128 / FEEL THE BEAT</Label>
    <Rule x={90} y={122} w={1740} color={thin}/>
    <svg width={1920} height={1080} style={{position:'absolute',inset:0}}>
      {Array.from({length:5},(_,i)=>{
        const t=range(f,10+i*7,53+i*7);
        return <circle key={i} cx={960} cy={750} r={90+720*ease(t)} fill="none" stroke={i%2===0?C.blue:C.paper} strokeWidth={i===0?8:2} opacity={(1-t)*.65*(f>=10+i*7?1:0)}/>;
      })}
      <path d="M90 820 H310 M1610 820 H1830" stroke={C.paper} strokeWidth="3" opacity=".3"/>
    </svg>
    {chars.map((ch,i)=>{
      const a=pop(f,i*4,.8);
      return <KText key={i} text={ch} x={530+i*215} y={330-90*(1-a)+tilt*(i-2)*9} size={202} color={i===4?C.yellow:C.paper} rotate={(1-a)*(i%2?-13:13)+tilt*(i-2)*-2} style={{opacity:Math.min(1,a),transform:`scale(${a})`,letterSpacing:'-.08em'}} shadow/>;
    })}
    <Whale x={960+tilt*85} y={whaleY} size={530} color={C.blue} rotate={-12+6*Math.sin(f*.1)+tilt*9} scale={.5+.5*launch+.045*beat(f)}/>
    <Tick x={610} y={680} size={26} color={C.yellow}/>
    <Tick x={1350} y={830} size={40} color={C.orange}/>
    <Tick x={1430} y={555} size={20} color={C.paper}/>
    <Bars f={f} x={90} y={918} light/>
    <Label x={1550} y={958} color={C.paper}>A LITTLE BLUE.</Label>
    <Label x={1550} y={997} color={C.paper}>A BIG WAVE.</Label>
  </AbsoluteFill>;
};

const LetterBlock:React.FC<{letter:string;x:number;y:number;rotate:number;bg:string;fg:string;scale:number;size?:number}> = ({letter,x,y,rotate,bg,fg,scale,size=258}) => <div style={{position:'absolute',left:x,top:y,width:size,height:size,transform:`translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,background:bg,border:`4px solid ${C.ink}`,boxShadow:`13px 15px 0 ${C.ink}`,borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:markFont,fontWeight:900,fontSize:size*.75,color:fg,lineHeight:1}}>{letter}</div>;

export const Scene2:React.FC<SceneProps> = ({f}) => {
  const enter=ease(range(f,0,30));
  const impact=pop(f,21,.8);
  const rush=ease(range(f,88,112));
  const colors=[C.yellow,C.paper,C.blue];
  const xs=[1000,1300,1600];
  return <AbsoluteFill style={{background:C.paper,overflow:'hidden'}}>
    <Dots color={C.blue} opacity={.14} spacing={32}/>
    <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,background:'linear-gradient(120deg, transparent 67%, rgba(49,85,245,.05) 67%)'}}/>
    <Label x={90} y={76}>WHALE MOTION / 02</Label>
    <Label x={1520} y={76}>BLUE IS A BEGINNING.</Label>
    <Rule x={90} y={121} w={1740}/>
    <KText text="HELLO," x={116} y={257} size={99} align="left" color={C.ink} rotate={-3}/>
    <KText text="BLUE!" x={116} y={363} size={118} align="left" color={C.blue} rotate={-3}/>
    <svg width={1920} height={1080} style={{position:'absolute',inset:0}}>
      <path d="M85 909 H1835 M570 910 V1004 M880 910 V1004" fill="none" stroke={C.ink} strokeWidth="3"/>
      <path d="M790 625 C840 625 850 535 900 535" fill="none" stroke={C.orange} strokeWidth="9" strokeDasharray="15 12"/>
      <path d="M870 510 L910 535 L878 566" fill="none" stroke={C.orange} strokeWidth="9"/>
    </svg>
    {['一','点','蓝'].map((ch,i)=>{
      const a=pop(f,24+i*5,.9);
      const displacement=(impact-1)*(38+20*i);
      return <LetterBlock key={i} letter={ch} x={xs[i]+displacement+rush*(i-1)*700} y={540+Math.sin(i*1.8)*55-rush*180} rotate={[-8,6,-5][i]+(impact-1)*(i===1?25:-25)+rush*(i-1)*25} bg={colors[i]} fg={i===2?C.paper:C.ink} scale={a*(1-rush*.25)}/>;
    })}
    <Whale x={lerp(-470,490,enter)+rush*480} y={665+Math.sin(f*.09)*20-rush*80} size={660} color={C.blue} rotate={-17+enter*12+rush*8} scale={1+(.025*beat(f))+rush*2.1}/>
    {f>26&&f<61&&Array.from({length:8},(_,i)=>{
      const a=i*Math.PI/4;const q=range(f,26,61);const r=150+250*q;
      return <div key={i} style={{position:'absolute',left:805+Math.cos(a)*r,top:560+Math.sin(a)*r,width:8,height:34,background:i%2?C.orange:C.blue,opacity:1-q,transform:`rotate(${a*180/Math.PI-90}deg)`}}/>;
    })}
    <Label x={90} y={958}>01 / ONE WHALE</Label>
    <Label x={625} y={958}>ONE BLUE</Label>
    <KText text="从这一点，开始。" x={1110} y={958} size={35} align="left" color={C.ink}/>
    <Tick x={1760} y={260} color={C.orange} size={60}/>
  </AbsoluteFill>;
};

export const Scene3:React.FC<SceneProps> = ({f}) => {
  const zoom=ease(range(f,92,113));
  const orbit=f*.025;
  return <AbsoluteFill style={{background:C.blue,overflow:'hidden'}}>
    <Dots color={C.paper} opacity={.12} spacing={40}/>
    <Label x={90} y={78} color={C.paper}>WHALE MOTION / 03</Label>
    <Label x={1540} y={78} color={C.paper}>ROTATE THE RHYTHM</Label>
    <Rule x={90} y={122} w={1740} color="rgba(244,242,235,.4)"/>
    <div style={{position:'absolute',inset:0,transform:`translate(${zoom*20}px,${zoom*-100}px) scale(${1+zoom*1.8}) rotate(${zoom*-13}deg)`,transformOrigin:'960px 600px'}}>
      <svg width={1920} height={1080} style={{position:'absolute',inset:0}}>
        <circle cx="960" cy="600" r="410" fill={C.ink}/>
        <circle cx="960" cy="600" r="437" fill="none" stroke={C.paper} strokeWidth="3"/>
        <circle cx="960" cy="600" r="365" fill="none" stroke={C.paper} strokeWidth="2" opacity=".22"/>
        <ellipse cx="960" cy="640" rx="655" ry="250" fill="none" stroke={C.paper} strokeWidth="2" opacity=".45"/>
        <ellipse cx="960" cy="600" rx="720" ry="390" fill="none" stroke={C.paper} strokeWidth="1" opacity=".22" transform="rotate(12 960 600)"/>
        {Array.from({length:48},(_,i)=>{
          const a=i*Math.PI/24+orbit*.4;
          return <line key={i} x1={960+Math.cos(a)*449} y1={600+Math.sin(a)*449} x2={960+Math.cos(a)*(i%4?460:476)} y2={600+Math.sin(a)*(i%4?460:476)} stroke={i%4?C.paper:C.yellow} strokeWidth={i%4?2:5} opacity=".8"/>;
        })}
      </svg>
      <KText text="让节奏" x={960} y={196} size={116} color={C.paper} style={{transform:`scale(${pop(f,3,.9)})`}} shadow/>
      <Whale x={960+Math.sin(orbit)*38} y={655+Math.cos(orbit)*18} size={495} color={C.paper} rotate={-20+Math.sin(orbit)*20} scale={1+.035*beat(f)}/>
      {['转','起','来'].map((letter,i)=>{
        const a=orbit+i*Math.PI*2/3-.5;
        const xx=960+Math.cos(a)*655;
        const yy=640+Math.sin(a)*250;
        return <LetterBlock key={i} letter={letter} x={xx} y={yy} size={185} rotate={Math.sin(a)*15+6} bg={[C.orange,C.yellow,C.pink][i]} fg={C.ink} scale={pop(f,9+i*5,.95)}/>;
      })}
      <div style={{position:'absolute',left:130,top:814,width:200,height:79,border:`3px solid ${C.paper}`,borderRadius:100,transform:'rotate(-12deg)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:markFont,fontWeight:900,fontSize:32,color:C.paper}}>128 BPM ↻</div>
      <Bars f={f} x={1550} y={875} light/>
    </div>
    <Label x={90} y={1000} color={C.paper}>ROUND AND ROUND. KEEP IT MOVING.</Label>
    <Tick x={1810} y={978} color={C.yellow} size={35}/>
  </AbsoluteFill>;
};

const WhaleCard:React.FC<{x:number;y:number;rotate:number;scale:number;color:string;number:string;flip?:number;z:number}> = ({x,y,rotate,scale,color,number,flip=0,z}) => {
  const w=430,h=550;
  return <div style={{position:'absolute',left:x,top:y,width:w,height:h,transform:`translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,perspective:1400,zIndex:z}}>
    <div style={{position:'absolute',inset:0,transformStyle:'preserve-3d',transform:`rotateY(${flip}deg)`}}>
      <div style={{position:'absolute',inset:0,background:C.paper,border:`3px solid ${C.ink}`,boxShadow:'10px 15px 0 rgba(17,18,20,.16)',backfaceVisibility:'hidden',borderRadius:6}}>
        <div style={{position:'absolute',left:18,top:18,right:18,height:410,background:color,overflow:'hidden'}}><Whale x={197} y={213} size={320} color={color===C.yellow?C.ink:C.paper} rotate={-7}/><div style={{position:'absolute',right:15,top:15,width:13,height:13,borderRadius:20,background:C.paper}}/></div>
        <div style={{position:'absolute',left:24,top:449,fontFamily:markFont,fontSize:24,fontWeight:900,color:C.ink,letterSpacing:2}}>WHALE / {number}</div>
        <div style={{position:'absolute',left:24,top:493,fontFamily:markFont,fontSize:17,fontWeight:700,color:C.ink,letterSpacing:3}}>A NEW DISCOVERY</div>
      </div>
      <div style={{position:'absolute',inset:0,background:C.ink,border:`3px solid ${C.ink}`,backfaceVisibility:'hidden',transform:'rotateY(180deg)',borderRadius:6}}><Whale x={215} y={255} size={240} color={C.blue}/><div style={{position:'absolute',left:0,right:0,bottom:67,color:C.paper,fontFamily:markFont,textAlign:'center',fontSize:25,letterSpacing:7}}>DISCOVER.</div></div>
    </div>
  </div>;
};

export const Scene4:React.FC<SceneProps> = ({f}) => {
  const entrance=pop(f,3,.75);
  const spread=ease(range(f,70,140));
  const close=ease(range(f,178,210));
  const follow=-130*ease(range(f,95,165));
  const flip=180*ease(range(f,205,225));
  const specs=[
    {x:840,y:330,r:-16,c:C.orange,n:'02'},
    {x:1590,y:340,r:14,c:C.yellow,n:'03'},
    {x:1610,y:830,r:19,c:C.pink,n:'04'},
    {x:1040,y:870,r:-12,c:C.green,n:'05'},
  ];
  return <AbsoluteFill style={{background:C.paper,overflow:'hidden'}}>
    <Dots color={C.ink} opacity={.1} spacing={34}/>
    <Label x={90} y={77}>WHALE MOTION / 04</Label>
    <Label x={1510} y={77}>TAKE A CLOSER LOOK.</Label>
    <Rule x={90} y={121} w={1740}/>
    <div style={{position:'absolute',left:0,top:0,width:1920,height:1080,background:'radial-gradient(ellipse at 65% 60%, rgba(49,85,245,.09), transparent 60%)'}}/>
    <KText text="慢一点" x={100} y={280} size={143} color={C.ink} align="left" rotate={-3} style={{transform:`scale(${pop(f,10,.85)})`,transformOrigin:'left center'}}/>
    <KText text="也有" x={105} y={480} size={94} color={C.ink} align="left" style={{transform:`translateY(${60*(1-pop(f,62))}px)`,opacity:Math.min(1,pop(f,62))}}/>
    <div style={{position:'absolute',left:96,top:568,width:570,height:178,background:C.blue,transform:`rotate(-4deg) scale(${pop(f,83,.8)})`,transformOrigin:'left center',boxShadow:`9px 11px 0 ${C.ink}`}}><KText text="新发现" x={285} y={86} size={132} color={C.paper}/></div>
    <Label x={105} y={839}>LOOK A LITTLE CLOSER.</Label>
    <Rule x={105} y={894} w={460} color={C.ink}/>
    <Bars f={f*.55} x={105} y={930}/>
    {specs.map((s,i)=>{
      const localSpread=ease(range(f,73+i*9,136+i*9))*(1-close);
      const size=.71+.13*localSpread;
      const x=lerp(1270,s.x,localSpread)+follow*(1-close);
      const y=lerp(610,s.y,localSpread)+Math.sin(f*.04+i)*10*localSpread;
      return <WhaleCard key={s.n} x={x} y={y} rotate={s.r*localSpread} scale={size*Math.min(1,pop(f,69+i*9,.8))} color={s.c} number={s.n} z={10+i} flip={Math.max(0,flip-18-i*6)}/>;
    })}
    <WhaleCard x={1270+follow*(1-close)} y={610+(1-entrance)*-900+Math.sin(f*.045)*9*(1-close)} rotate={7-14*(1-entrance)+Math.sin(f*.025)*2-close*7} scale={entrance*(1+.055*spread-.03*close)} color={C.blue} number="01" z={30} flip={flip}/>
    <Tick x={1760} y={170} color={C.orange} size={42}/>
    <Tick x={726} y={760} color={C.blue} size={25}/>
  </AbsoluteFill>;
};
