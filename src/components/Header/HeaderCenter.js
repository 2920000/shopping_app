import { Link, useLocation } from "react-router-dom";
import image from "../../assets/image/logo.png";

const HeaderCenter = () => {
    const pathParams = useLocation().pathname;
  
    return (
      <div
        style={pathParams === "/checkout" ? { display: "block" } : {}}
        className="flex grow justify-center  max-w-[33.33%]"
      >
        <Link to="/" className="flex items-center">
          <img
            src={image}
            alt=""
            className="w-[45px] lg:w-[50px]  cursor-pointer "
          />
          {pathParams === "/checkout" && (
            <p className="ml-4 flex whitespace-nowrap items-center border-l border-black pl-4 min-h-[30px] text-lg">
              Thanh Toán
            </p>
          )}
        </Link>
      </div>
    );
  };
  export default HeaderCenter
  