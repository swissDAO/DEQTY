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

const employeeData = [
  {
    id: 1,
    name: 'Esther Howard',
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
    imgId: 0,
  },

  {
    id: 2,
    name: 'Eleanor Pena',
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
  },

  {
    id: 3,
    name: 'Robert Fox',
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    tasksCompleted: 1,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
      });
    }
  }, [pieChartRef])

  return (
    <div className="h-screen overflow-auto overflow-x-hidden bg-background p-10">
      {openContributionDialog && <ContributionDialog onClose={() => setOpenContributionDialog(false)} />}
      {openSettingsDialog && <SettingsDialog onClose={() => setOpenSettingsDialog(false)} />}

      <div className='h-full rounded border border-transparent bg-white p-5'>
        <h1>Project: </h1>
        <div className="flex h-full w-full flex-grow flex-wrap content-start">
          <div className="w-full p-2 lg:w-1/2">
            <div className="bg-card h-60 rounded-lg sm:h-80 border">
              {/* <Graph /> */}
              <canvas ref={barChartRef}></canvas>
            </div>
          </div>

          <div className="w-full p-2 lg:w-1/2">
            <div className="bg-card h-60 rounded-lg sm:h-80 border">
              {/* <Graph /> */}
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
              tasksCompleted,
              imgId,
            }) => (
              <NameCard
                key={id}
                id={id}
                name={name}
                position={position}
                transactionAmount={transactions}
                rise={rise}
                tasksCompleted={tasksCompleted}
                imgId={imgId}
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
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-gray-900">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Commit
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
            >
              Duration
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
            >
              Deployed at
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
                  <div className="font-mono text-sm leading-6 text-gray-400">
                    {item.commit}
                  </div>
                  <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20">
                    {item.branch}
                  </span>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <time
                    className="text-gray-400 sm:hidden"
                    dateTime={item.dateTime}
                  >
                    {item.date}
                  </time>
                  <div
                    className={classNames(
                      statuses[item.status],
                      'flex-none rounded-full p-1'
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-gray-900 sm:block">
                    {item.status}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                {item.duration}
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
  tasksCompleted,
  imgId,
}: any) {
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="bg-card flex flex-col justify-between rounded-lg border p-3">
        <div className="">
          <div className="flex items-center">
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

          <div className="mt-2 text-sm text-gray-900">{`${tasksCompleted} from 5 tasks completed`}</div>
          <ContributionBar transactionAmount={transactionAmount} tasksCompleted={tasksCompleted} />

          <div className="mt-2 text-sm text-gray-900">{`${tasksCompleted} from 5 tasks completed`}</div>
          <ContributionBar transactionAmount={transactionAmount} tasksCompleted={tasksCompleted} />

          <div className="mt-2 text-sm text-gray-900">{`${tasksCompleted} from 5 tasks completed`}</div>
          <ContributionBar transactionAmount={transactionAmount} tasksCompleted={tasksCompleted} />
        </div>

        <div className='flex w-full justify-between'>
          <IconButton icon="res-react-dash-sidebar-open" />
          <IconButton icon="res-react-dash-sidebar-open" />
        </div>
      </div>
    </div>
  );
}

function ContributionBar({ transactionAmount, tasksCompleted }: { transactionAmount: number, tasksCompleted: number }) {
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
          (i: any) => i * (tasksCompleted / 5) * 200
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
          <stop offset="1" stopColor="#3912D2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Graph() {
  const CustomTooltip = () => (
    <div className="tooltip-head overflow-hidden rounded-xl">
      <div className="flex items-center justify-between p-2">
        <div className="text-gray-900">Revenue</div>
        <Icon path="res-react-dash-options" className="h-2 w-2" />
      </div>
      <div className="tooltip-body p-3 text-center">
        <div className="font-bold text-gray-900">$1300.50</div>
        <div className="text-gray-900">Revenue from 230 sales</div>
      </div>
    </div>
  );
  return (
    <div className="flex h-full flex-col p-4">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-gray-900">Your Work Summary</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="h-4 w-4" />
          <div className="ml-2">Last 9 Months</div>
          <div className="icon-background ml-6 flex h-5 w-5 items-center justify-center rounded-full">
            ?
          </div>
        </div>
        <div className="ml-5 font-bold">Nov - July</div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#242424"
              strokeWidth="3"
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
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
