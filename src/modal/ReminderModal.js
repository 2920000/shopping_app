import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import OverlayModal from "./reuseModalStructure/OverlayModal";
import { CgDanger } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { addLocalStorage, getLocalStorage } from "../helper";
function ReminderModal() {
  const [visible, setVisivle] = useState(false);
  useEffect(() => {
    const allowPopUp = getLocalStorage("attention");
    if (!allowPopUp) {
      setVisivle(true);
      addLocalStorage("attention", true);
    }
  }, []);
  if (!visible) {
    return <></>;
  }
  return ReactDom.createPortal(
    <OverlayModal>
      <div className="min-w-[200px] relative max-w-[450px] py-3 px-2 border-l-[6px] border-yellow bg-white">
        <div className="flex">
          <div className="flex items-center">
            <span>
              {" "}
              <CgDanger className="text-5xl mr-2 text-yellow" />
            </span>
            <p className="text-sm">
              Truy cập website lần đầu tiên, sản phẩm phải đợi 10 đến 20 giây để
              được hiển thị, từ lần sau sẽ không phải đợn lâu nữa, hị vọng bạn
              có thể đợi để trải nghiệm website
            </p>
          </div>
          <span onClick={()=>setVisivle(false)}>
            <IoCloseCircleOutline className="cursor-pointer text-2xl" />
          </span>
        </div>
      </div>
    </OverlayModal>,
    document.getElementById("modal")
  );
}

export default ReminderModal;
