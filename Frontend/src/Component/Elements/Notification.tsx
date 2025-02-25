import { CheckBadgeIcon } from "@heroicons/react/20/solid";

type Notification = {
  title: string;
  explanations?: string;
  show: boolean;
}

export default function Notification({ title, explanations, show }: Notification) {
  if (!show) return null
  return (
    <>
      <div className={`p-2 w-3/12 rounded-lg border border-gray-200 dark:border-gray-800 bg-white drop-shadow-xl
       dark:bg-gray-950 fixed top-16 z-50 right-3 overflow-hidden transition-opacity duration-1000`}>
        <div className="flex justify-between">
          <CheckBadgeIcon className="w-5 text-green-600 pb-6" />
          <div className="flex flex-col  text-start gap-1">
            <p className="font-semibold">{title}</p>
            <p className="font-medium text-sm text-slate-400">{explanations}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1.5 dark:bg-white/50 bg-sky-400/60 w-full origin-left animate-progress rounded-br-lg rounded-tr-lg"></div>
      </div>
    </>
  );
}