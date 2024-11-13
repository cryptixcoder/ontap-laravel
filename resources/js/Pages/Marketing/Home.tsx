import Contact from '@/Components/Marketing/Contact';
import { PageProps } from '@/types';
import Footer from '@/Components/Marketing/Footer';
import Navigation from '@/Components/Marketing/Navigation';
import PriceCard from '@/Components/Marketing/PriceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Link } from '@inertiajs/react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Home({auth, plans, categories}:PageProps< {plans: any[], categories: any[]}>) {
    return (
        <div>
            <Navigation />
            <div className="container max-w-5xl mx-auto py-4">
                <div></div>
                <nav className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link
                            href={auth.user.role === 'admin' ? route('admin.dashboard.index') : route('task.index')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            { auth.user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard' }
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
            <div className="py-[40px]">
                <div className="px-4 md:px-0 container max-w-5xl">
                    <div className="grid grid-cols-1  py-20">
                        <div className="mb-10 md:mb-0">
                            <h3 className="text-slate-900 text-5xl lg:text-8xl font-display font-semibold mb-5 lg:max-w-6xl uppercase"><span className="text-primary-700">OnTap</span> the full service agency now on-tap<span className="text-primary-600">.</span></h3>
                            <h4 className="text-3xl font-light">Weather is mobile or web UI/UX design, development, or AI Integration we're here to help.</h4>
                        </div>
                    </div>
                </div>
                <div className="px-4 md:px-0 container max-w-5xl mb-20">
                    <div>
                        <div className="mb-10">
                            <h3 className="text-slate-900 text-5xl lg:text-4xl font-display font-semibold mb-10 md:mb-5 lg:max-w-4xl uppercase">
                               Ontap Subscriptions<span className="text-primary-600">.</span>
                            </h3>
                            <p className="max-w-lg font-light text-[1.125rem] leading-[1.75rem]">Choose from two subscription packages designed to fit your unique needs, whether you're looking for small ongoing tasks or you need the full agency experience, all with transparent pricing and no hidden fees.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            {plans.map((subscription) => (
                                <PriceCard
                                    key={subscription.id}
                                    title={subscription.name}
                                    price={formatter.format(subscription.price)}
                                    description={subscription.description}
                                    features={[]}
                                >
                                    <div className="mt-2">
                                        {/* <ScheduleSessionButton /> */}
                                    </div>
                                </PriceCard>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-4 md:px-0 container max-w-5xl mb-20">
                    <div>
                        <div className="mb-10">
                            <h3 className="text-slate-900 text-5xl lg:text-4xl font-display font-semibold mb-10 md:mb-5 lg:max-w-4xl uppercase">
                               Sprint Packages<span className="text-primary-600">.</span>
                            </h3>
                            <p className="max-w-lg font-light text-[1.125rem] leading-[1.75rem]">Not ready for a subscription or don't need it? We've got you covered. Choose from two flexible packages designed to fit your unique needs, whether you're looking for individual headshots or team photos, all with transparent pricing and no hidden fees.</p>
                        </div>
                        <Tabs defaultValue={categories[0]?.id.toString()} className="w-full">
                            <TabsList className="flex-wrap h-auto bg-transparent">
                                {categories.map((cat) => (
                                    <TabsTrigger key={cat.id} value={cat.id.toString()} >{cat.name}</TabsTrigger>
                                ))}
                            </TabsList>
                            <div className="mt-4">
                                {categories.map((cat) => (
                                    <TabsContent key={cat.id} value={cat.id.toString()} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                            {cat.products.map((product) => (
                                                <PriceCard
                                                    key={product.id}
                                                    title={product.name}
                                                    price={formatter.format(product.price)}
                                                    description={product.description}
                                                    features={[]}
                                                >
                                                    <div className="mt-2">
                                                        {/* <ScheduleSessionButton /> */}
                                                    </div>
                                                </PriceCard>
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                </div>
                <div className="py-[40px]">
                    <div className="container max-w-6xl">
                            {/* <div>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold mb-5 uppercase max-w-[30rem]">Plans <span className="text-primary-700">&</span> Pricing</h2>
                            </div> */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* {monthlyServices.map((service) => (
                                    <PriceTable key={service.id} service={service} />
                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 ">
                        {/* {featuredPosts.map((featured) => {
                            return (
                            <div key={featured.slug} className="col-span-1 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${featured.cover})` }}>
                                <div className="py-72 bg-black bg-opacity-50 h-full">
                                    <h2 className="font-display text-white uppercase text-center text-semibold text-4xl">{featured.title}</h2>
                                </div>
                            </div>
                            )
                        })} */}

                    </div>
                </div>
            <Contact />
            <Footer />
        </div>
    )
}
