"use client";

import React from "react";
import { Spinner } from "flowbite-react";

interface LoaderProps {
    size?: "small" | "medium" | "large";
    colorStyle?: "primary" | "secondary" | "tertiary";
    overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
    size = "medium",
    colorStyle = "primary",
    overlay = false,
}) => {
    const sizeClasses = {
        small: "w-6 h-6",
        medium: "w-12 h-12",
        large: "w-20 h-20",
    };

    const colorClasses = {
        primary: "text-indigo-500",
        secondary: "text-gray-500",
        tertiary: "text-green-500",
    };

    return overlay ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <Spinner className={`${sizeClasses[size]} ${colorClasses[colorStyle]} relative`} />
        </div>
    ) : (
        <div className="flex h-screen items-center justify-center">
            <Spinner className={`${sizeClasses[size]} ${colorClasses[colorStyle]}`} />
        </div>
    );
};

export default Loader;
