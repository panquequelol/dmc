import { Dialog } from "@base-ui-components/react/dialog";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { phoneNumber, solar_equipment } from "../../vars";
import { X } from "lucide-react";

type Props = {
  className: string;
};

export default function EquipmentGrid(props: Props) {
  const [active, setActive] = useState<(typeof solar_equipment)[number] | null>(
    null
  );
  return (
    <>
      <ul className={props.className}>
        {solar_equipment.map((equipment) => (
          <motion.button
            key={`container-${equipment?.name}`}
            layoutId={`container-${equipment?.name}`}
            onClick={() => setActive(equipment)}
            className={"min-w-64 min-h-64 relative"}
          >
            <motion.img
              className="shadow-md rounded-xl object-contain"
              src={equipment.src}
              layoutId={`image-${equipment.name}`}
              alt={equipment.name}
            />
            <motion.button
              layoutId={`button-${equipment?.name}`}
              className="z-1 absolute bottom-2 right-2 bg-blue-600 flex text-white rounded-lg px-3 py-2 text-sm items-center gap-2 font-semibold"
            >
              Ver
            </motion.button>
          </motion.button>
        ))}
      </ul>
      <AnimatePresence>
        {active ? (
          <Dialog.Root
            open={!!active}
            onOpenChange={(open) => setActive(open === false ? null : active)}
          >
            <Dialog.Portal keepMounted>
              {active ? (
                <Dialog.Backdrop
                  render={
                    <motion.div
                      key="backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  }
                  className="bg-slate-400/80 backdrop-blur-sm fixed inset-0"
                />
              ) : null}
              <Dialog.Popup
                render={<motion.div layoutId={`container-${active.name}`} />}
                className={
                  "fixed inset-0 max-w-lg bg-white h-fit shadow-md md:rounded-xl mx-auto my-auto"
                }
              >
                <div>
                  <motion.button
                    layoutId={`button-${active?.name}`}
                    aria-label="cerrar"
                    onClick={() => setActive(null)}
                    className={
                      "rounded-full w-8 h-8 top-2 absolute z-1 right-2 flex items-center justify-center bg-slate-100 text-slate-700"
                    }
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                  <motion.img
                    layoutId={`image-${active.name}`}
                    className="md:rounded-t-xl"
                    src={active.src}
                    alt={active.name}
                  />
                  <div className="px-4 pt-4">
                    <Dialog.Description className={"text-sm text-slate-500"}>
                      Equipo fotovoltaico
                    </Dialog.Description>
                    <Dialog.Title>{active.name}</Dialog.Title>
                  </div>
                  <div className="p-4">
                    <a
                      href={encodeURI(
                        `https://wa.me/${phoneNumber}?text=Hola estoy interesado en comprar ${active.name}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-3 w-full rounded-xl block text-center"
                    >
                      ¡Me interesa!
                    </a>
                  </div>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        ) : null}
      </AnimatePresence>
    </>
  );
}
