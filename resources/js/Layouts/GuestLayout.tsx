import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <Head>
                <meta name="description" content="OnTap is your dedicated productized service designed to provide the exact solutions startups and companies need to scale effectively. From seamless development to innovative design and strategy, we ensure you have what you need—when you need it." />
                <meta property="og:url" content="https://ontap.syncwaretechnologies.com" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="OnTap - The full service agency now on-tap" />
                <meta property="og:description" content="OnTap is your dedicated productized service designed to provide the exact solutions startups and companies need to scale effectively. From seamless development to innovative design and strategy, we ensure you have what you need—when you need it." />
                <meta property="og:image" content="https://ontap.syncwaretechnologies.com/OnTap-Preview.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="ontap.syncwaretechnologies.com" />
                <meta property="twitter:url" content="https://ontap.syncwaretechnologies.com" />
                <meta name="twitter:title" content="OnTap - The full service agency now on-tap" />
                <meta name="twitter:description" content="OnTap is your dedicated productized service designed to provide the exact solutions startups and companies need to scale effectively. From seamless development to innovative design and strategy, we ensure you have what you need—when you need it." />
                <meta name="twitter:image" content="https://ontap.syncwaretechnologies.com/OnTap-Preview.png" />
            </Head>
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
