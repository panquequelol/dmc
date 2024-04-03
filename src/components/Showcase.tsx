import { For } from "solid-js";
import { Slider, SliderButton, SliderProvider } from "solid-slider";
import "solid-slider/slider.css";
import ArrowLeftMini from "./icons/ArrowLeftMini";
import ArrowRightMini from "./icons/ArrowRightMini";
//@ts-ignore
import { autoplay } from "solid-slider/plugins/autoplay";
import { cn } from "../lib";

type Props = {
  images: { src: string; alt: string }[];
  description?: string;
  className?: string;
};

export default function Showcase(props: Props) {
  return (
    <div class="order-2">
      <div class="bg-zinc-700">
        <SliderProvider>
          <Slider options={{ loop: true }} plugins={[autoplay(3000, {})]}>
            <For each={props.images}>
              {(image) => (
                <img
                  class={cn("object-cover max-h-96", props.className)}
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
