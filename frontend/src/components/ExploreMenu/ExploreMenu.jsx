import React from 'react'
import './ExploreMenu.css'
import { menu_list} from '../../assets/assets'
const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='exploremenu gap-5' id='exploremenu'>
        <h1 className='abc font-medium'>Explore our menu </h1>
            <p className='explore-menu-text mt-2.5'>Explore our menu and indulge in the dish that tempts you the most.</p>  
            <div className="explore-menu-list  ">
                {menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"all":item.menu_name)} key={index} className='explore-menu-list-item '>
                            <img className={category===item.menu_name?"active":""} src={item.menu_Image} alt="" />
                            <p>{item.menu_name}</p>
                            </div>
                            
                    )
                })}
                </div>  
                  
                <hr />
    </div>
  )
}

export default Exploremenu
