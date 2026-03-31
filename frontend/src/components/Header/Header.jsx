import React from "react";
import "./header.css";
const Header = () => {
  return (
    <div className="header fade-in relative ">
      
      <div className="header-content absolute flex flex-col  items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]  h-60">
        <h1
          className="  font-extrabold  fade-in
 font-serif relative    bottom-[153px]  pl-5 pb-[5px] w-full h-full text-[3.25rem] text-white [text-shadow:_3px_0_black,_-2px_0_black,_0_2px_black,_0_-2px_black]"
        >
          Order Your food From Here
        </h1>
      <p className="qwerty pt-2 fade-in  text-white pl-[15px] pb-10 rounded-4xl relative bottom-57 left-4   bg-black text-3xl h-10 w-[80%]">

          food That Moves With You.
        </p>
        <button  onClick={()=>{ window.scrollTo({ top:635, behavior: "smooth" });}} className="relative left- fade-in  bg-white w-35  h-17 border border-gray-600 text-gray-500 px-4 py-2 rounded-4xl cursor-pointer">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
