import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // const url = `${import.meta.env.FOODAPP_API_URL}`;
  const url = `${import.meta.env.VITE_FOODAPP_API_URL}`;

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');

  const [food_list, setFood_list] = useState([]);

  const addToCart = async function (itemId) {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(`${url}/api/v1/cart/add`, { itemId }, { headers: { token } })
    }
  };

  const removeFromCart = async function (itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(`${url}/api/v1/cart/remove`, { itemId }, { headers: { token } })
    }
  };

  const getTotalCartAmt = function () {
    let totalAmt = 0;

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        // find the product object for this ID
        const itemInfo = food_list.find(p => p._id === itemId);
        if (!itemInfo) continue;                  // guard if not found
        totalAmt += itemInfo.price * quantity;    // use itemInfo.price
      }
    }

    return totalAmt;
  };

  const fetchFoodList = async function () {
    const response = await axios.get(`${url}api/v1/food/list`);
    setFood_list(response.data.data)
  };

  const loadCartData = async function (token) {
    const response = await axios.post(`${url}/api/v1/cart/get`, {}, { headers: { token } });

    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        await loadCartData(localStorage.getItem('token'));
      };
    }
    loadData();
  }, [])


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmt,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
