import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Paper, Tape, PhotoCard, KineticWord, DoodleArrow, Grain} from './components';

type Props = {title: string; subtitle: string; accent: string};

// Foto asli per chapter (Pexels License, disetujui user 2026-11-10).
// 1: rasa ingin tahu, 2: detail kecil, 3: sambungkan potongan.
const CHAPTER_PHOTOS = [
 'photos/chapter1-curiosity.jpg',
 'photos/chapter2-details.jpg',
 'photos/chapter3-connection.jpg',
];

type IntroProps = {title: string; subtitle: string};

const Intro: React.FC<IntroProps> = ({title, subtitle}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = interpolate(f, [0, 22], [90, 0], {extrapolateRight: 'clamp'});
  const opacity = interpolate(f, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  const fadeIn = interpolate(f, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: fadeIn}}>
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
    <div style={{position:'absolute',bottom:190,left:120,fontFamily:'Georgia,serif',fontSize:25,color:'#8C4A3C'}}>TONTON CERITANYA  →</div>
  </AbsoluteFill>;
};

const StoryScene: React.FC<{index:number; heading:string; body:string; word:string}> = ({index,heading,body,word}) => {
  const f = useCurrentFrame();
  const y = interpolate(f,[0,18],[75,0],{extrapolateRight:'clamp'});
  const spin = interpolate(f,[0,30],[-5,0],{extrapolateRight:'clamp'});
  const fadeIn = interpolate(f,[0,15],[0,1],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity: fadeIn}}>
    <Paper color={index % 2 ? '#E9DFC9' : '#F4EBDD'} rotate={index % 2 ? 1.2 : -0.8}/>
    <div style={{position:'absolute',top:130,left:100,fontFamily:'Arial,sans-serif',fontSize:25,letterSpacing:5,color:'#9A5946'}}>CHAPTER 0{index}  /  NOTES</div>
    <div style={{position:'absolute',top:240,left:95,right:95,transform:`translateY(${y}px)`}}>
      <div style={{fontFamily:'Georgia,serif',fontWeight:800,fontSize:76,lineHeight:1.02,color:'#27251F'}}>{heading}</div>
      <div style={{marginTop:35,width:760,fontFamily:'Arial,sans-serif',fontSize:34,lineHeight:1.38,color:'#514B40'}}>{body}</div>
    </div>
    <div style={{position:'absolute',left:140,top:940,transform:`rotate(${spin}deg)`}}>
      <PhotoCard label={word.toUpperCase()} photo={CHAPTER_PHOTOS[index-1]}/>
    </div>
    <Tape x={700} y={920} rotate={-11}/>
    <DoodleArrow />
  </AbsoluteFill>;
};

const Outro: React.FC = () => {
 const f=useCurrentFrame();
 const op=interpolate(f,[0,15],[0,1],{extrapolateRight:'clamp'});
 const fadeIn=interpolate(f,[0,15],[0,1],{extrapolateRight:'clamp'});
 return <AbsoluteFill style={{opacity:fadeIn}}><Paper color="#DCCDB2" rotate={0}/>
   <div style={{position:'absolute',top:0,bottom:0,left:100,right:100,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',opacity:op}}>
    <div style={{fontFamily:'Georgia,serif',fontSize:82,fontWeight:800,lineHeight:1.05,color:'#292720'}}>CERITA BESAR DIMULAI DARI HAL KECIL.</div>
    <div style={{marginTop:55,fontFamily:'Arial,sans-serif',fontSize:32,color:'#665B4D'}}>Simpan video ini dan bagikan ke temanmu.</div>
    <div style={{margin:'70px auto 0',width:250,height:5,background:'#9A5946'}}/>
    <div style={{marginTop:40,fontFamily:'Georgia,serif',fontSize:25,letterSpacing:7,color:'#8C4A3C'}}>END OF NOTES</div>
    <div style={{marginTop:80,display:'flex',gap:30}}>
     {CHAPTER_PHOTOS.map((src,i)=>(
      <div key={src} style={{position:'relative',width:260,padding:10,background:'#F8F2E7',boxShadow:'0 12px 24px rgba(38,30,20,.22)',transform:`rotate(${[-3,2,-2][i]}deg)`}}>
       <img src={staticFile(src)} alt="" style={{width:'100%',height:160,objectFit:'cover',display:'block',filter:'sepia(0.22) saturate(0.92) contrast(1.02)'}}/>
       <div style={{position:'absolute',top:-14,left:'50%',marginLeft:-45,width:90,height:28,background:'rgba(190,164,111,.55)',transform:`rotate(${[4,-5,3][i]}deg)`,boxShadow:'0 3px 7px rgba(0,0,0,.08)'}}/>
      </div>
     ))}
    </div>
   </div>
 </AbsoluteFill>;
};

export const VintageScrapbook: React.FC<Props> = ({title,subtitle,accent}) => {
 const frame=useCurrentFrame();
 const {durationInFrames}=useVideoConfig();
 // Scene tumpang tindih 15 frame: scene baru fade-in di atas scene lama (crossfade),
 // bukan hard cut. Outro mulai di 630 agar fade-in-nya selesai tepat saat Story 3 berakhir.
 const scenes=[
  {from:0,duration:150,component:<Intro title={title} subtitle={subtitle}/>},
  {from:135,duration:180,component:<StoryScene index={1} heading="MULAI DARI RASA INGIN TAHU" body={accent || 'Setiap hal punya cerita. Kita hanya perlu melihatnya dari sudut yang berbeda.'} word="curiosity"/>},
  {from:300,duration:180,component:<StoryScene index={2} heading="PERHATIKAN DETAIL KECIL" body="Potongan informasi sederhana bisa membuka gambaran yang jauh lebih besar." word="details"/>},
  {from:465,duration:180,component:<StoryScene index={3} heading="SAMBUNGKAN POTONGANNYA" body="Ketika semua petunjuk disusun, sebuah cerita mulai terbentuk dengan sendirinya." word="connection"/>},
  {from:630,duration:180,component:<Outro/>}
 ];
 const fade=interpolate(frame,[0,10,durationInFrames-10,durationInFrames],[0,1,1,0],{extrapolateRight:'clamp'});
 // Stempel mengikuti scene yang sedang tampil (bukan timer sendiri):
 // Intro CERITA, Story 1 IDE, Story 2 DETAIL, Story 3 + Outro KISAH.
 const stampWord = frame < 150 ? 'CERITA' : frame < 315 ? 'IDE' : frame < 480 ? 'DETAIL' : 'KISAH';
 const stampStart = frame < 150 ? 0 : frame < 315 ? 150 : frame < 480 ? 315 : frame < 645 ? 480 : 645;
 return <AbsoluteFill style={{backgroundColor:'#D8CBB4',opacity:fade}}>
   {scenes.map((s,i)=><Sequence key={i} from={s.from} durationInFrames={s.duration}>{s.component}</Sequence>)}
   <KineticWord word={stampWord} local={frame - stampStart} />
   <Grain />
 </AbsoluteFill>;
};
