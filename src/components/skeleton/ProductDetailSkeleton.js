import React, { useCallback, useRef, useState } from "react";
import { qsa,qs } from "../../helper";
import useResizeObserver from "../../hooks/useResizeObserver";
import Skeleton from "./Skeleton";

function ProductDetailSkeleton() {
  const [changeSkeleton,setChangeSkeleton]=useState(false)
  const bodyRef=useRef(qs('body'))
  const savedCallback=useCallback(()=>{
   if(window.innerWidth<800){
    setChangeSkeleton(true)
   }else{
     setChangeSkeleton(false)
   }
  },[])
  useResizeObserver(bodyRef,savedCallback)
  return (
    <div className="max-w-[1350px] px-2 lg:px-10 m-auto pt-[20px]">
      <div className="flex flex-col lg:flex-row mt-10">
        <div className=" w-full  lg:w-[65%] mr-20">
          <Skeleton
            type="image"
            number={changeSkeleton?1:4}
            tailwindCss="lg:grid lg:gap-3 lg:grid-cols-2"
            style={{ paddingTop: "120%" }}
          />
        </div>
        <div className="w-full mt-14 lg:mt-0 lg:w-[35%]">
          <div>
            <Skeleton type="text" style={{ maxWidth: "200px" }} />
            <Skeleton type="title" style={{ maxWidth: "400px" }} />
            <Skeleton
              type="price"
              style={{ maxWidth: "100px", maxHeight: "25px" }}
            />
            <Skeleton
              type="size"
              number={4}
              tailwindCss="flex"
              style={{ maxWidth: "45px", minHeight: "45px" }}
            />
            <Skeleton type="button" style={{ maxWidth: "300px" }} />
            <Skeleton type="text" style={{ maxWidth: "170px" }} />
            <Skeleton type="text" number={4} style={{ maxWidth: "250px" }} />

            {/* <Skeleton type="text" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
