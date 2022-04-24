import { MdOutlinePlace } from "react-icons/md";
import { useSelector } from "react-redux";
import { shippingAddressSelector} from "../../features/userSlice";

const ShippingAddress = () => {
  const shippingInfor = useSelector(shippingAddressSelector);
 console.log(shippingInfor)
  return (
    <div className=" bg-white my-3 pt-6 pb-5 px-2 md:px-8 gap-2">
      <div className="flex items-center text-xl mb-2">
        <MdOutlinePlace className="text-xl" /> Địa chỉ giao hàng
      </div>
      {shippingInfor && (
        <div>
          <div className="block md:inline-block font-bold  mr-4">
            <span className="mr-1">{shippingInfor?.fullName}</span>
            <span>
              {shippingInfor.phoneNumber && "(+84)"} {shippingInfor.phoneNumber}
            </span>
          </div>
          <span>{shippingInfor.address}</span>
        </div>
      )}
    </div>
  );
};
export default ShippingAddress;
