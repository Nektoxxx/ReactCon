import { useEffect, useState } from "react";
import { Title } from "./Title";
import { Link } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { Sort } from "./Sort";

export function Catalog({ cart, setCart }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState(0);

    function sortBy(option, products) {
        switch (option) {
            case 'price_desc':
                return [...products].sort((a, b) => b.price - a.price);
            case 'price_asc':
                return [...products].sort((a, b) => a.price - b.price);
            default:
                return products;
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function getProducts(signal) {
            const response = await fetch('https://reactapi.pautinaweb.ru/objects.php', { signal });
            const result = await response.json();
            setProducts(result);
        }

        getProducts(controller.signal);

        return () => controller.abort();
    }, []);

    return (
        <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[10px]">
            <div className="container">
                <Title text="Каталог" />
                <div className="mb-5 flex justify-between items-end">
                    <SearchInput search={search} onType={(e) => setSearch(e.target.value)} />
                    <Sort sortOption={sortOption} onChange={(e) => setSortOption(e.target.value)} />
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        products &&
                        sortBy(sortOption, products)
                            .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
                            .map(product => (
                                <Card
                                    key={product.id}
                                    cart={cart}
                                    setCart={setCart}
                                    {...product}
                                />
                            ))
                    }
                </div>
            </div>
        </section>
    );
}

function Card({ id, name, description, price, cart, setCart }) {
    function handleClick() {
        const cartItem = cart.find(cartItem => cartItem.id == id);

        if (!cartItem) setCart([...cart, { id, name, quantity: 1 }]);
        else setCart(cart.map(cartItem => {
            if (cartItem.id === id) return { id, name, quantity: cartItem.quantity + 1 };
            return cartItem;
        }));
    }

    return (
        <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
            <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                <h3>
                    <Link
                        to={`/${id}`}
                        className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                    >
                        {name}
                    </Link>
                </h3>
                <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {description}
                </p>
                <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {price} ₽
                </p>
                <button
                    onClick={handleClick}
                    className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
                >
                    В корзину
                </button>
            </div>
        </div>
    );
}