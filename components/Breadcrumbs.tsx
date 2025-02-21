import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n-config";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
  lang: Locale;
}

export default function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link
            href={`/${lang}`}
            className="hover:text-primary transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" />
            {index === items.length - 1 ? (
              <span className="text-gray-900">{item.label}</span>
            ) : (
              <Link
                href={item.href || "#"}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
