<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
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

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        @if(config('app.env') === 'production')
            <!-- Google tag (gtag.js) -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-C9D6XS3R4V"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-C9D6XS3R4V');
            </script>
        @endif
    </body>
</html>
