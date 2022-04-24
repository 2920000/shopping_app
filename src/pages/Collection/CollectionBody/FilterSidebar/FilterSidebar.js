import React from "react";
import { useSelector } from "react-redux";
import {
  existingBrandSelector,
  existingColourSelector,
  existingPriceSelector,
  existingSizeSelector,
} from "../../../../features/collectionSlice";
import FilterOption from "./FilterOption";
import RefineBy from "./RefineBy/RefineBy";

function FilterSidebar() {
  const existingBrand = useSelector(existingBrandSelector);
  const existingColour = useSelector(existingColourSelector);
  const existingSize=useSelector(existingSizeSelector)
  const existingPrice=useSelector(existingPriceSelector)

  const productFilter = [
    {
      title: "Thương hiệu",
      selection: existingBrand,
      name: "brand",
    },
    {
      title: "Kích thước",
      selection: existingSize,
      name: "size",
    },
    {
      title: "Màu sắc",
      selection: existingColour,
      name: "color",
    },
    {
      title: "Giá",
      selection: existingPrice,
      name: "price",
    },
  ];
  return (
    <div className="w-[30%] hidden mder:block mr-10">
      <RefineBy />
      {productFilter.map((filter, index) => (
        <FilterOption
          key={index}
          title={filter.title}
          selection={filter.selection}
          name={filter.name}
        />
      ))}
    </div>
  );
}

export default FilterSidebar;
