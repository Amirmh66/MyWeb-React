import React, { createContext, useContext, ReactNode } from 'react'
import useDeviceType from '../Hooks/useDevice'

type DeviceType = "mobile" | "tablet" | "desktop";

const DeviceContext = createContext<DeviceType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const deviceType = useDeviceType();
    return (
        <DeviceContext.Provider value={deviceType}>
            {children}
        </DeviceContext.Provider>
    )
}


export const useDevice = (): DeviceType => {
    const context = useContext(DeviceContext);
    if (context === undefined) {
        throw new Error('use Device must be used within a deviceProvider')
    }
    return context
}