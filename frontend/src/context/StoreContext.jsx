import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { default_food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setcartitem] = useState({});
  const [token, settoken] = useState("");
  const [food_list, setfood_list] = useState(default_food_list);
  const [foodLoading, setFoodLoading] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Load token from localStorage on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) settoken(savedToken);
  }, []);

  // Load cart from backend whenever token is available
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        if (res.data.success) setcartitem(res.data.cartData || {});
      } catch (err) {
        console.error("Failed to load cart:", err);
      }
    };
    if (token) loadCart();
  }, [token, url]);

  // Fetch food list from API with fallback to rich default_food_list
  useEffect(() => {
    const fetchfoodList = async () => {
      try {
        setFoodLoading(true);
        const response = await axios.get(`${url}/api/food/list`);
        const apiData = response.data.data;
        if (apiData && apiData.length > 0) {
          // Merge API data with default items so every category has plenty of dishes
          const existingIds = new Set(apiData.map(item => item.name));
          const supplementary = default_food_list.filter(item => !existingIds.has(item.name));
          setfood_list([...apiData, ...supplementary]);
        } else {
          setfood_list(default_food_list);
        }
      } catch (error) {
        console.error("Failed to fetch food list from backend, using default list:", error);
        setfood_list(default_food_list);
      } finally {
        setFoodLoading(false);
      }
    };
    fetchfoodList();
  }, [url]);

  // Add item to cart + opens drawer for seamless feedback
  const addtocart = async (itemid, autoOpenDrawer = false) => {
    setcartitem((prev) => ({
      ...prev,
      [itemid]: (prev[itemid] || 0) + 1,
    }));

    if (autoOpenDrawer) {
      setIsCartDrawerOpen(true);
    }

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemid }, { headers: { token } });
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  // Remove item from cart — syncs to backend
  const removefromcart = async (itemid) => {
    setcartitem((prev) => {
      const currentQty = prev[itemid];
      if (currentQty === 1) {
        const updated = { ...prev };
        delete updated[itemid];
        return updated;
      }
      return { ...prev, [itemid]: currentQty - 1 };
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemid }, { headers: { token } });
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  // Get total cart amount
  const getcarttotalamount = () => {
    let totalamount = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        const iteminfo = (food_list || []).find(
          (product) => product._id.toString() === item.toString()
        );
        if (iteminfo) totalamount += iteminfo.price * cartitem[item];
      }
    }
    return totalamount;
  };

  const contextValue = {
    food_list,
    foodLoading,
    cartitem,
    setcartitem,
    addtocart,
    removefromcart,
    getcarttotalamount,
    url,
    token,
    settoken,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
