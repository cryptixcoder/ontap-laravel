import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type BreadcrumbProps = {
    children: React.ReactNode
}

type BreadcrumbLinkProps = {
    children: React.ReactNode;
    href: string;
    icon?: boolean;
}

export const Breadcrumb = ({ children }: BreadcrumbProps) => {
    return (
        <nav className="flex mt-8" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {children}
            </ol>
        </nav>
    )
}

export const BreadcrumbLink = ({ children, href, icon = false }:BreadcrumbLinkProps) => {
    return (
        <li>
            <div className="flex items-center">
                {icon && (
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                )}

                <Link href={href} className={cn("text-sm font-medium text-gray-500 hover:text-gray-700", icon ? "ml-4" : "")} aria-current="page">{children}</Link>
            </div>
        </li>
    )
}

const Breadcrumbs = ({ items }:{items: any[]}) => {
    return (
        <Breadcrumb>
            {items.map((item, index) => (
                <BreadcrumbLink key={index} icon={item.icon} href={item.href}>{item.label}</BreadcrumbLink>
            ))}
        </Breadcrumb>
    )
}

export default Breadcrumbs;
