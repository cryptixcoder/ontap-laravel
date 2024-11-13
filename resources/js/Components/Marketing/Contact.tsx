import { Link } from '@inertiajs/react';

export default function Contact(){
    return (
        <div className="bg-slate-900 py-10">
            <div className="container max-w-4xl justify-center">
                <h3 className="uppercase text-white text-5xl mb-10 text-center font-display" >Ready to start?</h3>
                <div className="flex items-center justify-center">
                    {/* <a href="https://markusgray1.typeform.com/to/HRyyoMTj" target="_blank" className="inline-flex items-center px-6 py-3 bg-primary-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                        Work with us
                    </a> */}
                    <Link href="https://cal.com/syncwaretechnologies/ontap-intro" target='_blank' className="transition rounded-md ease-in-out duration-75 inline-flex items-center uppercase border-2 border-primary-700 text-primary-700 px-4 py-2 hover:bg-primary-700 hover:text-white">
                        Book a call
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}
