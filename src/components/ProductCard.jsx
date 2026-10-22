import { FaTag, FaStar } from "react-icons/fa";
function ProductCard({ thumbnail, title, price, rating }) {
    return (
        <div className="product-card">
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <p className="price">
                <FaTag /> {price}$
            </p>
            <p className="rating">
                <FaStar /> {rating}
            </p>
        </div>
    );
}

export default ProductCard;
