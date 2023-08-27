"use client";
const Filter = (props) => {
  return (
    <>
      <div className="w-[20%] h-[97.5%] bg-white">
        <div className="w-full h-[7%] border-b-2 border-[#f1f3f6] flex justify-between items-center pl-2 pr-2">
          <div className="text-xl text-black">Filters</div>
          <div
            className="text-[#2574f0] cursor-pointer"
            onClick={() => {
              props.setFilter({});
              document.querySelector('input[name="gender"]:checked').checked = false;
              document.querySelector('input[name="category"]:checked').checked = false;
              document.querySelector('input[name="usage"]:checked').checked = false;
            }}
          >
            Clear All
          </div>
        </div>
        <div className="w-full h-fit border-b-2 border-[#f1f3f6] pl-2 text-black">
          <label for="gender">Gender</label>
          <div>
            <input id="Men" type="radio" name="gender" value="Men" onChange={(e) =>{props.setFilter({ ...props.filter, gender: "Men" })}}/>
            <label for="Men" className="pl-2">
              Men
            </label>
          </div>
          <div>
            <input id="Women" type="radio" name="gender" value="Women" onChange={(e) =>{props.setFilter({ ...props.filter, gender: "Women" })}}/>
            <label for="Women" className="pl-2">
              Women
            </label>
          </div>
          <div>
            <input id="Unisex" type="radio" name="gender" value="Unisex" onChange={(e) =>{props.setFilter({ ...props.filter, gender: "Unisex" })}}/>
            <label for="Unisex" className="pl-2">
              Unisex
            </label>
          </div>
        </div>
        <div className="w-full h-fit border-b-2 border-[#f1f3f6] pl-2 text-black">
            <label for="category">Category</label>
            <div>
                <input id="Apparel" type="radio" name="category" value="Apparel" onChange={(e)=>props.setFilter({...props.filter, masterCategory: "Apparel"})} />
                <label for="Apparel" className="pl-2">Apparel</label>
            </div>
            <div>
                <input id="Accessories" type="radio" name="category" value="Accessories" onChange={(e)=>props.setFilter({...props.filter, masterCategory: "Accessories"})} />
                <label for="Accessories" className="pl-2">Accessories</label>
            </div>
            <div>
                <input id="Footwear" type="radio" name="category" value="Footwear" onChange={(e)=>props.setFilter({...props.filter, masterCategory: "Footwear"})} />
                <label for="Footwear" className="pl-2">Footwear</label>
            </div>
            <div>
                <input id="Personal-Care" type="radio" name="category" value="Personal Care" onChange={(e)=>props.setFilter({...props.filter, masterCategory: "Personal Care"})} />
                <label for="Personal-Care" className="pl-2">Personal Care</label>
            </div>
            <div>
                <input id="Free-Items" type="radio" name="category" value="Free Items" onChange={(e)=>props.setFilter({...props.filter, masterCategory: "Free Items"})} />
                <label for="Free-Items" className="pl-2">Free Items</label>
            </div>
        </div>
        <div className="w-full h-fit border-b-2 border-[#f1f3f6] pl-2 text-black">
            <label for="usage">Occasion</label>
            <div>
                <input id="Casual" type="radio" name="usage" value="Casual" onChange={(e)=>props.setFilter({...props.filter, usage: "Casual"})} />
                <label for="Casual" className="pl-2">Casual</label>
            </div>
            <div>
                <input id="Sports" type="radio" name="usage" value="Sports" onChange={(e)=>props.setFilter({...props.filter, usage: "Sports"})} />
                <label for="Sports" className="pl-2">Sports</label>
            </div>
            <div>
                <input id="Ethnic" type="radio" name="usage" value="Ethnic" onChange={(e)=>props.setFilter({...props.filter, usage: "Ethnic"})} />
                <label for="Ethnic" className="pl-2">Ethnic</label>
            </div>
            <div>
                <input id="Formal" type="radio" name="usage" value="Formal" onChange={(e)=>props.setFilter({...props.filter, usage: "Formal"})} />
                <label for="Formal" className="pl-2">Formal</label>
            </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
