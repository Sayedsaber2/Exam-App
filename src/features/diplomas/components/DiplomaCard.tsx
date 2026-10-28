import { Link } from "react-router-dom";
import type { Diploma } from "../types";

export default function DiplomaCard({ diploma }: { diploma: Diploma }) {
    return (
        <Link
            to={`/diplomas/${diploma.id}`}
            className="group relative block aspect-3/4 overflow-hidden bg-muted font-mono"
        >
            <img
                src={diploma.image}
                alt={diploma.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* الصندوق الأزرق: 12px من الأطراف · الوصف سطرين وبيتفرد كله على الهوفر */}
            <div className="absolute inset-x-3 bottom-3 space-y-1 bg-primary/80 p-4 text-primary-foreground">
                <h3 className="text-xl font-semibold">{diploma.title}</h3>
                <p className="line-clamp-2 text-sm leading-relaxed text-primary-foreground/90 group-hover:line-clamp-none">
                    {diploma.description}
                </p>
            </div>
        </Link>
    );
}
