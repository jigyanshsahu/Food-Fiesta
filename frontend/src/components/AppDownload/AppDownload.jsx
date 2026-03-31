import React from "react";
import { assets } from "../../assets/assets";
import './appdownlad.css'
const appdownload = () => {
  return (
    <div
      className="appdownload relative m-auto_auto mt-[100px] top-8 items-center text-center"
      id="appdownload"
    >
      <p className=" text-6xl mt-2.5">
        For A Better Experience Download <br /> Flavor Fiesta App
      </p>
      <div className="appdownloadplatform h-50    relative bottom-10    left-[450px] flex">
        <img className="one" src={assets.pla} height={270} width={200} alt="" />
        <img className="two" src={assets.aplo} height={240} width={190} alt="    " />   
      </div>
    </div>
  );
};

export default appdownload;
