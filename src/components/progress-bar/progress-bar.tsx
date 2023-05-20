export default function Progressbar() {
  return (
    <svg
      className="mt-3 w-44"
      height="6"
      viewBox="0 0 200 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="6" rx="3" fill="#2D2D2D"></rect>
      <rect width="120" height="6" rx="3" fill="url(#paint0_linear)"></rect>
      <rect x="38" width="2" height="6" fill="#171717"></rect>
      <rect x="78" width="2" height="6" fill="#171717"></rect>
      <rect x="118" width="2" height="6" fill="#171717"></rect>
      <rect x="158" width="2" height="6" fill="#171717"></rect>

      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
          <stop stop-color="#8E76EF"></stop>
          <stop offset="1" stop-color="#3912D2"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
