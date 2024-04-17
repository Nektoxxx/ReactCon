import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function SinglePage({ cart, setCart }) {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const product = products && products.find(product => product.id == id);

    function handleClick() {
        const cartItem = cart.find(cartItem => cartItem.id == id);

        console.log(cart);
        if (!cartItem) setCart([...cart, { id, name: product.name, quantity: 1 }]);
        else setCart(cart.map(cartItem => {
            if (cartItem.id == id) return { id, name: product.name, quantity: cartItem.quantity + 1 };
            return cartItem;
        }));
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
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg overflow-hidden bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src="https://www.maspe.com/img/pGallery/watermark/2588r86411920o_1.jpg" alt="Product Image" />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button onClick={handleClick} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">В корзину</button>
                            </div>
                        </div>
                    </div>
                    {
                        product && (
                            <div className="md:flex-1 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {product.description}
                                </p>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Цена:</span>
                                        <span className="text-gray-600 dark:text-gray-300">{product.price} ₽</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}