import { Badge } from '@/Components/ui/badge';

type ProjectStatusBadgeProps = {
    status: string
}

const getBadgeColor = (status: string) => {
    switch(status) {
        case "Pending":
                return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
            break;
        case "In Progress":
                return "border-transparent bg-amber-400 text-destructive-foreground hover:bg-amber-400/80";
            break;

        case "Completed":
                return "border-transparent bg-green-400 text-destructive-foreground hover:bg-green-400/80";
            break;
    }
}

export default function ProjectStatusBadge({status}:ProjectStatusBadgeProps){
    return (
        <Badge className={getBadgeColor(status)}>{status}</Badge>
    )
}
