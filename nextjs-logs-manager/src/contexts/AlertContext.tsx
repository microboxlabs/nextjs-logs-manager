"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import AlertMessage from "../components/AlertMessage";

type AlertType = "success" | "error" | "info";

interface Alert {
    id: number;
    type: AlertType;
    message: string;
}

interface AlertContextType {
    showAlert: (type: AlertType, message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = (type: AlertType, message: string, duration = 5000) => {
        const newAlert: Alert = { id: Date.now(), type, message };
        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        setTimeout(() => {
            setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== newAlert.id));
        }, duration);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {/* Contenedor en la esquina superior derecha */}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 w-96">
                {alerts.map((alert) => (
                    <div key={alert.id}>
                        <AlertMessage type={alert.type} message={alert.message} />
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};
