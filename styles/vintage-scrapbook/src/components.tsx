import React from 'react';
import {interpolate, staticFile} from 'remotion';

export const Paper: React.FC<{color:string;rotate?:number}> = ({color,rotate=0}) => (
 <div style={{position:'absolute',inset:35,background:color,transform:`rotate(${rotate}deg)`,boxShadow:'0 18px 45px rgba(49,37,22,.18)',border:'1px solid rgba(70,55,35,.12)'}}>
  <div style={{position:'absolute',inset:22,border:'1px solid rgba(91,75,53,.15)'}}/>
  <div style={{position:'absolute',right:45,top:40,fontFamily:'Georgia,serif',fontSize:21,color:'rgba(80,65,45,.72)'}}>ARCHIVE • 2026</div>
 </div>
);

export const Tape: React.FC<{x:number;y:number;rotate:number}> = ({x,y,rotate}) => (
 <div style={{position:'absolute',left:x,top:y,width:180,height:48,background:'rgba(190,164,111,.55)',transform:`rotate(${rotate}deg)`,boxShadow:'0 3px 7px rgba(0,0,0,.08)',clipPath:'polygon(2% 0,98% 3%,100% 94%,0 100%)'}}/>
);

export const PhotoCard: React.FC<{label:string;variant?:number;photo?:string}> = ({label,variant=0,photo}) => {
 const colors=['#B5A58A','#A9A08A','#C0A28C','#9D9A83'];
 return <div style={{width:650,height:510,background:'#F8F2E7',padding:20,boxSizing:'border-box',boxShadow:'0 18px 30px rgba(38,30,20,.22)',transform:'rotate(1deg)'}}>
   <div style={{height:405,background: photo ? '#E8DFC9' : `linear-gradient(145deg, ${colors[variant%4]}, #5C6256 55%, #C7B99E)`,position:'relative',overflow:'hidden'}}>
    {photo ? (
     <img src={staticFile(photo)} alt={label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'sepia(0.22) saturate(0.92) contrast(1.02)'}}/>
    ) : (
     <>
      <div style={{position:'absolute',width:270,height:270,borderRadius:'50%',background:'rgba(236,222,190,.28)',left:190,top:55}}/>
      <div style={{position:'absolute',left:60,right:60,bottom:45,height:125,background:'rgba(39,48,40,.35)',clipPath:'polygon(0 100%,22% 25%,38% 70%,60% 0,100% 100%)'}}/>
     </>
    )}
    <div style={{position:'absolute',inset:0,background:'repeating-linear-gradient(0deg,transparent 0 5px,rgba(255,255,255,.035) 6px 7px)'}}/>
   </div>
   <div style={{paddingTop:17,fontFamily:'Georgia,serif',fontSize:23,letterSpacing:3,color:'#544B3D'}}>{label}</div>
 </div>;
};

export const DoodleArrow: React.FC = () => <svg style={{position:'absolute',right:90,bottom:390}} width="210" height="170" viewBox="0 0 210 170">
 <path d="M12 130 C70 15 125 30 175 80 M145 45 L178 82 L132 91" fill="none" stroke="#A45D49" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="260" strokeDashoffset="0"/>
 </svg>;

export const KineticWord: React.FC<{word:string;local:number}> = ({word,local}) => {
 const scale=interpolate(local,[0,10,30],[.65,1.08,1],{extrapolateRight:'clamp'});
 const opacity=interpolate(local,[0,8],[0,1],{extrapolateRight:'clamp'});
 return <div style={{position:'absolute',right:105,bottom:260,opacity,transform:`rotate(-8deg) scale(${scale})`,fontFamily:'Georgia,serif',fontSize:42,fontWeight:800,color:'#9A5946',border:'3px solid #9A5946',padding:'12px 25px',background:'#F2E6D0'}}>{word}</div>;
};

export const Grain: React.FC = () => <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:.16,backgroundImage:'radial-gradient(#4b3a27 0.55px, transparent 0.7px)',backgroundSize:'5px 5px',mixBlendMode:'multiply'}}/>;
