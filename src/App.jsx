import { useState, useEffect } from "react";
import * as Spinners from "react-spinners";
import "./App.css";
import { FaArrowLeft } from "react-icons/fa";
import ProductCard from "./components/ProductCard";

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 💡 Hint:
    const [searchQuery, setSearchQuery] = useState(""); // للحروف المكتوبة
    const [submitQuery, setSubmitQuery] = useState(""); // للكلمة النهائية
    function handleSubmit(e) {
        e.preventDefault();
        setSubmitQuery(searchQuery);
    }
    function handleBack() {
        setSearchQuery("");
        setSubmitQuery("");
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${submitQuery}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching products");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError(
                    err.message === "Failed to fetch"
                        ? "Check your internet connection"
                        : err.message,
                );
                setLoading(false);
            });
    }, [submitQuery]);
    return (
        <>
            <nav>

                    <button onClick={handleBack}>
                        <FaArrowLeft />
                    </button>
                <div className="container">
                    <div className="logo">
                        <h3>Trendify</h3>
                        <form onSubmit={handleSubmit} className="search-form">
                            <input
                                type="text"
                                placeholder="Search products..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button type="submit">Search</button>
                        </form>
                        <button className="sign-in">Get Started</button>
                    </div>
                </div>
            </nav>
            <main>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        rating={product.rating}
                    />
                ))}

                {loading && (
                    <>
                        <p>Loading...</p>
                        <Spinners.BarLoader
                            color="#3c34ae"
                            height={5}
                            width={1210}
                            speedMultiplier={0.25}
                        />
                    </>
                )}
                {error && <p>Error: {error} </p>}
            </main>
        </>
    );
}

export default App;
