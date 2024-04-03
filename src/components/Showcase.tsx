import { For } from "solid-js";
import { Slider, SliderProvider } from "solid-slider";
import "solid-slider/slider.css";
//@ts-ignore
import { autoplay } from "solid-slider/plugins/autoplay";
import { cn } from "../lib";

type Props = {
  images: { src: string; alt: string }[];
  description?: string;
  classRoot?: string;
  classImage?: string;
};

export default function Showcase(props: Props) {
  return (
    <div class={cn("min-w-[calc(100vw-2rem)] md:min-w-0", props.classRoot)}>
      <div class="bg-zinc-700">
        <SliderProvider>
          <Slider options={{ loop: true }} plugins={[autoplay(3000, {})]}>
            <For each={props.images}>
              {(image) => (
                <img
                  class={cn("object-cover max-h-96", props.classImage)}
                  src={image.src}
                  alt={image.alt}
                />
              )}
            </For>
          </Slider>
        </SliderProvider>
      </div>
      {props.description && (
        <p class="text-slate-600 text-base text-balance text-right mt-1 italic">
          {props.description}
        </p>
      )}
    </div>
  );
}
