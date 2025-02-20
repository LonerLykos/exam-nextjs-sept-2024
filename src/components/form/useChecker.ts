import {useEffect, useState} from "react";

export const useChecker = (login: string, validation: string, newError: string) => {
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {

        if (login === 'true') {
            setError(false);
            setMessage('');
        } else if (login === 'false') {
            setError(true);
            setMessage('Incorrect login or password');
        } else if (validation === 'error') {
            setError(true);
            setMessage('You need to choose valid login and password');
        } else if (newError === 'error'){
            setError(true);
            setMessage('Your data has been rejected. Log in again!');
        }
    }, [login, validation,newError]);

    return {error, message}
};

