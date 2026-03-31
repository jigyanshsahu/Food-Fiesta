import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setcartitem] = useState({});
  const [token, settoken] = useState("");
  const [food_list, setfood_list] = useState([]);
  const url = "https://newfoodbackend.onrender.com";

  // Load token from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) settoken(savedToken);
  }, []);

  // Fetch food list from API
  useEffect(() => {
    const fetchfoodList = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        setfood_list(response.data.data);
      } catch (error) {
        console.error("Failed to fetch food list:", error);
      }
    };
    fetchfoodList();
  }, []); // Run once on mount

  // Add item to cart
const addtocart = async (itemid) => {
  setcartitem((prev) => ({
    ...prev,
    [itemid]: (prev[itemid] || 0) + 1,
  }));

  // Send update to backend only if logged in
  if (token) {
    try {
      await axios.post(
        url + "/api/cart/add",
        { itemid },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }
};


  // Remove item from cart
  const removefromcart = (itemid) => {
    setcartitem((prev) => {
      const currentQty = prev[itemid];
      if (currentQty === 1) {
        const updated = { ...prev };
        delete updated[itemid];
        return updated;
      }
      return { ...prev, [itemid]: currentQty - 1 };
    });
  };

  // Get total cart amount
  const getcarttotalamount = () => {
    let totalamount = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        const iteminfo = food_list.find(
          (product) => product._id.toString() === item
        );
        if (iteminfo) totalamount += iteminfo.price * cartitem[item];
      }
    }
    return totalamount;
  };

  const contextValue = {
    food_list,
    cartitem,
    setcartitem,
    addtocart,
    removefromcart,
    getcarttotalamount,
    url,
    token,
    settoken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
