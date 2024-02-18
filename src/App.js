import Narbar from "./components/Narbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";

function App() {

  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCartItems())
  },[dispatch])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return(
    <main>
      {isOpen && <Modal />}
      <Narbar />
      <CartContainer />
    </main> 
  );
}

export default App;