import React from "react";
import { Link, useParams } from "react-router-dom";
import { convertToVietnamese } from "../../../helper";
import MobileFilter from "./MobileFilter";
import SortOption from "./SortOption";

function CollectionHeader() {
  const { collection } = useParams();
  return (
    <div className="pt-10 mr-[12px]">
      <div className=" text-xs mb-5 mder:mb-0">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        <span className="mr-2">/</span>
        <span>{convertToVietnamese(collection)}</span>
      </div>
      <div className="flex w-full gap-[12px] mb-5 md:justify-end">
        <MobileFilter />
        <SortOption />
      </div>
    </div>
  );
}

export default CollectionHeader;
