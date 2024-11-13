import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';

const ImpersonateButton = ({ userId }: { userId: number }) => {
    const handleImpersonate = () => {
        router.post(route('impersonate.start', userId));
    };

    return (
        <Button
            onClick={handleImpersonate}
            variant="outline"

        >
            Impersonate User
        </Button>
    );
};

const ImpersonationBanner = () => {
    const { auth } = usePage().props;

    if (!auth.impersonating) {
        return null;
    }

    const stopImpersonating = () => {
        router.post(route('impersonate.stop'));
    };

    return (
        <Alert variant="default" className="mb-4">
            <AlertDescription className="max-w-7xl mx-auto flex items-center justify-between">
                <span>You are currently impersonating another user.</span>
                <Button
                    onClick={stopImpersonating}
                    variant="outline"
                    size="sm"
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                >
                    Stop Impersonating
                </Button>
            </AlertDescription>
        </Alert>
    );
};

export { ImpersonateButton, ImpersonationBanner };
