// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectButtonStyled } from '../components/ConnectButton'
import Avatars from '@/components/avatars/avatars';
import Progressbar from '@/components/progress-bar/progress-bar';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import Image from 'next/image'

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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-full bg-background p-10">
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
                              <ConnectButtonStyled />
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
    // <div className="ml-60 max-h-screen overflow-auto pt-16">
    //   <div className="px-6 py-8">
    //     <div className="mx-auto max-w-4xl">
    //       <div className="mb-5 rounded-3xl bg-white p-8">
    //         <h1 className="mb-10 text-3xl font-bold">
    //           Messaging ID framework development for the marketing branch
    //         </h1>
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-stretch">
    //             <div className="text-xs text-gray-400">
    //               Members
    //               <br />
    //               connected
    //             </div>
    //             <div className="h-100 mx-4 border-l"></div>
    //             <div className="flex flex-nowrap -space-x-3">
    //               <div className="h-9 w-9">
    //                 <img
    //                   className="h-full w-full rounded-full object-cover"
    //                   src="https://ui-avatars.com/api/?background=random"
    //                 />
    //               </div>
    //               <div className="h-9 w-9">
    //                 <img
    //                   className="h-full w-full rounded-full object-cover"
    //                   src="https://ui-avatars.com/api/?background=random"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-center gap-x-2">
    //             <button
    //               type="button"
    //               className="inline-flex h-9 items-center justify-center rounded-xl border px-3 text-gray-800 transition hover:border-gray-400 hover:text-gray-900"
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="1em"
    //                 height="1em"
    //                 fill="currentColor"
    //                 className="bi bi-chat-fill"
    //                 viewBox="0 0 16 16"
    //               >
    //                 <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
    //               </svg>
    //             </button>
    //             <button
    //               type="button"
    //               className="inline-flex h-9 items-center justify-center rounded-xl bg-gray-900 px-5 text-sm font-semibold text-gray-300 transition hover:text-white"
    //             >
    //               Open
    //             </button>
    //           </div>
    //         </div>

    //         <hr className="my-10" />

    //         <div className="grid grid-cols-2 gap-x-20">
    //           <div>
    //             <h2 className="mb-4 text-2xl font-bold">Stats</h2>

    //             <div className="grid grid-cols-2 gap-4">
    //               <div className="col-span-2">
    //                 <div className="rounded-xl bg-green-100 p-4">
    //                   <div className="text-xl font-bold leading-none text-gray-800">
    //                     Good day, <br />
    //                     Kristin
    //                   </div>
    //                   <div className="mt-5">
    //                     <button
    //                       type="button"
    //                       className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-800 transition hover:text-green-500"
    //                     >
    //                       Start tracking
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="rounded-xl bg-yellow-100 p-4 text-gray-800">
    //                 <div className="text-2xl font-bold leading-none">20</div>
    //                 <div className="mt-2">Tasks finished</div>
    //               </div>
    //               <div className="rounded-xl bg-yellow-100 p-4 text-gray-800">
    //                 <div className="text-2xl font-bold leading-none">5,5</div>
    //                 <div className="mt-2">Tracked hours</div>
    //               </div>
    //               <div className="col-span-2">
    //                 <div className="rounded-xl bg-purple-100 p-4 text-gray-800">
    //                   <div className="text-xl font-bold leading-none">
    //                     Your daily plan
    //                   </div>
    //                   <div className="mt-2">5 of 8 completed</div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <h2 className="mb-4 text-2xl font-bold">Your tasks today</h2>

    //             <div className="space-y-4">
    //               <div className="space-y-2 rounded-xl border bg-white p-4 text-gray-800">
    //                 <div className="flex justify-between">
    //                   <div className="text-xs text-gray-400">Number 10</div>
    //                   <div className="text-xs text-gray-400">4h</div>
    //                 </div>
    //                 <a
    //                   href="javascript:void(0)"
    //                   className="font-bold hover:text-yellow-800 hover:underline"
    //                 >
    //                   Blog and social posts
    //                 </a>
    //                 <div className="text-sm text-gray-600">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="1em"
    //                     height="1em"
    //                     fill="currentColor"
    //                     className="mr-1 inline align-middle text-gray-800"
    //                     viewBox="0 0 16 16"
    //                   >
    //                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    //                   </svg>
    //                   Deadline is today
    //                 </div>
    //               </div>
    //               <div className="space-y-2 rounded-xl border bg-white p-4 text-gray-800">
    //                 <div className="flex justify-between">
    //                   <div className="text-xs text-gray-400">Grace Aroma</div>
    //                   <div className="text-xs text-gray-400">7d</div>
    //                 </div>
    //                 <a
    //                   href="javascript:void(0)"
    //                   className="font-bold hover:text-yellow-800 hover:underline"
    //                 >
    //                   New campaign review
    //                 </a>
    //                 <div className="text-sm text-gray-600">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     width="1em"
    //                     height="1em"
    //                     fill="currentColor"
    //                     className="mr-1 inline align-middle text-gray-800"
    //                     viewBox="0 0 16 16"
    //                   >
    //                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    //                   </svg>
    //                   New feedback
    //                 </div>
    //               </div>
    //               <div className="space-y-2 rounded-xl border bg-white p-4 text-gray-800">
    //                 <div className="flex justify-between">
    //                   <div className="text-xs text-gray-400">Petz App</div>
    //                   <div className="text-xs text-gray-400">2h</div>
    //                 </div>
    //                 <a
    //                   href="javascript:void(0)"
    //                   className="font-bold hover:text-yellow-800 hover:underline"
    //                 >
    //                   Cross-platform and browser QA
    //                 </a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
