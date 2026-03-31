      import React, { useContext, } from 'react'
      import { assets } from '../../assets/assets'
      import './fooditem.css'
  import { StoreContext } from '../../context/Storecontext'
      const fooditem = ({id,name,price,description,Image}) => {
      
        const{ cartitem,addtocart,removefromcart } = useContext(StoreContext);
        return (
          <div className='fooditem'>
            <div className="fooditemImagecontainer relative">
              <img  className='fooditemImage ' src={Image} alt="" />
          {
    !cartitem[id] ? (
      <img
        className="add absolute w-9 cursor-pointer rounded-full bottom-4 right-4"
        onClick={() => addtocart(id)}
        src={assets.add}
        alt=""
      />
    ) : (
      <div className="fooditemcounter absolute bottom-4 right-4 flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow">
        <img
          onClick={() => removefromcart(id)}
          className="w-5 cursor-pointer"
          src={assets.minusred}
          alt=""
        />
        <p className="text-lg">{cartitem[id]}</p>
        <img
          onClick={() => addtocart(id)}
          className="w-5 cursor-pointer"
          src={assets.plusgreen}
          alt=""
        />
      </div>
    )
  }

            </div>
            <div className='food-item-info p-5 '>
            
              <p className='text-2xl'>{name}</p>
              <p className='fooditemdesc text-[#676767]'>{description}</p>
              <p className='food-itemprice text-2xl text-red-500'>₹{price}</p>   
            </div>
          </div>
        )
      }
      
      export default fooditem
      