import { createEffect, createSignal, onMount } from "solid-js";
import EyeMini from "./icons/EyeMini";
import ShoppingBagMini from "./icons/ShoppingBagMini";
import { cn } from "../lib";
import CloseMini from "./icons/CloseMini";
import { phoneNumber } from "../vars";

type Props = {
  src: string;
  product: string;
  className?: string;
};

export default function EquipmentCard(props: Props) {
  const [isOpen, setOpen] = createSignal(false);

  createEffect(() => {
    if (isOpen() === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  onMount(() => {
    function closeDialogOnEscape(key: KeyboardEvent) {
      if (key.code === "Escape" && isOpen() === true) setOpen(false);
    }
    document.addEventListener("keydown", closeDialogOnEscape);
  });

  return (
    <>
      <div
        class={cn(
          "p-2 space-y-2 shrink-0 bg-white border rounded-lg",
          props.className
        )}
      >
        <img src={props.src} alt={props.product} />
        <div class="grid grid-cols-2 gap-2">
          <button
            class="bg-slate-200 border border-slate-300 font-sans flex gap-1 items-center justify-center text-black rounded-md hover:opacity-75 duration-200 text-center text-sm p-1"
            onClick={() => setOpen(true)}
          >
            <EyeMini />
            Ver
          </button>
          <BuyButton product={props.product} />
        </div>
      </div>
      <div
        class={cn("fixed inset-0 z-50 w-screen h-screen bg-black/50", {
          hidden: !isOpen(),
        })}
        onClick={() => setOpen(false)}
      />
      <dialog
        class="fixed inset-0 z-50 p-4 bg-white sm:rounded-md shadow"
        open={isOpen()}
      >
        <div class="relative">
          <p class="text-center font-sans font-semibold text-slate-900 mb-4">
            {props.product}
          </p>
          <button
            onClick={() => setOpen(false)}
            class="absolute top-0 right-0 bg-slate-200 p-1 text-black rounded-full border border-slate-300"
          >
            <CloseMini />
            <span class="sr-only">Cerrar</span>
          </button>
        </div>
        <img
          class="h-full sm:h-[70vh] w-full"
          src={props.src}
          alt={props.product}
        />
        <div class="grid grid-cols-2 gap-2 mt-2">
          <button
            class="bg-slate-200 font-sans flex gap-1 items-center justify-center text-black rounded-md hover:opacity-75 duration-200 text-center text-sm p-1 border border-slate-300"
            onClick={() => setOpen(false)}
          >
            Cerrar
          </button>{" "}
          <BuyButton product={props.product} />
        </div>
      </dialog>
    </>
  );
}

function BuyButton(props: { product: string }) {
  return (
    <a
      class="bg-blue-600 border border-blue-800 font-sans flex gap-1 items-center justify-center text-white rounded-md hover:opacity-75 duration-200 text-center text-sm p-1"
      href={encodeURI(
        `https://wa.me/${phoneNumber}?text=Hola estoy interesado en comprar ${props.product}`
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ShoppingBagMini />
      Comprar
    </a>
  );
}
