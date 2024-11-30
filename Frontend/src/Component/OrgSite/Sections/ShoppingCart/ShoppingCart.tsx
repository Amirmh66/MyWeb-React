import Button from "../../../Elements/Buttons";
import NavbarMobile from "../../../Elements/NavbarMobile";
import { useCartSelector, useCartDispatch } from "../../../Features/hooks";
import { type CartItem, addToCart, removefromCart } from "../../../Features/SoppingCart/CartSlice/Cart-Slice";


function ShoppingCart() {
  const cartItems = useCartSelector((state) => state.cart.items);
  const dispatch = useCartDispatch();
  const total = cartItems.reduce(
    (value, item) => value + item.price * item.quantity,
    0
  );

  function handleAddToCart(item: CartItem) {
    dispatch(addToCart(item));
  }
  function handleRemoveFromCart(id: string) {
    dispatch(removefromCart(id));
  }

  return (
    <>
      <div className="bg-gray-200 flex flex-col justify-center itmes-center  pt-2">
        {cartItems.length === 0 && (
          <p className="text-center pt-5">There are no products in the shopping cart!</p>
        )}

        <ul className="mb-3">
          {cartItems.map((item) => {
            return (
              <li
                key={item.id}
                className="bg-gray-100 py-10 px-3 my-5 flex gap-10 justify-between h-10 items-center  w-full"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-semibold ">{item.name}</span>
                  <strong>${item.price}</strong>
                </div>
                <div>
                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    text="-"
                    className="bg-red-400"
                  />
                  <span className="text-lg font-semibold rounded-full mr-3 bg-indigo-100 p-2">
                    {item.quantity}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    text="+"
                    className="bg-green-400"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border m-2 rounded-lg p-2 flex justify-between items-center">
          {cartItems.length > 0 && (
            <span className="font-semibold">
              Total: <strong>${total}</strong>
            </span>
          )}
          {cartItems.length > 0 && (
            <Button text="Buy" className="bg-slate-700" />
          )}
        </div>

      </div>
      <NavbarMobile />
    </>
  );
}

export default ShoppingCart;
