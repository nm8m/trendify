import { FaStar, FaRegStar, FaShoppingCart, FaCheck } from "react-icons/fa";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Stars({ rating }) {
    const fill = `${(Math.min(Math.max(rating, 0), 5) / 5) * 100}%`;
    return (
        <span className="stars" aria-hidden="true">
            <span className="stars-base">
                {[0, 1, 2, 3, 4].map((i) => (
                    <FaRegStar key={i} />
                ))}
            </span>
            <span className="stars-fill" style={{ width: fill }}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <FaStar key={i} />
                ))}
            </span>
        </span>
    );
}

function ProductCard({
    thumbnail,
    title,
    price,
    rating,
    brand,
    category,
    discountPercentage,
    inCart,
    onAddToCart,
}) {
    const discountRate = discountPercentage ?? 0;
    const discount = Math.round(discountRate);
    const originalPrice = discountRate > 0 ? price / (1 - discountRate / 100) : null;

    return (
        <article className="product-card">
            <div className="product-media">
                <img src={thumbnail} alt={title} loading="lazy" />
                {discount >= 5 && <span className="badge">-{discount}%</span>}
            </div>
            <p className="product-meta">{brand || category}</p>
            <h3 title={title}>{title}</h3>
            <p className="rating" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
                <Stars rating={rating} />
                <span>{rating.toFixed(1)}</span>
            </p>
            <div className="product-footer">
                <p className="price">
                    {currency.format(price)}
                    {originalPrice && (
                        <s className="price-original">{currency.format(originalPrice)}</s>
                    )}
                </p>
                <button
                    type="button"
                    className={`add-to-cart${inCart ? " added" : ""}`}
                    onClick={onAddToCart}
                    aria-label={inCart ? `${title} added to cart` : `Add ${title} to cart`}
                    aria-pressed={inCart}
                >
                    {inCart ? <FaCheck /> : <FaShoppingCart />}
                </button>
            </div>
        </article>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="product-card skeleton" aria-hidden="true">
            <div className="product-media" />
            <span className="skeleton-line short" />
            <span className="skeleton-line" />
            <span className="skeleton-line medium" />
        </div>
    );
}

export default ProductCard;
