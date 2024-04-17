import { Catalog } from "./Catalog";
import { Slider } from "./Slider";

export function Home({ cart, setCart }) {
    return (
        <>
            {/* <Slider /> */}
            <Catalog cart={cart} setCart={setCart} />
        </>
    );
}