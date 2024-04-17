import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout({ cart, setCart }) {
    return (
        <>
            <Header cart={cart} setCart={setCart} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
