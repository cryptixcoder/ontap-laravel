import { subscriptionTiers } from '@/lib/products'
import StripeSubscriptionButton from '@/Components/Subscription/StripeSubscriptionButton'
import { CheckIcon } from '@heroicons/react/20/solid'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export default function SubscriptionOptions() {
    return (
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {subscriptionTiers.map((tier) => (
                <div key={tier.id} className={classNames(tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200', 'bg-white rounded-3xl p-8 ring-1 xl:p-10')}>
                    <h3 className={classNames(tier.featured ? 'text-white' : 'text-gray-900','text-lg font-semibold leading-8')}>
                        {tier.name}
                    </h3>
                    <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                        {tier.description}
                    </p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                        <span className={classNames(tier.featured ? 'text-white' : 'text-gray-900','text-4xl font-bold tracking-tight')}>
                            {tier.price}
                        </span>
                        <span className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600','text-sm font-semibold leading-6')}>
                            {tier.frequency}
                        </span>
                    </p>
                    <div className="mt-6">
                        <StripeSubscriptionButton priceId={tier.priceId} label={tier.cta} />
                    </div>
                    <ul
                        role="list"
                        className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-8 space-y-3 text-sm leading-6 xl:mt-10')}
                    >
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <CheckIcon aria-hidden="true" className={classNames(tier.featured ? 'text-white' : 'text-gray-600', 'h-6 w-5 flex-none')}/>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
