'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";
import {logout} from "@/services/route.services";

export const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogoutAction = async () => {

        setLoading(true);
        try {
            const response = await logout();
            if (response === 200) {
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleLogoutAction} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
};
