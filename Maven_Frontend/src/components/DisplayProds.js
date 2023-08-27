import React from "react";
import DisplayCard from "./DisplayCard";

const DisplayProds = (props) => {
  return (
    <div className="w-[78%] h-[97.5%] bg-white">
      <div className="w-full h-full flex flex-row flex-wrap justify-evenly items-center overflow-y-scroll">
        {props.pageData.map((p) => {
          return (
            <>
              <DisplayCard data={p} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayProds;
