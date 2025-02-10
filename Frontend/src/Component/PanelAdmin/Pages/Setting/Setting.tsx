import {
    BellIcon, BuildingStorefrontIcon, CloudArrowDownIcon, PaintBrushIcon,
    PresentationChartLineIcon, ServerStackIcon, ShieldCheckIcon, TruckIcon
} from "@heroicons/react/20/solid";
import { Link, Outlet, useLocation } from "react-router-dom";
import './Setting.css';
interface ISettingItems {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    path: string;
}

const settingItems: ISettingItems[] = [
    { id: 1, title: "Store", description: "Logo,Site Name", icon: <BuildingStorefrontIcon />, path: "Store" },
    { id: 2, title: "SEO", description: "Describe Meta, Keywords", icon: <PresentationChartLineIcon />, path: "SEO" },
    { id: 3, title: "Security", description: "Two-factor authentication activition", icon: <ShieldCheckIcon />, path: "Security" },
    { id: 4, title: "Themes & Design", description: "Theme,Fonts,Background", icon: <PaintBrushIcon />, path: "Design" },
    { id: 5, title: "API ", description: "APIKeyes,Social Media", icon: <ServerStackIcon />, path: "API" },
    { id: 6, title: "Notification ", description: "EmailNotificate", icon: <BellIcon />, path: "Notification" },
    { id: 7, title: "Delivery", description: "Shipping & Delivery", icon: <TruckIcon />, path: "Delivery" },
    { id: 8, title: "BackUps", description: "Download files & Data", icon: <CloudArrowDownIcon />, path: "BackUps" },
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
                                <div key={i.id} className="Setting-box group">
                                    <p key={i.id} className="size-1/3 mb-3 text-sky-700 dark:text-sky-600 group-hover:rotate-12 transition-all duration-300">
                                        {i.icon}
                                    </p>
                                    <p className="font-bold text-lg text-sky-950 dark:text-sky-300">{i.title}</p>
                                    <p className="font-semibold text-sm text-sky-800 dark:text-sky-500 opacity-80">{i.description}</p>
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