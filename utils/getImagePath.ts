// utils/getImagePath.ts
export const getImagePath = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL || ''}${path}`;
};