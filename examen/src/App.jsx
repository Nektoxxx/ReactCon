import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { useState } from "react";
import { SinglePage } from "./components/SinglePage";
import { Home } from "./components/Home";

export default function App() {
    const [cart, setCart] = useState([]);

    return (
        <Routes>
            <Route path="/" element={<Layout cart={cart} setCart={setCart} />}>
                <Route index element={<Home cart={cart} setCart={setCart} />} />
                <Route path="/:id" element={<SinglePage cart={cart} setCart={setCart} />} />
            </Route>
        </Routes>
    );
}