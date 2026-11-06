import { useState, useEffect } from "react";
import * as Spinners from "react-spinners";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
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
    }, []);
    return (
        <>
            <nav>
                <div className="container">
                    <div className="logo">
                        <h3>Trendify</h3>
                        <form className="search-form">
                            <input type="text" placeholder="Search products..." />
                            <button type="submit">
                                Search
                            </button>
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
