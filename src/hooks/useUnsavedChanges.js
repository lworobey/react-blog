import { useEffect } from 'react';

const useUnsavedChanges = (isDirty) => {
    useEffect(() => {
        const confirmLeave = (event) => {
            if (isDirty) {
                event.preventDefault(); // Prevent default behavior (show prompt)
                event.returnValue = ''; // For most modern browsers
            }
        };

        if (isDirty) {
            window.addEventListener('beforeunload', confirmLeave);
        } else {
            window.removeEventListener('beforeunload', confirmLeave);
        }
        return () => {
            window.removeEventListener('beforeunload', confirmLeave);
        };
    }, [isDirty]);
};

export default useUnsavedChanges;
