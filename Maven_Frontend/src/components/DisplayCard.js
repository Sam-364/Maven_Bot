import Link from "next/link";
import React from "react";

const DisplayCard = (props) => {
  var link = `product/${props.data.id}`;
  return (
    <div className="w-[24%] h-1/2 flex flex-col justify-evenly items-center text-black hover:shadow-sm hover:shadow-black transition-all">
      <Link href={link} className="w-full h-full">
        <img src={props.data.link} className="w-full h-[80%]"/>
        <div className="w-full h-[10%] text-sm">
            {props.data.productDisplayName}
        </div>
        <div className="w-full h-[10%] text-sm text-black">
            Rs 5000
        </div>
      </Link>
    </div>
  );
};

export default DisplayCard;
