import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import RefineItem from "./RefineItem";
import queryString from "query-string";

const RefineBy = () => {
  const navigate = useNavigate();
  const { collection } = useParams();
  const queryUrl = useLocation().search?.slice(1);

  const arrayParams = filterParamsUrlArray();

  const allCheckBoxes = document.querySelectorAll("[type]");

  const filterOptionTitleProps = {
    allCheckBoxes,
    collection,
    navigate,
  };

  useEffect(() => {
    if (!queryUrl) {
      allCheckBoxes.forEach((e) => (e.checked = false));
    }
  }, [queryUrl]);
  console.log(arrayParams);
  return (
    <>
      {arrayParams.length > 0 && (
        <div className="pb-8 pt-[30px] border-b border-border_bottom_filter">
          <FilterOptionTitle {...filterOptionTitleProps} />
          <RefineGroup arrayParams={arrayParams} />
        </div>
      )}
    </>
  );
};

export default RefineBy;

const FilterOptionTitle = ({ allCheckBoxes, collection, navigate }) => {
  const hanldeDeleteAllChoices = () => {
    navigate(`/collection/${collection}`);
    allCheckBoxes.forEach((e) => (e.checked = false));
  };
  return (
    <div className="flex justify-between mb-5 ">
      <span className="font-bold text-sm">LỰA CHỌN</span>
      <span
        onClick={hanldeDeleteAllChoices}
        className="text-xs font-semibold text-light_grey cursor-pointer"
      >
        Xóa Tất Cả
      </span>
    </div>
  );
};

const RefineGroup = ({ arrayParams }) => {
  const { collection } = useParams();
  return (
    <>
      {arrayParams.map((param) => {
        return (
          <li className="list-none">
            <RefineItem
              value={param[Object.keys(param)[0]]}
              keySelected={Object.keys(param)[0]}
              collection={collection}
            />
          </li>
        );
      })}
    </>
  );
};

const filterParamsUrlArray = () => {
  let refineByArray = [];
  const paramsUrlObject = queryString.parse(window.location.search);
  delete paramsUrlObject.sort;
  delete paramsUrlObject.page;
  delete paramsUrlObject.price;
  const newSearchString = queryString.stringify(paramsUrlObject);
  const searchUrl = new URLSearchParams(newSearchString);
  for (let pair of searchUrl.entries()) {
    refineByArray.push({ [pair[0]]: pair[1] });
  }
  return refineByArray;
};
