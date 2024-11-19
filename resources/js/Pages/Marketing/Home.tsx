import Contact from '@/Components/Marketing/Contact';
import { PageProps } from '@/types';
import Footer from '@/Components/Marketing/Footer';
import Navigation from '@/Components/Marketing/Navigation';
import PriceCard from '@/Components/Marketing/PriceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Head, Link } from '@inertiajs/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import Testimonials from '@/Components/Marketing/Testimonials';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

type Category = {
    id: string;
    name: string;
    products: [{
        id: string;
        name: string;
        price: number;
        description: string;
        stripe_price_id: string;
    }]
}

type Plan = {
    id: string
    name: string
    description: string
    stripe_statement_descriptor: string
    stripe_product_id: string
    stripe_price_id: string
    price: number
    features: string
    limit: number
}

export default function Home({auth, plans, categories}:PageProps< {plans: Plan[], categories: Category[]}>) {
    return (
        <div className="marketing font-opensans">
            <Head title="OnTap - A full service agency now on-tap" />
            <Navigation />
            <div className="container max-w-5xl mx-auto py-4">
                <div></div>
                <nav className="-mx-3 flex flex-1 justify-end font-oswald">
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
                            <h3 className="text-slate-900 text-5xl lg:text-8xl font-oswald font-semibold mb-5 lg:max-w-6xl uppercase"><span className="text-primary-700">OnTap</span> the full service agency now on-tap<span className="text-primary-600">.</span></h3>
                            <h4 className="text-3xl font-light">Weather is mobile or web UI/UX design, development, or AI Integration we're here to help.</h4>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 py-4">
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/01.png)` }}></div>
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/02.png)` }}></div>
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/03.png)` }}></div>
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/04.jpeg)` }}></div>
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/05.jpeg)` }}></div>
                    <div className="col-span-1 bg-center bg-cover bg-no-repeat py-72" style={{ backgroundImage: `url(/work/06.png)` }}></div>
                </div>

                <div className="py-10 border-y my-[60px]">
                    <div className="px-4 md:px-0 container flex flex-col items-center justify-center">
                        <h2 className="text-slate-900 text-5xl lg:text-4xl font-oswald font-semibold mb-10 md:mb-8 lg:max-w-4xl uppercase text-center">How Subscriptions Work<span className="text-primary-600">?</span></h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 1: Subscribe to a package</h3>
                                <p className="text-center font-opensans text-lg font-light">Choose the right subscription plan for your needs.</p>
                            </div>
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 2: Add your tasks</h3>
                                <p className="text-center font-opensans text-lg font-light">Using our custom task management system, you can add tasks to your project.</p>
                            </div>
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 3: Get Work Done</h3>
                                <p className="text-center font-opensans text-lg font-light">Our team will work on your tasks and get them delivered on time.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="subscriptions" className="px-4 md:px-0 container max-w-5xl mb-20">
                    <div>
                        <div className="mb-10">
                            <h3 className="text-slate-900 text-5xl lg:text-4xl font-oswald font-semibold mb-10 md:mb-5 lg:max-w-4xl uppercase">
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
                                    features={subscription.features.split(',')}
                                >
                                    <div className="mt-2 space-x-4">
                                         <Link href="/register" className="transition ease-in-out duration-75 inline-flex items-center uppercase border-2 border-primary-700 text-primary-700 px-4 py-2 hover:bg-primary-700 hover:text-white">
                                            Subscribe
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Link>

                                        <Link href="/register" className="transition ease-in-out duration-75 inline-flex items-center uppercase border-2 bg-primary-700 text-white border-primary-700 hover:text-primary-700 px-4 py-2 hover:bg-white">
                                            Schedule a Call
                                        </Link>
                                    </div>
                                </PriceCard>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-10 border-y my-[60px]">
                    <div className="px-4 md:px-0 container flex flex-col items-center justify-center">
                        <h2 className="text-slate-900 text-5xl lg:text-4xl font-oswald font-semibold mb-10 md:mb-8 lg:max-w-4xl uppercase text-center">What about Sprints<span className="text-primary-600">?</span></h2>
                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 1: Buy a sprint</h3>
                                <p className="text-center font-opensans text-lg font-light">We crafted our sprints around what most businesses need. Choose the right sprint for you!</p>
                            </div>
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 2: Fill out sprint details</h3>
                                <p className="text-center font-opensans text-lg font-light">Each sprint has a questionnaire to gather all the details for your project. Fill it out and we get to work!</p>
                            </div>
                            <div>
                                <h3 className="font-oswald text-xl uppercase mb-2 text-center">Step 3: Receive deliverables in 2 weeks</h3>
                                <p className="text-center font-opensans text-lg font-light">We've refined our process to provide quality and values quickly. You'll have your deliverables in 2 weeks.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sprint-packages" className="px-4 md:px-0 container max-w-5xl mb-20">
                    <div>
                        <div className="mb-10">
                            <h3 className="text-slate-900 text-5xl lg:text-4xl font-oswald font-semibold mb-10 md:mb-5 lg:max-w-4xl uppercase">
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
                                                    <div className="mt-2 space-x-4">
                                                        <Link href="/register" className="transition ease-in-out duration-75 inline-flex items-center uppercase border-2 border-primary-700 text-primary-700 px-4 py-2 hover:bg-primary-700 hover:text-white">
                                                            Start Sprint
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                            </svg>
                                                        </Link>

                                                        <Link href="/register" className="transition ease-in-out duration-75 inline-flex items-center uppercase border-2 bg-primary-700 text-white border-primary-700 hover:text-primary-700 px-4 py-2 hover:bg-white">
                                                            Schedule a Call
                                                        </Link>
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
                <Testimonials />
                <div className="px-4 md:px-0 container max-w-5xl mb-20">
                    <h2 className="text-slate-900 text-5xl lg:text-4xl font-oswald font-semibold mb-10 md:mb-5 lg:max-w-4xl uppercase">Frequently Asked Questions<span className="text-primary-600">.</span></h2>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-2xl font-oswald">What is OnTap and How can it help me?</AccordionTrigger>
                            <AccordionContent className="font-opensans text-xl">
                            Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-2xl font-oswald">What services does OnTap offer?</AccordionTrigger>
                            <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-2xl font-oswald">What technologies does OnTap use?</AccordionTrigger>
                            <AccordionContent>
                            Yes. It's animated by default, but you can disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-2xl font-oswald">Can Ontap help with existing project Or only new projects?</AccordionTrigger>
                            <AccordionContent>
                            Yes. It's animated by default, but you can disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="py-[40px]">
                    <div className="container max-w-6xl">

                        </div>
                    </div>

                </div>
            <Contact />
            <Footer />
        </div>
    )
}
