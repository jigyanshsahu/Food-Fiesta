import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Placeorder = () => {
  const navigate = useNavigate();
  const { getcarttotalamount, token, food_list, cartitem, url } =
    useContext(StoreContext);

  const [data, setdata] = useState({
    firstName: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const OnChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let Orderitem = [];

    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        Orderitem.push({ ...item, quantity: cartitem[item._id] });
      }
    });

    let orderData = {
      address: data,
      items: Orderitem,
      amount: getcarttotalamount() + 2,
    };

  let response = await axios.post(
  url + "/api/order/place",
  orderData,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);


    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getcarttotalamount() === 0) {
      navigate("/cart");
    }
  }, [token]);


  return (
    <form onSubmit={placeOrder} className="placeorder h-[90vh]">
      <div className="placeorder relative top-30 flex flex-col md:flex-row items-start justify-between gap-12 mt-24 px-4">
        {/* LEFT SIDE – FORM */}
        <div className="placeorderleft w-full md:w-[60%]">
          <p className="tittle text-2xl font-medium mb-3">
            Delivery Information
          </p>

          <div className="multifield flex gap-2">
            <input
              required
              name="firstName"
              value={data.firstName}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="First name"
            />

            <input
              required
              name="lastname"
              value={data.lastname}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            required
            name="email"
            value={data.email}
            onChange={OnChangehandler}
            className="m-2 w-full p-3 border"
            type="email"
            placeholder="Email address"
          />

          <input
            required
            name="street"
            value={data.street}
            onChange={OnChangehandler}
            className="m-2 w-full p-3 border"
            type="text"
            placeholder="Street"
          />

          <div className="multifield flex gap-2">
            <input
              required
              name="city"
              value={data.city}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="City"
            />

            <input
              required
              name="state"
              value={data.state}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="multifield flex gap-2">
            <input
              required
              name="zipcode"
              value={data.zipcode}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="Zip code"
            />

            <input
              required
              name="country"
              value={data.country}
              onChange={OnChangehandler}
              className="m-2 w-full p-3 border"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            name="phone"
            value={data.phone}
            onChange={OnChangehandler}
            className="m-2 w-full p-3 border"
            type="text"
            placeholder="Phone number"
          />
        </div>

        {/* RIGHT SIDE – CART TOTAL */}
        <div className="placeorderright w-full md:w-[40%]">
          <div className="cartotal flex flex-col gap-5 p-5 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-semibold">Cart Total</h2>

            <div className="cartotaldetail flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>₹{getcarttotalamount().toFixed(2)}</p>
            </div>

            <hr />

            <div className="cartotaldetail flex justify-between text-[#555]">
              <p>Delivery fee</p>
              <p>₹{getcarttotalamount() > 0 ? 2 : 0}</p>
            </div>

            <hr />

            <div className="cartotaldetail flex justify-between text-[#555]">
              <b>Total</b>
              <b>
                ₹
                {(
                  getcarttotalamount() + (getcarttotalamount() > 0 ? 2 : 0)
                ).toFixed(2)}
              </b>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white w-full p-3 rounded-md hover:bg-red-600 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
