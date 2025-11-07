export default function BodaBodaWelfareLayout({
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
