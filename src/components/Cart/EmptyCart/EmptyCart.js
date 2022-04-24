import { IoClose } from "react-icons/io5";
import { useDispatch} from "react-redux";
import {
  CLOSE_CART_SIDEBAR,
} from "../../../features/cartSlice";

const EmptyCart = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex text-right justify-end  text-3xl py-2 ">
        <IoClose
          className="cursor-pointer"
          onClick={() => {
            dispatch(CLOSE_CART_SIDEBAR());
          }}
        />
      </div>
      <p className="text-xl text-center mt-3 mb-5 ">GIỎ HÀNG CỦA BẠN TRỐNG</p>
      <div
        onClick={() => {
          dispatch(CLOSE_CART_SIDEBAR());
        }}
        className="max-w-[88%] rounded-sm cursor-pointer py-4 bg-black text-white  text-sm m-auto text-center"
      >
        TIẾP TỤC MUA SẮM
      </div>
    </div>
  );
};
export default EmptyCart;
