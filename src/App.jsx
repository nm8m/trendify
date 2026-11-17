import { useState, useEffect } from "react";
import "./App.css";
import { FaArrowLeft, FaSearch, FaShoppingBag } from "react-icons/fa";
import ProductCard, { ProductCardSkeleton } from "./components/ProductCard";

function App() {
    const [result, setResult] = useState({ query: null, products: [], error: null });
    const [cart, setCart] = useState(() => new Set());

    const [searchQuery, setSearchQuery] = useState(""); // للحروف المكتوبة
    const [submitQuery, setSubmitQuery] = useState(""); // للكلمة النهائية
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitQuery(searchQuery.trim());
    }
    function handleBack() {
        setSearchQuery("");
        setSubmitQuery("");
    }
    function toggleCart(id) {
        setCart((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    useEffect(() => {
        const controller = new AbortController();
        fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(submitQuery)}`,
            { signal: controller.signal },
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching products");
                }
                return response.json();
            })
            .then((data) => {
                setResult({ query: submitQuery, products: data.products, error: null });
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                setResult({
                    query: submitQuery,
                    products: [],
                    error:
                        err.message === "Failed to fetch"
                            ? "Check your internet connection"
                            : err.message,
                });
            });
        return () => controller.abort();
    }, [submitQuery]);

    const loading = result.query !== submitQuery;
    const { products, error } = result;
    const isSearching = submitQuery !== "";

    return (
        <>
            <nav>
                <div className="container">
                    <div className="logo">
                        <div className="brand">
                            {isSearching && (
                                <button
                                    type="button"
                                    className="back-button"
                                    onClick={handleBack}
                                    aria-label="Back to all products"
                                >
                                    <FaArrowLeft />
                                </button>
                            )}
                            <h3>Trendify</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="search-form" role="search">
                            <FaSearch className="search-icon" aria-hidden="true" />
                            <input
                                type="search"
                                placeholder="Search products..."
                                aria-label="Search products"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button type="submit">Search</button>
                        </form>
                        <button
                            type="button"
                            className="cart-button"
                            aria-label={`Cart, ${cart.size} items`}
                        >
                            <FaShoppingBag />
                            <span>Cart</span>
                            {cart.size > 0 && <span className="cart-count">{cart.size}</span>}
                        </button>
                    </div>
                </div>
            </nav>
            <section className="results-header">
                <h1>{isSearching ? `Results for "${submitQuery}"` : "All products"}</h1>
                {!loading && !error && (
                    <p>
                        {products.length} {products.length === 1 ? "item" : "items"}
                    </p>
                )}
            </section>
            <main>
                {loading &&
                    Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}

                {!loading &&
                    !error &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            thumbnail={product.thumbnail}
                            rating={product.rating}
                            brand={product.brand}
                            category={product.category}
                            discountPercentage={product.discountPercentage}
                            inCart={cart.has(product.id)}
                            onAddToCart={() => toggleCart(product.id)}
                        />
                    ))}

                {!loading && !error && products.length === 0 && (
                    <div className="empty-state">
                        <h2>No products found</h2>
                        <p>Nothing matches "{submitQuery}". Try another search.</p>
                        <button type="button" onClick={handleBack}>
                            Show all products
                        </button>
                    </div>
                )}

                {error && (
                    <div className="empty-state">
                        <h2>Something went wrong</h2>
                        <p>{error}</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
