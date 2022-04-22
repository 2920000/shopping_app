import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ className, number, onClick, flex='' }) => {
  return (
    <div className={`flex ${flex}  `}>
      {Array(5)
        .fill()
        .map((star, index) => (
          <div key={index} onClick={() => onClick(index)} className="relative">
            <AiOutlineStar
              className={`text-yellow ${className}`}
            />
            {index <= number && (
              <AiFillStar
                className={`absolute top-0  text-yellow ${className}`}
              />
            )}
          </div>
        ))}
    </div>
  );
};
export default StarRating;
