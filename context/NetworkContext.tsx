import NetInfo from "@react-native-community/netinfo";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface NetworkContextType {
    isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextType>({
    isConnected: true,
});

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? true);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);
