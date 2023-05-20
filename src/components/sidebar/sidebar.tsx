import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="absolute topinset-0 z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded bg-white">
              <Dialog.Title>Deactivate account</Dialog.Title>
              <Dialog.Description>
                This will permanently deactivate your account
              </Dialog.Description>

              <p>
                Are you sure you want to deactivate your account? All of your data
                will be permanently removed. This action cannot be undone.
              </p>

              <button onClick={() => setIsOpen(false)}>Deactivate</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <div className="flex h-full flex-col justify-between border-r">
        <div className="flex-grow">
          <div
            className="flex items-center justify-start gap-5 border-b px-4 py-6 hover:cursor-pointer"
            onClick={() => router.replace('/')}
          >
            <Image src="/logo.svg" alt="" height={40} width={40} />
            <h1 className="text-xl font-bold leading-none text-gray-900">DEQTY</h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <a
                  href="javascript:void(0)"
                  className="flex items-center rounded-xl bg-yellow-200 px-4 py-3 text-sm font-bold text-yellow-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="mr-4 text-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  Plan
                </a>
              </li>
              <li>
                <button
                  className="flex w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-gray-900 hover:bg-yellow-50"
                  onClick={() => setIsOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="mr-4 text-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                  </svg>
                  Projects
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4">
          <ConnectButton />
        </div>
      </div>
    </>
  );
}
