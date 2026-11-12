import React from 'react';
import {Composition} from 'remotion';
import {VintageScrapbook} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="VintageScrapbook"
    component={VintageScrapbook}
    durationInFrames={810}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      title: 'RAHASIA DI BALIK BENDA SEHARI-HARI',
      subtitle: 'Cerita kecil yang sering luput dari perhatian',
      accent: 'Kisah, proses, dan hal menarik di sekitar kita',
    }}
  />
);