import React from "react";

const Colors = ({ colors,deleteColor }) => {
  return (
    <div>
      {colors.length > 0 && <h1 className="right-heading">colors list</h1>}
      {colors.length > 0 && (
        <div className="flex flex-wrap -mx-1">
          {colors.map((clr) => (
            <div className="p-1" key={clr.id}>
              <div
              onClick={()=>deleteColor(clr)}
                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                style={{ background: clr.color }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Colors;
