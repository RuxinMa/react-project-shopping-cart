import React from 'react';
import { ChevronDown, ChevronUp } from '../icons';
import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({id, img, title, price, amount}) => {
  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button 
          className='remove-btn'
          onClick={() => dispatch(removeItem(id))} // Pass id as payload
        >
          remove
        </button>
      </div>
      <div>
        <button 
          className='amount-btn'
          onClick={() => dispatch(increase({ id }))} // Pass id: id (object) as payload
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button 
          className='amount-btn'
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id))
              return; // 下面的程序不再运行
            }
            dispatch(decrease({ id }))
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
