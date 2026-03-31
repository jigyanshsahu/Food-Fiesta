import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartitem, food_list, removefromcart, getcarttotalamount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="mt-24 w-[90%] mx-auto">
      {/* CART TABLE */}
      <div className="w-full">
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] py-3 text-gray-600 text-lg border-b">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {food_list.map((item) => {
          if (cartitem[item._id] > 0) {
            return (
              <div key={item._id} className="border-b py-4">
                <div className="grid items-center grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]">
                  {/* IMAGE */}
                  <img
                    src={url + "/Images/" + item.Image}
                    className="h-24 w-24 object-cover rounded-md"
                    alt=""
                  />

                  {/* TITLE */}
                  <p className="text-lg">{item.name}</p>

                  {/* PRICE */}
                  <p className="text-lg">₹{item.price}</p>

                  {/* QUANTITY */}
                  <p className="text-lg">{cartitem[item._id]}</p>

                  {/* TOTAL */}
                  <p className="text-lg">
                    ₹{item.price * cartitem[item._id]}
                  </p>

                  {/* REMOVE */}
                  <p
                    onClick={() => removefromcart(item._id)}
                    className="text-xl cursor-pointer text-red-600"
                  >
                    x
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-16 flex flex-col md:flex-row justify-between gap-10">
        {/* LEFT: CART TOTAL */}
        <div className="flex-1 border p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-5">Cart Totals</h2>

          <div className="flex justify-between text-gray-700 mb-3">
            <p>Subtotal</p>
            <p>₹{getcarttotalamount().toFixed(2)}</p>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-1"></div>

          <div className="flex justify-between text-gray-700 mb-3">
            <p>Delivery Fee</p>
            <p>₹{getcarttotalamount() > 0 ? 2 : 0}</p>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-1"></div>

          <div className="flex justify-between text-black font-bold text-xl mt-2">
            <p>Total</p>
            <p>
              ₹
              {(
                getcarttotalamount() + (getcarttotalamount() > 0 ? 2 : 0)
              ).toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => navigate("/Order")}
            className="mt-6 bg-[#ff5733] text-white px-6 py-3 rounded-md hover:bg-[#e04522] transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* RIGHT: PROMO CODE */}
        <div className="flex-1 border p-6 rounded-xl shadow">
          <p className="text-gray-600">If you have a promo code, Enter it here</p>

          <div className="flex items-center mt-4 bg-gray-200 rounded-lg">
            <input
              type="text"
              placeholder="promo code"
              className="flex-1 p-3 bg-transparent outline-none"
            />
            <button className="bg-black text-white px-5 py-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
