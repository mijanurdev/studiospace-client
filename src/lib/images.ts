export function localStudioImage(title: string, fallback: string): string {
  const map: Record<string, string> = {
    "Lightbox Photo Studio": "/images/studio-lightbox.jpg",
    "CineFrame Sound Stage": "/images/studio-cineframe.jpg",
    "VoiceBox Podcast Room": "/images/studio-voicebox.jpg",
    "Melody Music Suite": "/images/studio-melody.jpg",
    "Canvas Art Workshop": "/images/studio-canvas.jpg",
    "Golden Hour Photo Studio": "/images/studio-golden-hour.jpg",
  };
  return map[title] || fallback;
}