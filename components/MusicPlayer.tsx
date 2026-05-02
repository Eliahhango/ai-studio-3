import React from 'react';

// Royalty-free ambient music from Chosic.com
const MUSIC_URL = 'https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-equinox.mp3';

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioRef }) => {
  return (
    <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
  );
};

export default MusicPlayer;