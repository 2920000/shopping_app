import React, { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../features/accountSlice";
import {
  isRatingModalOpeningSelector,
  OPEN_RATING_MODAL,
  toggleUpdateSelector,
} from "../../features/ratingSlice";

import { useGetOrderedQuery } from "../../services/orderedApi";
import { AiOutlineDropbox } from "react-icons/ai";
import Button from "../../components/Button/Button";
import RatingModal from "../../modal/RatingModal";
import { calculateSale, convertToPrice } from "../../helper";
import Loading from "../../components/Loading";

function Purchased() {
  const user = useSelector(userSelector);
  let { data, isLoading, refetch, isError } = useGetOrderedQuery(user?._id);
  const isRatingModalOpening = useSelector(isRatingModalOpeningSelector);
  const toggleUpdate = useSelector(toggleUpdateSelector);
  const [orderInfor, setOrderInfor] = useState({});

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refetch();
  }, [toggleUpdate]);

  if (isError) {
    return <>Something wrong</>;
  }
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-[600px] w-full bg-white text-lg">
        <Loading />
      </div>
    );
  }

  if (data.orders.length === 0 || !data) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center min-h-[600px] w-full bg-white text-lg">
        <AiOutlineDropbox className="text-5xl" />
        Chưa có đơn hàng
      </div>
    );
  }

  return (
    <div className="min-h-[600px]">
      {data.orders.map((order, index) => (
        <div key={index} className="bg-white relative w-full  mb-4 p-2 md:p-7 ">
          <div className="flex justify-between items-center w-full relative  py-3 border-b border-border">
            <div className="flex w-full">
              <div className=" mder:w-[120px] w-[80px] px-2 border border-border">
                <Link to={`/products/${order.slug}`}>
                  <img className="w-full" src={order.image} alt="" />
                </Link>
              </div>
              <div className="flex text-sm md:text-base flex-col flex-grow w-[calc(100%-100px)] ml-5">
                <span className="whitespace-nowrap md:whitespace-normal text-ellipsis overflow-hidden">
                  {order.title}
                </span>
                <span className="text-sm">Size: {order.size}</span>
                <span className="text-sm">Số lượng: {order.amount}</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 md:relative text-sm whitespace-nowrap ">
              <span
                className={
                  order.sale > 0
                    ? "line-through text-light_grey inline-block mr-2"
                    : ""
                }
              >
                {convertToPrice(order.price)}đ
              </span>
              <span>
                {order.sale > 0 &&
                  convertToPrice(calculateSale(order) / order.amount) + "đ"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-right my-3 md:my-6 flex items-center justify-end ">
              <p className=" inline text-sm mr-2">Tổng số tiền:</p>
              <span className=" text-sm md:text-xl lg:text-2xl">
                {convertToPrice(calculateSale(order))}đ
              </span>
            </div>
          </div>
          <div className="text-right">
            <ReviewOrRatingButton
              data={data}
              order={order}
              setOrderInfor={setOrderInfor}
            />
          </div>
        </div>
      ))}
      {isRatingModalOpening && <RatingModal orderInfor={orderInfor} />}
    </div>
  );
}

export default Purchased;

const formatDate = (date) => {
  let newDate = date.slice(0, 10);
  let dateNumberArray = newDate.split("-");
  let day = Number(dateNumberArray[1]) + 3;
  let month = dateNumberArray[2];
  let year = dateNumberArray[0];

  return `${day}-${month}-${year}`;
};

const ReviewOrRatingButton = ({ data, order, setOrderInfor }) => {
  const dispatch = useDispatch();

  const productRatings = data.productRatings;
  const isProductRatingExisting = productRatings.some(
    (productRating) => productRating._id === order._id
  );

  const handleShowRatingModal = (order) => {
    dispatch(OPEN_RATING_MODAL());
    setOrderInfor(order);
  };

  if (isProductRatingExisting) {
    return (
      <Button variant="third" onClick={() => handleShowRatingModal(order)}>
        Xem đánh giá
      </Button>
    );
  }
  return (
    <Button
      variant="primary"
      className="min-w-[130px] rounded-sm hover:opacity-80 "
      onClick={() => handleShowRatingModal(order)}
    >
      Đánh giá
    </Button>
  );
};
