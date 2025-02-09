import {
    BellIcon, BuildingStorefrontIcon, CloudArrowDownIcon, PaintBrushIcon,
    PresentationChartLineIcon, ServerStackIcon, ShieldCheckIcon, TruckIcon
} from "@heroicons/react/20/solid";
import { Link, Outlet, useLocation } from "react-router-dom";

interface ISettingItems {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    path: string;
}

const settingItems: ISettingItems[] = [
    { id: 1, title: "Store", description: "Logo,Site Name", icon: <BuildingStorefrontIcon className="size-1/3 text-sky-700" />, path: "Store" },
    { id: 2, title: "SEO", description: "Describe Meta, Keywords", icon: <PresentationChartLineIcon className="size-1/3 text-sky-700" />, path: "SEO" },
    { id: 3, title: "Security", description: "Two-factor authentication activition", icon: <ShieldCheckIcon className="size-1/3 text-sky-700" />, path: "Security" },
    { id: 4, title: "Themes & Design", description: "Theme,Fonts,Background", icon: <PaintBrushIcon className="size-1/3 text-sky-700" />, path: "Design" },
    { id: 5, title: "API ", description: "APIKeyes,Social Media", icon: <ServerStackIcon className="size-1/3 text-sky-700" />, path: "API" },
    { id: 6, title: "Notification ", description: "EmailNotificate", icon: <BellIcon className="size-1/3 text-sky-700" />, path: "Notification" },
    { id: 7, title: "Delivery", description: "Shipping & Delivery", icon: <TruckIcon className="size-1/3 text-sky-700" />, path: "Delivery" },
    { id: 8, title: "BackUps", description: "Download files & Data", icon: <CloudArrowDownIcon className="size-1/3 text-sky-700" />, path: "BackUps" },
]

const Setting = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname === "/PanelAdmin/Setting" ? (
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 w-5/6 mx-auto">
                        {settingItems.map((i) => (
                            <Link to={i.path}>
                                <div key={i.id} className="bg-slate-200 w-52 h-52 rounded-xl p-5 border-b-8 border-slate-400
                             flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow
                              duration-200">
                                    {i.icon}
                                    <p className="font-bold text-lg text-sky-950">{i.title}</p>
                                    <p className="font-semibold text-sm text-sky-800">{i.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    )
}

export default Setting