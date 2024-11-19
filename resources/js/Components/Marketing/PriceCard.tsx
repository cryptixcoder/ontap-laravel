
type PriceCardProps = {
    title: string;
    description: string;
    price: string;
    features: string[];
    children: React.ReactNode
}

export default function PriceCard({ title, description, price, features, children}:PriceCardProps) {
    return (
        <div className="bg-white/50 border rounded-2xl p-4 shadow-sm">
            <div className="bg-white rounded-2xl">
                <div className="">
                    <h4 className="font-oswald text-3xl text-primary-700 mb-2 uppercase">{title}</h4>
                    <h3 className="font-light text-1xl min-h-[126px] leading-relaxed">{description}</h3>
                    <div className="py-4">
                        {children}
                    </div>
                </div>
                <div className="font-oswald text-[64px] font-semibold mb-4">
                    {price}
                </div>
            </div>
            <div className="px-8 border-t pt-4">
                <h5 className="font-oswald text-2xl -ml-4 mb-2">What&rsquo;s Includes</h5>
                <ul className="list-disc text-black/30 space-y-2 font-sans">
                    {features.map((feature, index) => (
                        <li className="uppercase" key={index}>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
