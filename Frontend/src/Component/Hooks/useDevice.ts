import { useState, useEffect } from "react";

const mediaQueries = {
  xs: 480, // Small Mobile
  sm: 768, // Mobile and tablet
  md: 1024, // tablet and Small Laptop
  lg: 1280, // Mid-range Laptop
  xl: 1440, // Large Labtop
  xxl: 1920, // Large Manitor
};

type DeviceType = "mobile" | "tablet" | "desktop";

const getDeviceType = (width: number): DeviceType => {
  if (width < mediaQueries.sm) {
    return "mobile";
  } else if (width >= mediaQueries.sm && width < mediaQueries.md) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop"); //Default of initial guess

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    // Initial Check
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};

export default useDeviceType;
