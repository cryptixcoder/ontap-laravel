// import {loadStripe} from '@stripe/stripe-js'
import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import axios from 'axios';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

export default function StripeSubscriptionButton({ priceId, label }: { priceId: string, label: string}) {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        try {
            const { data } = await axios.post(route('subscription.checkout'), {
                price_id: priceId
            });

            window.location.href = data.url;
        }
        catch(error) {
            console.error('Subscription creation failed:', error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Button onClick={handleClick} disabled={loading}>
            { loading ? 'Processing' : label}
        </Button>
    )
}
