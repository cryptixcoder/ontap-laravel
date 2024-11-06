export const SPRINT = {
    id: "price_0PVIu2SMqd8bI2qaCbyluxaW",
    name: "Sprint",
    price: "$6,000"
}

interface SubscriptionProps {
    id: string
    name: string
    price: string
    description: string
    features: string[]
    cta: string
    productId?: string
    priceId: string
    frequency: string
    featured: boolean
}

export const subscriptionTiers:SubscriptionProps[] = [
    {
        id: "augment",
        name: "Augment",
        description: "First come first serve",
        features: [
             "Development & Creative Services",
            "50hrs for Design/Dev",
            "Async Communication",
            "Monthly Consulting",
            "Updates every 2 days",
            "Pause or Cancel Anytime"
        ],
        cta: "Subscribe to Augment",
        productId: "prod_PxCy2sJoP3LB0I",
        priceId: "price_0P7IY4SMqd8bI2qaTDtJ8m8z",
        price: "$6,000",
        frequency: "/month",
        featured: false
    },
    {
        id: "agency",
        name: "Full Agency",
        description: "For brands ready to go to the next level",
        features: [
            "Development & Creative Services",
            "Fully managed project",
            "Unlimited Development and Design",
            "Access to full team",
            "Creative Strategy",
            "Monthly Consulting",
            "Updates every 2 days",
            "Pause or Cancel at anytime"
        ],
        cta: "Subscribe to Full Agency",
        productId: "prod_QM0vI5gLHfCdHs",
        priceId: "price_0PVItFSMqd8bI2qaSvRtVXSp",
        price: "$15,000",
        frequency: "/month",
        featured: false
    },
]

export const onboardingTiers:SubscriptionProps[] = [
    ...subscriptionTiers,
    {
        id: "sprint",
        name: "Project Sprint",
        description: "For brands ready to go to the next level",
        features: [
            "Full service creative",
            "Monthly consulting calls"
        ],
        cta: "Buy Sprint",
        priceId: "",
        price: "$6,000",
        frequency: "/project",
        featured: true
    }
]
