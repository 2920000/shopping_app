import React from "react";
import { Link, useParams } from "react-router-dom";
import { convertToVietnamese } from "../../../helper";
import MobileFilter from "./MobileFilter";
import SortOption from "./SortOption";

function CollectionHeader() {
  const { collection } = useParams();
  return (
    <div className="pt-10 mr-[12px]">
      <div className=" text-xs mb-2">
        <Link to="/" className="mr-2">
          Trang chủ
        </Link>
        <span className="mr-2">/</span>
        <span>{convertToVietnamese(collection)}</span>
      </div>
      <div className="flex justify-between mder:justify-end w-full text-right mb-2 ">
        <MobileFilter />
        <SortOption />
      </div>
    </div>
  );
}

export default CollectionHeader;
