import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify";

const List = ({url}) => {
 
  const [list, setlist] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setlist(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };
  const removefood = async(foodId) =>{
        const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchlist();

}

  useEffect(() => {
    fetchlist();  
  }, []);

 return (
  <div className="list add flex-col p-6">

    <h2 className="text-3xl font-semibold mb-8 tracking-wide text-center">
      All food Items
    </h2>

    <div className="listtable w-full bg-white shadow-lg rounded-xl overflow-hidden">

      {/* Header */}
      <div className="listtableformattitle grid grid-cols-4 bg-gray-100 px-6 py-4 
                      text-lg font-semibold text-gray-700 border-b text-center">
        <span>Image</span>
        <span>Name</span>
        <span>Price</span>
        <span>Action</span>
      </div>

      {/* Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="listtableformat grid grid-cols-4 items-center text-center 
                     px-6 py-5 border-b hover:bg-gray-50 transition-all duration-200"
        >
          {/* Larger Image */}
          <div className="flex justify-center">
            <img
              src={`${url}/Images/${item.Image}`}
              alt={item.name}
              className="h-20 w-20 object-cover rounded-lg border shadow"
            />
          </div>

          {/* Larger Text */}
          <p className="font-semibold text-xl text-gray-800">{item.name}</p>

          <p className="text-green-600 text-xl font-bold">${item.price}</p>

          <p onClick={()=>removefood(item._id)} className="text-red-500 hover:cursor-pointer text-3xl font-bold hover:text-red-700 transition">
            ×
          </p>
        </div>
      ))}

    </div>
  </div>
);

};

export default List;
