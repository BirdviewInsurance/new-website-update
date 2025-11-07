export default function AquaculturetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen max-w-none overflow-hidden bg-background">
      {children}
    </section>
  );
}
