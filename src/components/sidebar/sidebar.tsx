import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex min-h-screen'>
      <Transition.Root show={isOpen} as={Fragment}>
        {/* modal is not closable (on purpose)*/}
        <Dialog as="div" className="relative z-10" open={true} onClose={() => setIsOpen(true)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                                    Verification Email Sent
                                    </Dialog.Title>
                                    <div className="mt-3">
                                        <p className="text-md text-gray-500">
                                            Check your Inbox for the access link
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <Link href={"/"} onClick={()=>{setIsOpen(false)}}>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                                    >
                                        Try again
                                    </button>
                                </Link>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
      </Transition.Root>

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
                  Projects
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
                  Create Project
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
