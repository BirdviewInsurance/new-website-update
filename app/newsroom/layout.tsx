export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {children}
    </section>
  );
}
