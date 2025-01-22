import { useEffect, useState } from "react";
import { wrap } from "@popmotion/popcorn";
import { AnimatePresence, motion, type PanInfo } from "motion/react";

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  animate: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const transition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export default function WorkShowcase(props: {
  images: { src: string; alt?: string }[];
  description?: string;
}) {
  const [[count, direction], setControl] = useState([0, 0]);
  // if count is over length, it wraps back around
  const active = wrap(0, props.images.length, count);

  function swipe(direction: number) {
    setControl(([currentCount]) => [currentCount + direction, direction]);
  }

  function drag(info: PanInfo) {
    const distance = info.offset.x;
    const threshold = 50;
    if (distance > threshold) {
      swipe(-1);
    } else if (distance < -threshold) {
      swipe(1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      swipe(1);
    }, 2_500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-0.5 overflow-hidden">
      <div className="relative aspect-square rounded-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            key={count}
            style={{
              backgroundImage: `url(${props.images[active].src})`,
            }}
            // onDragEnd={(_, info) => drag(info)}
            className="absolute shadow top-0 left-0 w-full h-full rounded-xl bg-cover bg-center bg-no-repeat will-change-transform hover:cursor-grab actve:cursor-grabbing"
          />
        </AnimatePresence>
      </div>
      {props.description && <p className="text-sm pt-2">{props.description}</p>}
    </div>
  );
}
