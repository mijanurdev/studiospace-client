export function localStudioImage(title: string, fallback: string): string {
  const map: Record<string, string> = {
    "Lightbox Photo Studio": "/images/studio-lightbox.jpg",
    "CineFrame Sound Stage": "/images/studio-cineframe.jpg",
    "VoiceBox Podcast Room": "/images/studio-voicebox.jpg",
    "Melody Music Suite": "/images/studio-melody.jpg",
    "Canvas Art Workshop": "/images/studio-canvas.jpg",
    "Golden Hour Photo Studio": "/images/studio-golden-hour.jpg",
    "FrameHouse Photo Studio": "/images/studio-framehouse.jpg",
    "EchoPoint Sound Stage": "/images/studio-echopoint.jpg",
    "MicDrop Podcast Room": "/images/studio-micdrop.jpg",
    "Harmony Music Suite": "/images/studio-harmony.jpg",
  };
  return map[title] || fallback;
}