import {React,useState} from "react";
import {useCart , useDispatchCart} from '../HOC/Hoc'
import Modal from "./Modal/Modal";

const CartItem = ({ product, index, handleRemove }) => {
  return (
    
      <div className="pizzaImageDetail">
        <div className="cartImgDiv">
          <img src={product.imageUrl} className="cartImg" alt="Product" />
        </div>
        <div className="cartPizzaDetails">
          <div>
          <h2><u>{product.pizzaName}</u></h2>
          <h2>{product.size}</h2>
          <p> Price :- <strong>₹{product.price}</strong></p>
          </div>
          <button className="removeFromCartBttn" onClick={() => handleRemove(index)}>Remove</button>
        </div>
      </div>
  );
};

export default function Store() {
  const [modalState, setModalState] = useState(false);

  const items = useCart();
  const dispatch = useDispatchCart();
  const totalPrice = items.reduce((total, { price = 0 }) => total + price, 0);
  // console.log(totalPrice)

  const openFormModalHandler = () => {
    // setSendingData(selectedItem);
    setModalState(true);
  };

  const closeFormModalHandler = () => {
    setModalState(false);
  };


  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };


  
  if (items.length === 0) {
    return (
      <div className="emptyCartMsz">
        <p>Cart is empty</p>
      </div>
    );
  }
  return (
    <div className="cartItemsDiv">
      <div className="pizzaDetailDiv">
        {items.map((item, index) => (
          <CartItem
            handleRemove={handleRemove}
            key={index}
            product={item}
            index={index}
          />
        ))}
      </div>

      <div className="priceNdOrderBttn">
        <p className="totalPrice">Total price: ₹{totalPrice}</p>
        <br />
        <button className="placeOrderBttn" onClick={openFormModalHandler}>
          Place Order
        </button>
      </div>
      {modalState && (
        <Modal closeHandler={closeFormModalHandler} totalPrice={totalPrice} />
      )}
    </div>
  );
}



















// function Cart() {

  
//   return (
//     <div>
//       <h1>welcome to Cart</h1>
//       {/* <div>
//         {itemsInCart &&
//           itemsInCart.map((cItems) => {
//             return `
//                   <div key = ${cItems.id}> 
//                   <h1> ${cItems.name} </h1>
//                   </div>
//                   `;
//           })}
//       </div> */} 
//     </div>
//   );
// }

// export default Cart;
