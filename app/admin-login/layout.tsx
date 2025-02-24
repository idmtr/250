import { layoutClasses } from "../layout";

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={layoutClasses.html}>
      <body className={layoutClasses.body}>{children}</body>
    </html>
  );
}
