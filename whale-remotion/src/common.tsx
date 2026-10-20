import React from 'react';
import {staticFile} from 'remotion';

export type SceneProps = {f: number; duration: number};
export const C = {ink:'#111214',paper:'#F4F2EB',blue:'#3155F5',orange:'#FF7B3D',yellow:'#FFD84D',pink:'#ED5DA0',green:'#38B884'};
export const FONT = 'Whale Sans, Noto Sans CJK SC, sans-serif';
export const clamp = (v:number,lo=0,hi=1) => Math.max(lo,Math.min(hi,v));
export const lerp = (a:number,b:number,t:number) => a+(b-a)*t;
export const range = (f:number,a:number,b:number) => clamp((f-a)/(b-a));
export const ease = (t:number) => {const x=clamp(t);return x*x*(3-2*x);};
export const pop = (f:number,delay=0,speed=1) => {const t=Math.max(0,(f-delay)*speed);return f<delay?0:1-Math.exp(-t/7)*Math.cos(t*.29);};
export const beat = (f:number) => Math.exp(-(((f%14.0625)+14.0625)%14.0625)/3.6);

export const Whale:React.FC<{x:number;y:number;size:number;color?:string;rotate?:number;scale?:number;opacity?:number;style?:React.CSSProperties}> = ({x,y,size,color=C.blue,rotate=0,scale=1,opacity=1,style}) => <div style={{position:'absolute',left:x,top:y,width:size,height:size,transform:`translate(-50%,-50%) rotate(${rotate}deg) scale(${scale})`,opacity,...style}}><div style={{width:'100%',height:'100%',backgroundColor:color,maskImage:`url("${staticFile('54545.png')}")`,WebkitMaskImage:`url("${staticFile('54545.png')}")`,maskSize:'contain',WebkitMaskSize:'contain',maskRepeat:'no-repeat',WebkitMaskRepeat:'no-repeat',maskPosition:'center',WebkitMaskPosition:'center'}}/></div>;

export const KText:React.FC<{text:string;x:number;y:number;size?:number;color?:string;align?:'left'|'center'|'right';rotate?:number;style?:React.CSSProperties;shadow?:boolean|string}> = ({text,x,y,size=140,color=C.ink,align='center',rotate=0,style,shadow=false}) => <div style={{position:'absolute',left:x,top:y,transform:`translate(${align==='left'?'0':align==='right'?'-100%':'-50%'},-50%) rotate(${rotate}deg)`,whiteSpace:'pre',fontFamily:FONT,textAlign:align}}><div style={{fontSize:size,fontWeight:900,lineHeight:1.12,letterSpacing:'-.045em',color,textShadow:typeof shadow==='string'?shadow:shadow?`5px 7px 0 ${color===C.ink?'#00000020':'#00000055'}`:undefined,...style}}>{text}</div></div>;

export const Label:React.FC<{children:React.ReactNode;x:number;y:number;color?:string}> = ({children,x,y,color=C.ink}) => <div style={{position:'absolute',left:x,top:y,color,fontFamily:FONT,fontWeight:700,fontSize:16,letterSpacing:3,whiteSpace:'nowrap'}}>{children}</div>;

export const Dots:React.FC<{color?:string;opacity?:number;spacing?:number}> = ({color=C.ink,opacity=.12,spacing=32}) => <div style={{position:'absolute',inset:0,opacity,backgroundImage:`radial-gradient(${color} 1px,transparent 1.3px)`,backgroundSize:`${spacing}px ${spacing}px`,pointerEvents:'none'}}/>;

export const Burst:React.FC<{color?:string;opacity?:number;rotate?:number}> = ({color=C.paper,opacity=.09,rotate=0}) => <div style={{position:'absolute',width:2700,height:2700,left:960,top:540,transform:`translate(-50%,-50%) rotate(${rotate}deg)`,background:`repeating-conic-gradient(from 0deg, ${color} 0deg 8deg, transparent 8deg 16deg)`,opacity,pointerEvents:'none'}}/>;

export const Star:React.FC<{x:number;y:number;size?:number;color?:string;rotate?:number}> = ({x,y,size=30,color=C.yellow,rotate=0}) => <svg width={size} height={size} viewBox="0 0 100 100" style={{position:'absolute',left:x-size/2,top:y-size/2,transform:`rotate(${rotate}deg)`}}><path d="M50 0 60 39 100 50 60 60 50 100 39 60 0 50 39 39Z" fill={color}/></svg>;
