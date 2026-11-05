import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Paper, Tape, PhotoCard, KineticWord, DoodleArrow, Grain} from './components';

type Props = {title: string; subtitle: string; accent: string};

const Intro: React.FC<Props> = ({title, subtitle}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = interpolate(f, [0, 22], [90, 0], {extrapolateRight: 'clamp'});
  const opacity = interpolate(f, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill>
    <Paper color="#F1E7D2" rotate={-1.5} />
    <div style={{position:'absolute', top:190, left:100, right:90, transform:`translateY(${rise}px)`, opacity}}>
      <div style={{fontFamily:'Georgia,serif',fontSize:30,letterSpacing:7,color:'#8C4A3C'}}>FIELD NOTES  /  01</div>
      <div style={{marginTop:65,fontFamily:'Georgia,serif',fontWeight:800,fontSize:91,lineHeight:0.98,color:'#292720',textTransform:'uppercase'}}>{title}</div>
      <div style={{marginTop:48,width:720,fontFamily:'Arial,sans-serif',fontSize:34,lineHeight:1.35,color:'#5E574B'}}>{subtitle}</div>
    </div>
    <div style={{position:'absolute',left:125,top:1120,transform:`rotate(-7deg) translateY(${interpolate(f,[10,35],[120,0],{extrapolateRight:'clamp'})}px)`}}>
      <PhotoCard label="CATATAN VISUAL" />
    </div>
    <Tape x={650} y={1090} rotate={9}/>
    <div style={{position:'absolute',bottom:190,left:120,fontFamily:'Georgia,serif',fontSize:25,color:'#8C4A3C'}}>SWIPE THROUGH THE STORY  →</div>
  </AbsoluteFill>;
};

const StoryScene: React.FC<{index:number; heading:string; body:string; word:string}> = ({index,heading,body,word}) => {
  const f = useCurrentFrame();
  const y = interpolate(f,[0,18],[75,0],{extrapolateRight:'clamp'});
  const spin = interpolate(f,[0,30],[-5,0],{extrapolateRight:'clamp'});
  return <AbsoluteFill>
    <Paper color={index % 2 ? '#E9DFC9' : '#F4EBDD'} rotate={index % 2 ? 1.2 : -0.8}/>
    <div style={{position:'absolute',top:130,left:100,fontFamily:'Arial,sans-serif',fontSize:25,letterSpacing:5,color:'#9A5946'}}>CHAPTER 0{index}  /  NOTES</div>
    <div style={{position:'absolute',top:240,left:95,right:95,transform:`translateY(${y}px)`}}>
      <div style={{fontFamily:'Georgia,serif',fontWeight:800,fontSize:76,lineHeight:1.02,color:'#27251F'}}>{heading}</div>
      <div style={{marginTop:35,width:760,fontFamily:'Arial,sans-serif',fontSize:34,lineHeight:1.38,color:'#514B40'}}>{body}</div>
    </div>
    <div style={{position:'absolute',left:140,top:900,transform:`rotate(${spin}deg)`}}>
      <PhotoCard label={word.toUpperCase()} variant={index}/>
    </div>
    <Tape x={700} y={880} rotate={-11}/>
    <DoodleArrow />
    <div style={{position:'absolute',bottom:185,left:100,right:100,fontFamily:'Georgia,serif',fontSize:27,color:'#8C4A3C'}}>OBSERVATION No. {String(index).padStart(2,'0')} <span style={{float:'right'}}>CITU / STUDIO NOTES</span></div>
  </AbsoluteFill>;
};

const Outro: React.FC = () => {
 const f=useCurrentFrame();
 const op=interpolate(f,[0,15],[0,1],{extrapolateRight:'clamp'});
 return <AbsoluteFill><Paper color="#DCCDB2" rotate={0}/>
   <div style={{position:'absolute',top:430,left:100,right:100,textAlign:'center',opacity:op}}>
    <div style={{fontFamily:'Georgia,serif',fontSize:82,fontWeight:800,lineHeight:1.05,color:'#292720'}}>CERITA BESAR DIMULAI DARI HAL KECIL.</div>
    <div style={{marginTop:55,fontFamily:'Arial,sans-serif',fontSize:32,color:'#665B4D'}}>Simpan video ini dan bagikan ke temanmu.</div>
    <div style={{margin:'110px auto 0',width:250,height:5,background:'#9A5946'}}/>
    <div style={{marginTop:40,fontFamily:'Arial,sans-serif',fontSize:25,letterSpacing:7,color:'#8C4A3C'}}>END OF NOTES</div>
   </div>
 </AbsoluteFill>;
};

export const VintageScrapbook: React.FC<Props> = ({title,subtitle,accent}) => {
 const frame=useCurrentFrame();
 const {durationInFrames}=useVideoConfig();
 const scenes=[
  {from:0,duration:150,component:<Intro title={title} subtitle={subtitle}/>},
  {from:150,duration:165,component:<StoryScene index={1} heading="MULAI DARI RASA INGIN TAHU" body={accent || 'Setiap hal punya cerita. Kita hanya perlu melihatnya dari sudut yang berbeda.'} word="curiosity"/>},
  {from:315,duration:165,component:<StoryScene index={2} heading="PERHATIKAN DETAIL KECIL" body="Potongan informasi sederhana bisa membuka gambaran yang jauh lebih besar." word="details"/>},
  {from:480,duration:165,component:<StoryScene index={3} heading="SAMBUNGKAN POTONGANNYA" body="Ketika semua petunjuk disusun, sebuah cerita mulai terbentuk dengan sendirinya." word="connection"/>},
  {from:645,duration:165,component:<Outro/>}
 ];
 const fade=interpolate(frame,[0,10,durationInFrames-10,durationInFrames],[0,1,1,0],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{backgroundColor:'#D8CBB4',opacity:fade}}>
   {scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}>{s.component}</Sequence>)}
   <KineticWord />
   <Grain />
 </AbsoluteFill>;
};