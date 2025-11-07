export default function OurCultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24">{children}</section>
  );
}
