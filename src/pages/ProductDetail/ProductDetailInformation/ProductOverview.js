import { calculateStarsAverage } from "../../../helper";
import StarRating from "../../../modal/RatingModal/RatingModalMain/ProductReviews/StarRating";
import { useGetRatingQuery } from "../../../services/detailProductApi";

const ProductOverview = ({ productDetail }) => {
  const { data } = useGetRatingQuery(productDetail.slug);
  const starsAverage = calculateStarsAverage(data);
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span className="inline-block min-w-[60px]">{productDetail.brand}</span>
        {productDetail.sale > 0 && (
          <span className="bg-red text-white py-1.5 px-5 font-bold">Sale</span>
        )}
      </div>
      <h3 className="font-extrabold mb-2 text-[1.8rem]">
        {productDetail.title}
      </h3>
      {data && (
        <div className="flex gap-2">
          <StarRating number={starsAverage - 1} /> <span className="text-xs text-blue-700" >( {data.length} nhận xét )</span>
        </div>
      )}
    </>
  );
};

export default ProductOverview;
