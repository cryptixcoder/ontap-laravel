// import {loadStripe} from '@stripe/stripe-js';
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PurchaseProjectButton() {
    const [ loading, setLoading ] = useState(false);

    const handleClick = async () => {
        router.post(route('project.checkout'),{}, {
            onSuccess: (page) => {
                const sessionURL = page.props.url;

                if(sessionURL) {
                    window.location.href = sessionURL;
                }
            },
            onError: () => {
                setLoading(false)
            }
        });
    }

    return (
        <Button variant="outline" onClick={handleClick} disabled={loading}>
            { loading ? "Processing" : "Buy Sprint" }
        </Button>
    )
}
