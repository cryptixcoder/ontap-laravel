import axios from 'axios';
import { Button } from '../ui/button';
import { Link } from '@inertiajs/react';

export default function ManageSubscriptionButton() {
    const handleClick =  () => {
        window.location.href = route('subscription.billing');
    }

    return (
        <Button onClick={handleClick}>
            Manage Subscription
        </Button>
    )
}
