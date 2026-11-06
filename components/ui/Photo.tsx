import Image, { type ImageProps } from "next/image";

// Focal point of each photo (object-position), so faces and subjects stay in frame
// whatever shape the container is. Add an entry when you add a photo.
const FOCUS: Record<string, string> = {
  "/img/scene-01.jpg": "62% 70%", // banana leaves at night
  "/img/scene-02.jpg": "42% 62%", // planning on the laptop
  "/img/scene-03.jpg": "45% 65%", // skull + chalkboard
  "/img/scene-04.jpg": "45% 38%", // reaper
  "/img/scene-05.jpg": "55% 45%", // thatch roof
  "/img/scene-06.jpg": "45% 70%", // team at the Vayu sign
  "/img/scene-07.jpg": "50% 35%", // lantern wall
  "/img/photo-08.jpg": "40% 56%", // briefing the chef
  "/img/photo-09.jpg": "40% 56%",
};

/** next/image with the photo's focal point applied. */
export default function Photo({ style, ...props }: ImageProps) {
  const focus = typeof props.src === "string" ? FOCUS[props.src] : undefined;
  return <Image {...props} style={focus ? { objectPosition: focus, ...style } : style} />;
}
