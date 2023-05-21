import { animated, useSpring } from '@react-spring/web';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Chart from 'chart.js/auto';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import AddContribution from '@/components/forms/add-contribution';

const map = (
  value: number,
  sMin: number,
  sMax: number,
  dMin: number,
  dMax: number
) => {
  return dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
};
const pi = Math.PI;
const tau = 2 * pi;

const totalSlices = 6500;
const totalEtherSpent = 1.74;

const employeeData = [
  {
    id: 1,
    name: 'Esther Howard',
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    slices: 2000,
    etherSpent: 0.01,
    imgId: 0,
  },

  {
    id: 2,
    name: 'Eleanor Pena',
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    slices: 3000,
    etherSpent: 0.42,
    imgId: 2,
  },

  {
    id: 3,
    name: 'Robert Fox',
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    slices: 1500,
    etherSpent: 1.31,
    imgId: 3,
  },
];

const Countrydata = [
  { name: 'USA', rise: true, value: 21942.83, id: 1 },
  { name: 'Ireland', rise: false, value: 19710.0, id: 2 },
  { name: 'Ukraine', rise: false, value: 12320.3, id: 3 },
  { name: 'Sweden', rise: true, value: 9725.0, id: 4 },
];

const segmentationData = [
  { c1: 'Not Specified', c2: '800', c3: '#363636', color: '#535353' },
  { c1: 'Male', c2: '441', c3: '#818bb1', color: '#595f77' },
  { c1: 'Female', c2: '233', c3: '#2c365d', color: '#232942' },
  { c1: 'Other', c2: '126', c3: '#334ed8', color: '#2c3051' },
];

const graphData = [
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
].map(i => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
];
const statuses = {
  Completed: 'text-green-400 bg-green-400/10',
  Error: 'text-rose-400 bg-rose-400/10',
};
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '2d89f0c8',
    branch: 'main',
    status: 'Completed',
    duration: '25s',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
];

function ContributionDialog({ onClose }: { onClose: () => void }) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={true} onClose={onClose}>
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
                  <Link href={"/"} onClick={onClose}>
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
    </Transition.Root >
  )
}

function SettingsDialog({ onClose }: { onClose: () => void }) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" open={true} onClose={onClose}>
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
                  <Link href={"/"} onClick={onClose}>
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
    </Transition.Root >
  )
}

