import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

export function loadBeep() {
  const beepAudio = new Audio(gravitationalBeep);
  beepAudio.load();

  return () => {
    beepAudio.currentTime = 0;
    beepAudio.play().catch((err) => {
      console.error('Failed to play audio', err);
    });
  };
}