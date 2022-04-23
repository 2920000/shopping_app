import React, { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { calculateSale, convertToPrice, qsa } from "../../helper";
import { Navigation } from "swiper";
import useHover from "../../hooks/useHover";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const ProductCart = ({
  product,
  className = "",
  cardInforCss = "",
  type = "",
}) => {
  const isSale = product.sale !== 0;
  const props = {
    product,
    isSale,
    cardInforCss,
    type,
  };

  return (
    <div className={`${className} transition-all duration-150 w-full h-full `}>
      <ProductImage {...props} />
      <ProductInfor {...props} />
    </div>
  );
};

export default memo(ProductCart);

const IsSale = ({ isSale }) => {
  if (!isSale) {
    return <></>;
  }
  return (
    <div
      id="sale"
      className="absolute z-20 bg-red text-white top-0 text-sm md:text-base py-[5px] px-[11px] md:py-[8px] md:px-[14px] cursor-text font-semibold md:font-bold "
    >
      Sale
    </div>
  );
};

const ProductImage = ({ product, isSale, type }) => {
  const subImageRef = useRef();
  const [hoverRef, hovered] = useHover();

  useEffect(() => {
    const loadImage = (element) => {
      const lazyWrapper = element.querySelector(".lazy-wrapper");
      const lazyImage = lazyWrapper.querySelector(".image");
      const url = lazyImage.getAttribute("lazy-src");
      // lazyIamge.style.backgroundImage = `url(${url})`;
      lazyImage.setAttribute("src", url);
      lazyWrapper.style.opacity = 1;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );
    const lazyImages = qsa(".image-wrapper");
    lazyImages.forEach((element) => {
      observer.observe(element);
    });
  }, []);

  useEffect(() => {
    if (hovered) {
      subImageRef.current.style.opacity = "1";
      return;
    }
    subImageRef.current.style.opacity = "0";
  });
  return (
    <div className="relative image-wrapper ">
      <div className=" top-0 z-[-10] w-full pt-[130%] bg-skeleton_color animate-skeleton"></div>
      <div className="lazy-wrapper absolute top-0 h-full w-full opacity-0">
        <IsSale isSale={isSale} />
        <div className="h-full " ref={hoverRef}>
          <Link className="h-full" to={`/products/${product.slug}`}>
            <img
              className="w-full  image h-full bg-cover "
              lazy-src={product.image}
              alt=""
            />{" "}
          </Link>
          <div
            ref={subImageRef}
            className="card hidden md:block absolute opacity-0 top-0 transition-all duration-300 w-full h-full"
          >
            {type === "collection" ? (
              <Swiper
                loop={true}
                modules={[Navigation]}
                spaceBetween={0}
                navigation={true}
                className="mySwiper"
              >
                {product.sub_image.map((subImage) => (
                  <SwiperSlide>
                    <Link
                      to={`/products/${product.slug}`}
                      className="block w-full"
                    >
                      <img
                        className=" absolute top-0 object-cover transition-all duration-300  w-full h-full "
                        src={subImage}
                        alt=""
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Link to={`/products/${product.slug}`} className="block w-full">
                <img
                  className=" absolute top-0 object-cover transition-all duration-300  w-full h-full "
                  src={product.sub_image[0]}
                  alt=""
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductInfor = ({ product, isSale, cardInforCss = "" }) => {
  return (
    <div className={cardInforCss}>
      <span className="block text-sm  font-semibold mt-2 px-1 text-left">
        {product.brand}
      </span>
      <div className="flex justify-between flex-col mder:flex-row text-[0.82rem] px-1 ">
        <span className="text-left">{product.title}</span>
        <span>
          {isSale && (
            <span className="whitespace-nowrap">
              {convertToPrice(calculateSale(product))} đ
            </span>
          )}
          <div
            className={`${
              isSale && " line-through right-[0.25rem] bottom-[-15px] "
            }`}
          >
            <span
              className={`whitespace-nowrap ${isSale && "text-light_grey"} `}
            >
              {convertToPrice(product.price)} đ
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};
