import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';


export default function Navigation() {
    return (
        <Disclosure as="header" className="py-4 border-b">
            {({open, close}) => (
                <>
                    <div className="px-4 md:px-0 container max-w-6xl font-oswald">
                        <div className="flex justify-between items-center">
                        <div>
                            <a href="https://syncwaretechnologies.com">
                                <img src="/logo.png" alt="" className="h-20" />
                            </a>
                        </div>
                        <nav className="hidden sm:flex font-display text-xl space-x-8 items-center">
                            <a href="https://syncwaretechnologies.com/work" className="uppercase hover:text-primary-700">Work</a>
                            <a href="https://syncwaretechnologies.com/about" className="uppercase hover:text-primary-700">Agency</a>
                            <a href="https://syncwaretechnologies.com/blog" className="uppercase hover:text-primary-700">Blog</a>
                            <a href="https://syncwaretechnologies.com/photography" className="uppercase hover:text-primary-700">Photography</a>
                            <a href="https://ontap.syncwaretechnologies.com" className="uppercase text-primary-700 hover:text-primary-700">OnTap</a>
                            <a href="https://cal.com/syncwaretechnologies/ontap-intro" target='_blank' className="transition ease-in-out duration-75 inline-flex items-center uppercase border-2 border-primary-700 text-primary-700 px-4 py-2 hover:bg-primary-700 hover:text-white">
                                Book a call
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </nav>
                        <div className="mr-4 md:-mr-2 flex items-center sm:hidden">
                                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md  hover:text-slate-500 hover:bg-slate-700 focus:outline-none " aria-controls="mobile-menu" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    { open ? (
                                        <XMarkIcon className="block h-6 w-6" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" />
                                    ) }
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a href="https://syncwaretechnologies.com/work" onClick={() => close()} className="block py-2 text-center  font-display text-xl font-medium uppercase hover:underline">Work</a>
                            <a href="https://syncwaretechnologies.com/about" onClick={() => close()} className="block py-2 text-center  font-display text-xl font-medium uppercase hover:underline">Agency</a>
                            <a href="https://syncwaretechnologies.com/blog" onClick={() => close()} className="block py-2 text-center  font-display text-xl font-medium uppercase hover:underline">Blog</a>
                            <a href="https://syncwaretechnologies.com/photography" onClick={() => close()} className="block py-2 text-center  font-display text-xl font-medium uppercase hover:underline">Photography</a>
                            <a href="https://ontap.syncwaretechnologies.com" className="block py-2 text-center  font-display text-xl font-medium uppercase hover:underline">On-Tap</a>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}
