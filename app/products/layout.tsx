export default function ProductsLayout({
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
