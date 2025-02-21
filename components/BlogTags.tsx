export function BlogTags({ tags, locale }: { tags: string[]; locale: Locale }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={getTagUrl(tag, locale)}
          className="text-sm text-gray-600 hover:text-primary"
        >
          {decodeURIComponent(tag)}
        </Link>
      ))}
    </div>
  );
}
