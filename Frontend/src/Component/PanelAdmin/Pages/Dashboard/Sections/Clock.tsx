import { ClockIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="flex items-center justify-center flex-1 p-4 bg-white rounded-lg dark:bg-gray-900">
                <div className="flex items-center justify-between">
                    <div className="flex gap-5 my-auto">
                        <ClockIcon className="w-7" />
                        <span className="font-semibold">{time.toLocaleTimeString()}</span>
                        <div className="border"></div>
                        <span className="font-semibold">{time.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clock
