export default function PictorialLayout({ children }: { children: React.ReactNode }) {
    return (
            <section className="w-screen max-w-none overflow-hidden">{children}</section>
    );
}
