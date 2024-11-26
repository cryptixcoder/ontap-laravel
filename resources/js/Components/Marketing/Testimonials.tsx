const testimonials = [
  {
    id: 1,
    author: "Jaret Wilson",
    title: "CEO | The Wilson Concept",
    review: "In developing a hybrid mobile application for a client, Syncware Technologies was able to promptly step in, manage preset functions, guide our team on best practices and be a vital part in pushing our product to completion."
  },
  {
    id: 2,
    author: "Craig Calderon",
    title: "CEO | DNAID",
    review: "The app was made successfully. Syncware Technologies, Inc. stayed in constant communication throughout the process, and they impressively distilled the most efficient way to build the app using the novel technology."
  },
  {
    id: 3,
    author: "Ari Layugan",
    title: "CEO | Elva",
    review: "Markus is a true champion. His design skills are fantastic. He understands aesthetics so well."
  },
  {
    id: 4,
    author: "Tiffanie Stanard",
    title: "CEO | Stimulus Inc.",
    review: "Markus Gray of Syncware Technologies has been a cornerstone in developing both our Stimulus business website and my personal entrepreneurial brand website over the past few years. His responsiveness and collaboration with my team have ensured optimal functionality and seamless user experiences when implementing our designs and site needs. Markus consistently delivers high-quality work promptly and within reasonable time frames. I highly recommend Markus and his professionalism for any web development needs."
  }
]

export default function Testimonials() {
    return (
        <div className="enable-animation my-[60px] font-opensans ">
            <div className="px-4 md:px-0 container max-w-5xl mb-[40px]">
                <div className="mb-10 lg:mb-0">
                    <h3 className="text-4xl font-oswald font-semibold mb-5 uppercase">Client Testimonials<span className="text-primary-700">.</span></h3>
                </div>
            </div>
            <div className="marquee flex">
               <div className="marquee-content">
                 {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="pt-[40px] flex flex-col justify-between border-y border-r">
                        <div className="w-[570px] min-w-[33vw] pl-[40px] pr-[40px] pb-[40px] flex flex-col">
                            <img src="/top-quote.svg" alt="" className="inline-block self-start mb-[24px]" />
                            <p className="text-[24px] leading-[33px] font-light">{testimonial.review}</p>
                            {/* <img src="/bottom-quote.svg" alt="" className="inline-block self-end mt-[24px]" /> */}
                        </div>
                        <div className="p-[40px] border-t">
                            <h3 className="font-oswald uppercase text-[18px]">{testimonial.author}</h3>
                            <h4>{testimonial.title}</h4>
                        </div>
                    </div>
                ))}
               </div>
               <div aria-hidden="true" className="marquee-content">
                 {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="pt-[40px] flex flex-col justify-between border-y border-r">
                        <div className="w-[570px] min-w-[33vw] pl-[40px] pr-[40px] pb-[40px] flex flex-col">
                            <img src="/top-quote.svg" alt="" className="inline-block self-start mb-[24px]" />
                            <p className="text-[24px] leading-[33px] font-light">{testimonial.review}</p>
                            {/* <img src="/bottom-quote.svg" alt="" className="inline-block self-end mt-[24px]" /> */}
                        </div>
                        <div className="p-[40px] border-t">
                            <h3 className="font-oswald uppercase text-[18px]">{testimonial.author}</h3>
                            <h4>{testimonial.title}</h4>
                        </div>
                    </div>
                ))}
               </div>
            </div>
        </div>
    )
}
