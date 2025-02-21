export function normalizeTag(tag: string): string {
  return encodeURIComponent(
    tag.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
  );
}

export function denormalizeTag(encodedTag: string): string {
  return decodeURIComponent(encodedTag)
    .replace(/-/g, ' ')
    .toLowerCase();
}