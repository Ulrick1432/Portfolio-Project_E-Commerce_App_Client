// Denne side skal der direktes til efter kørsel fra "PaymentsCompletionPage"
// Her skal den vise en form for ordre bekræfelse, med producter der er købt pris og order ID
import { useSelector } from "react-redux";

const ConfimationPage = () => {
    const allProducts = useSelector((state) => state.cartState.value);
    return (
        <div>
            <ul>
                {allProducts && allProducts.map((product) => (
                    <Product
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    description={product.description}
                    quantity={product.quantity}
                    />
                ))}
            </ul>
        </div>

    )
}

export default ConfimationPage;