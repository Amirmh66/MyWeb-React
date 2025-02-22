import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    icon: React.JSX.Element;
}

function Modal({ isOpen, onClose, title, children, icon }: ModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className={"fixed inset-0 z-50 overflow-y-auto "} onClose={onClose}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom="opacity-0"
                        enterTo='opacity-100'
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom="opacity-0 scale-95"
                        enterTo='opacity-100 scale-100'
                        leave="ease-in duration-200 "
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md my-8 overflow-hidden p-10    
                            align-middle transition-all transform shadow-xl rounded-2xl bg-white
                             dark:bg-gray-900 flex-col justify-center">

                            <div className="flex flex-col justify-center items-center gap-1">
                                {icon}
                                <Dialog.Title as="h3" className="text-black dark:text-gray-300 break-before-auto font-semibold">
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal


// How to use ↓ ↓ ↓
// <Modal title="~" icon={<icon className="~" />} isOpen={~} onClose={~}>
//    children ~~~ 
// </Modal>