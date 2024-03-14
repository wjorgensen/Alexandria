import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}