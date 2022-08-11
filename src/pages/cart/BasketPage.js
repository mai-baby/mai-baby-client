import Basket from "../../components/cart/Basket";

function BasketPage(props) {
  const {
    products,
    cartItems,
    totalPrice,
    onAdd,
    onRemove,
    shippingPrice,
    itemsPrice,
    setCartItems,
  } = props;
  return (
    <Basket
      products={products}
      cartItems={cartItems}
      totalPrice={totalPrice}
      onAdd={onAdd}
      onRemove={onRemove}
      shippingPrice={shippingPrice}
      itemsPrice={itemsPrice}
      setCartItems={setCartItems}
    />
  );
}

export default BasketPage;
