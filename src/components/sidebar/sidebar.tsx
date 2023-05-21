import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ConnectButtonStyled } from '../ConnectButton';
import CreateProjectForm from '../forms/create-project';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <CreateProjectForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></CreateProjectForm>
      <div className="flex h-full flex-col justify-between border-r">
        <div className="flex-grow">
          <div
            className="flex items-center justify-start gap-5 border-b px-4 py-6 hover:cursor-pointer"
            onClick={() => router.replace('/')}
          >
            <Image src="/logo.svg" alt="" height={40} width={40} />
            <h1 className="text-xl font-bold leading-none text-gray-900">
              DEQTY
            </h1>
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
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
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
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M4.66667 9.33333H10.6667V15.3333C10.6667 15.8242 11.5091 16 12.0002 16C12.4911 16 13.3333 15.8244 13.3333 15.3333V9.33333H19.3333C19.8242 9.33333 20 8.49108 20 8C20 7.50914 19.8244 6.66667 19.3333 6.66667H13.3333V0.666667C13.3333 0.175811 12.4911 0 12 0C11.5091 0 10.6667 0.175588 10.6667 0.666667V6.66667H4.66667C4.17581 6.66667 4 7.50872 4 7.99979C4 8.49065 4.17559 9.33333 4.66667 9.33333Z"
                        fill="black"
                      />
                      <path
                        d="M11.1667 9.33333V8.83333H10.6667H4.70267C4.68167 8.80829 4.64927 8.7575 4.61547 8.67017C4.53776 8.46936 4.5 8.20007 4.5 7.99979C4.5 7.79946 4.5378 7.53032 4.61551 7.32966C4.6493 7.24242 4.68168 7.19168 4.70267 7.16667H10.6667H11.1667V6.66667V0.702639C11.1917 0.681642 11.2425 0.649257 11.3298 0.615463C11.5305 0.537756 11.7997 0.5 12 0.5C12.2003 0.5 12.4695 0.537797 12.6703 0.615524C12.7575 0.649319 12.8083 0.681703 12.8333 0.702704V6.66667V7.16667H13.3333H19.2974C19.3184 7.19169 19.3507 7.24246 19.3845 7.32976C19.4622 7.5305 19.5 7.79972 19.5 8C19.5 8.20034 19.4622 8.46955 19.3845 8.67027C19.3507 8.75754 19.3183 8.8083 19.2973 8.83333H13.3333H12.8333V9.33333V15.2974C12.8083 15.3184 12.7576 15.3508 12.6703 15.3845C12.4696 15.4622 12.2005 15.5 12.0002 15.5C11.7999 15.5 11.5306 15.4622 11.3298 15.3845C11.2425 15.3507 11.1917 15.3183 11.1667 15.2973V9.33333Z"
                        stroke="black"
                      />
                    </g>
                  </svg>
                  Create Project
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4">
          <ConnectButtonStyled onClose={() => {}} />
        </div>
      </div>
    </div>
  );
}
