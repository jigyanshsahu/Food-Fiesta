import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {


  const [Image, setImage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(prev => ({ ...prev, [name]: value }));
  };

 const onsubmithandler = async (event) => {
  event.preventDefault();

  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("description", data.description);
  formdata.append("price", Number(data.price));
  formdata.append("Image", Image);   // ✅ Corrected

  const response = await axios.post(`${url}/api/food/add`, formdata);

  if (response.data.success) {
    setdata({
      name: "",
      description: "",
      price: "",
    });
    setImage(false);
    toast.success(response.data.message);
  }
  else{
    toast.error(response.data.message)
  }
};
  return (
    <div className="add p-6 w-full flex justify-center">
      <form onSubmit={onsubmithandler} className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg">Upload Image</p>

          <label
            htmlFor="Image"
            className="cursor-pointer border-2 border-dashed rounded-xl flex justify-center items-center h-48 hover:bg-gray-50 transition"
          >
            <img
              className="h-40 object-contain opacity-70"
              src={Image ? URL.createObjectURL(Image) : assets.ori}
              alt=""
            />
          </label>

          <input 
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="Image"
            hidden
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Product Name</p>
          <input
            onChange={onchangehandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here..."
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Product Description</p>
          <textarea
            onChange={onchangehandler}
            value={data.description}
            name="description"
            rows="5"
            placeholder="Write product details..."
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Product Price</p>
          <input
            onChange={onchangehandler}
            value={data.price}
            type="number"
            name="price"
            placeholder="$20"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;