export default function Project() {
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);

  const [openContributionDialog, setOpenContributionDialog] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  useEffect(() => {
    const ctxPie = pieChartRef.current?.getContext("2d");
    const ctxBar = barChartRef.current?.getContext("2d");

    if (ctxPie) {
      new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday '],
          datasets: [
            {
              label: 'Traffic',
              data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
              backgroundColor: [
                'rgba(63, 81, 181, 0.5)',
                'rgba(77, 182, 172, 0.5)',
                'rgba(66, 133, 244, 0.5)',
                'rgba(156, 39, 176, 0.5)',
                'rgba(233, 30, 99, 0.5)',
                'rgba(66, 73, 244, 0.4)',
                'rgba(66, 133, 244, 0.2)',
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    if (ctxBar) {
      new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday '],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }, [pieChartRef])

  return (
    <div className="h-screen overflow-auto overflow-x-hidden bg-background p-10">
        
      {openContributionDialog && <AddContribution isOpen={openContributionDialog} onClose={() => setOpenContributionDialog(false)} />}
      {openSettingsDialog && <SettingsDialog onClose={() => setOpenSettingsDialog(false)} />}

      <div className='h-full rounded border border-transparent bg-white p-5'>
        <h1 className='text-gray-900'>Project: </h1>
        <div className="flex h-full w-full flex-grow flex-wrap content-start">
          <div className="w-full p-2 lg:w-1/2">
            <div className="flex justify-center items-center bg-card h-60 rounded-lg sm:h-80 border">
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>

          <div className="w-full p-2 lg:w-1/2">
            <div className="flex justify-center items-center bg-card h-60 rounded-lg sm:h-80 border">
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>

          {employeeData.map(
            ({
              id,
              name,
              position,
              transactions,
              rise,
              etherSpent,
              slices,
              imgId,
            }) => (
              <NameCard
                key={id}
                id={id}
                name={name}
                position={position}
                transactionAmount={transactions}
                rise={rise}
                etherSpent={etherSpent}
                slices={slices}
                imgId={imgId}
                onContribution={() => setOpenContributionDialog(true)}
                onSettings={() => setOpenSettingsDialog(true)}
              />
            )
          )}

          <ActivityList />
        </div>
      </div>
    </div>
  );
}

function ActivityList() {
  return (
    <div className="w-full border-t border-white/10 pt-11">
      <h2 className="px-2 text-base font-semibold leading-7 text-gray-900">
        Latest activity
      </h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-4/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-gray-900">
          <tr>
            <th
              scope="col"
              className="py-2 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th
              scope="col"
              className="py-2 pr-8 font-semibold"
            >
              Project
            </th>
            <th
              scope="col"
              className="py-2 pr-8 font-semibold"
            >
              Contribution
            </th>
            <th
              scope="col"
              className="py-2 pr-8 font-semibold "
            >
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {activityItems.map(item => (
            <tr key={item.commit}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img
                    src={item.user.imageUrl}
                    alt=""
                    className="h-8 w-8 rounded-full bg-gray-800"
                  />
                  <div className="truncate text-sm font-medium leading-6 text-gray-900">
                    {item.user.name}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <span className='py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400'>
                    {item.branch}
                  </span>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <span className='hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8'>
                    Work
                  </span>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                <time dateTime={item.dateTime}>{item.date}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NameCard({
  name,
  position,
  transactionAmount,
  rise,
  slices,
  etherSpent,
  imgId,
  onContribution,
  onSettings,
}: any) {

    const percentageSlices = Math.round((slices / totalSlices) * 100);
    const percentageSpent = Math.round((etherSpent / totalEtherSpent) * 100);

    return (
        <div className="w-full p-2 lg:w-1/3">
        <div className="bg-card flex flex-col justify-between rounded-lg border p-3">
            <div className="">
            <div className="flex items-center mb-8">
                <Image path={`mock_faces_${imgId}`} className="h-10 w-10" />
                <div className="ml-2">
                <div className="flex items-center">
                    <div className="mr-2 font-bold text-gray-900">{name}</div>
                    <Icon path="res-react-dash-tick" />
                </div>
                <div className="text-sm text-gray-900">{position}</div>
                <div className="text-sm text-gray-900">Last contribution { }</div>
                </div>
            </div>

            <div className="mt-2 text-sm text-gray-900">{`Slices: ${slices} (${percentageSlices}%)`}</div>
            <ContributionBar transactionAmount={transactionAmount} slices={slices} total={totalSlices}/>

            <div className="mt-2 text-sm text-gray-900">{`ETH spent: ${etherSpent} (${percentageSpent}%)`}</div>
            <ContributionBar transactionAmount={transactionAmount} slices={etherSpent} total={totalEtherSpent}/>

            
            </div>

            <div className='mt-16 flex w-full justify-between'>
            <button type="button" onClick={onContribution}>
                <img
                src="/create.svg"
                alt=""
                />
            </button>

            {/* <button type="button" onClick={onSettings}>
                <img
                src="/edit.svg"
                alt=""
                />
            </button> */}
            </div>
        </div>
        </div>
    );
}

function ContributionBar({ transactionAmount, slices, total }: { transactionAmount: number, slices: number, total: number }) {
  const { transactions, barPlayhead } = useSpring({
    transactions: transactionAmount,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });

  return (
    <svg
      className="mt-3 w-44"
      height="6"
      viewBox="0 0 200 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="6" rx="3" fill="#2D2D2D" />
      <animated.rect
        width={barPlayhead.interpolate(
          (i: any) => i * (slices / total) * 200
        )}
        height="6"
        rx="3"
        fill="url(#paint0_linear)"
      />
      <rect x="38" width="2" height="6" fill="#171717" />
      <rect x="78" width="2" height="6" fill="#171717" />
      <rect x="118" width="2" height="6" fill="#171717" />
      <rect x="158" width="2" height="6" fill="#171717" />
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#8E76EF" />
          <stop offset="1" stopColor="#8E76EF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Icon({ path = 'options', className = 'w-4 h-4' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={className}
    />
  );
}

function IconButton({
  onClick = () => { },
  icon = 'options',
  className = 'w-4 h-4',
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="h-full w-full"
      />
    </button>
  );
}

function Image({ path = '1', className = 'w-4 h-4' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={`rounded-full ${className ?? ''}`}
    />
  );
}
