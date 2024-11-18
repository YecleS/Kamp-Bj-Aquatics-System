import React from 'react';
import { toast } from 'sonner'

export const ToastSuccess = (message) => {
    toast.success(message, {
        duration: 1000,

        style: {
            fontSize: '0.95rem', // Adjust the font size here
        },
    });
};

export const ToastError = (message) => {
    toast.error(message, {
        duration: 1000,

        style: {
            fontSize: '0.95rem', // Adjust the font size here
        },
    });
};
