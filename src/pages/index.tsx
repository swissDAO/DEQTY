// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectButtonStyled } from '../components/ConnectButton'
import Avatars from '@/components/avatars/avatars';
import Progressbar from '@/components/progress-bar/progress-bar';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image'
import { useAccount } from 'wagmi';

const projects = [
  {
    id: 1,
    name: 'Daoify',
  },
  {
    id: 2,
    name: 'Daoify',
  },
];

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount()

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isConnected)
  }, [isConnected])

  return (
    <div className="h-full bg-background p-10">
      <Transition.Root show={isOpen} as={Fragment}>
        {/* modal is not closable (on purpose)*/}
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(true)}>
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
                    {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                </div> */}
                    <div className='flex justify-center items-center my-8'>
                      {/* <img src="/logo.svg" alt="" /> */}
                      <Image src="/logo.svg" alt="" height={150} width={150} />
                    </div>
                    {/* <h1 className="text-xl font-bold leading-none text-gray-900">DEQTY</h1> */}
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                        Welcome to DEQTY
                      </Dialog.Title>
                      <div className="mt-3">
                        <p className="text-md text-gray-500">
                          Connect your Wallet
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center my-8">
                    <ConnectButtonStyled onClose={() => setIsOpen(false)} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <h1 className="text-gray-900">Good day 0x0000! 👋</h1>

      <div className="mt-10 flex w-full items-center justify-start gap-10">
        {projects.map((project, i) => (
          <div key={i} className="mb-5 max-h-80 rounded-3xl bg-white p-8">
            <div className="text-xl font-bold leading-none text-gray-800">
              {project.name}
            </div>
            <div className="grid grid-cols-2 gap-x-20">
              <div className="">
                <div className="0 rounded-xl p-4 text-gray-800">
                  <div className="text-2xl font-bold leading-none">5,5</div>
                  <div className="mt-2">Tracked hours</div>
                </div>
              </div>

              <Avatars />

              <Progressbar />

              <button
                type="button"
                className="col-span-2 inline-flex items-center justify-center rounded-xl bg-yellow-100 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:text-green-500"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                Start tracking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
