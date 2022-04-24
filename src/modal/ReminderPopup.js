import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import OverlayModal from "./reuseModalStructure/OverlayModal";
import { CgDanger } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { addLocalStorage, getLocalStorage } from "../helper";
function ReminderPopup() {
  const [visible, setVisivle] = useState(false);
  const attentionRef = useRef();
  useEffect(() => {
    const allowPopUp = getLocalStorage("attention");
    if (!allowPopUp) {
      setVisivle(true);
      addLocalStorage("attention", true);
    }
  }, []);

  useEffect(() => {
    visible && (attentionRef.current.style.opacity = "1");
  }, [visible]);

  if (!visible) {
    return <></>;
  }

  return ReactDom.createPortal(
    <OverlayModal>
      <div
        ref={attentionRef}
        className="min-w-[200px] opacity-0  transition-all duration-1000 relative max-w-[470px] py-3 px-2 border-l-[6px] border-yellow bg-white"
      >
        <div className="flex">
          <div className="flex items-center">
            <span>
              {" "}
              <CgDanger className="text-5xl mr-2 text-yellow" />
            </span>
            <p className="text-sm">
              Do dùng dyno miễn phí trên heroku, nên api phải khởi tạo tầm 10
              đến 20 giây cho lần đầu, từ lần sau sẽ không bị nữa, hị vọng anh
              chị có thể đợi để trải nghiệm website
              <p className="text-center">
                -Vấn đề api sẽ được cải thiện trong tương lai-
              </p>
            </p>
          </div>
          <span onClick={() => setVisivle(false)}>
            <IoCloseCircleOutline className="cursor-pointer ml-1 text-2xl" />
          </span>
        </div>
      </div>
    </OverlayModal>,
    document.getElementById("modal")
  );
}

export default ReminderPopup;
