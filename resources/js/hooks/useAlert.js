import { useState } from "react";

export function useAlert() {
    const [isAlert, setIsAlert] = useState({
        errors: [],
        success: [],
    });

    const showError = (error) => {
        setIsAlert(() => ({
            errors: error,
        }));
    };

    const showSuccess = (message) => {
        setIsAlert(() => ({
            success: [message],
        }));
    };

    const clearAlert = () => {
        console.log("clearing alert");
        setIsAlert({
            errors: [],
            success: [],
        });
    };

    return {
        clearAlert,
        isAlert,
        showError,
        showSuccess,
    };
}
