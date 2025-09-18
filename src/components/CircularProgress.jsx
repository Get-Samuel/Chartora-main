import { useUploadStore } from "../utils/globalFunctions";

function CircularProgress({ size = 100, stroke = 10, progress = 0, color = 'text-blue-500' }) {
  const file = useUploadStore((state) => state.file);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  let fileType = '';

  if (file && file.type === "text/csv") {
          fileType = 'csv';
      } else if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
           fileType = 'xlsx';
      } else if (file && file.type === 'application/pdf') {
           fileType = 'pdf';
      }

  return (
    <div className="flex md:flex-row flex-col-reverse gap-[4vw] h-full w-full justify-center items-center">
    <ol className="list-disc text-hue">
        <li>File Name: {file.name}</li>
        <li>File Size: {file.size}KB</li>
        <li>File Type: {fileType}</li>
        <li className="animate-pulse mt-5">Uploading</li>
    </ol>

    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className={`transition-all duration-300 ${color}`}
        />
      </svg>
      <span className="absolute text-4xl font-semibold text-hue">
        {Math.round(progress)}%
      </span>
    </div>

    </div>
  );
}

export default CircularProgress;
