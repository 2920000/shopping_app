import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import Pagination from "./Pagination";
import {
  fetchByCollection,
  isLoadingSelector,
  productsCollectionSelector,
  productsNumberTotalSelector,
} from "../../../../features/collectionSlice";
import CollectionSkeleton from "../../../../components/skeleton/CollectionSkeleton";
import ProductsFlex from "../../../../components/ProductsFlex/ProductsFlex";
import { ProductCard } from "../../../../components";
import NotFoundProduct from "./NotFoundProduct";

function FilterProducts() {
  const dispatch = useDispatch();
  const { collection } = useParams();
  const productsNumberTotal = useSelector(productsNumberTotalSelector);
  const products = useSelector(productsCollectionSelector);
  const isLoading = useSelector(isLoadingSelector);
  const queryStr = useLocation().search;
  const queryObject = queryString.parse(queryStr);
  let page = queryObject.page || 1;

  const payload = {
    pathParams: {
      collection,
    },
    queryParams: {
      ...queryObject,
      page,
    },
  };

  useEffect(() => {
    dispatch(fetchByCollection(payload));
  }, [collection, queryStr]);

  useEffect(() => {
    return () => {
      dispatch(fetchByCollection({}));
    };
  }, []);

  if (isLoading || !products) {
    return <CollectionSkeleton />;
  }
  // if(products.length===0){
  //   return <NotFoundProduct/>
  // }
  return (
    <div className="w-full">
      <ProductsFlex >
        {products?.map((product, index) => (
          <ProductCard
            type="collection"
            key={index}
            product={product}
            className=" mb-5  w-[calc(50%-12px)] lg:w-[calc(33.33%-12px)] lger:w-[calc(25%-12px)] mr-[12px] "
          />
        ))}
      </ProductsFlex>
      <Pagination productsNumberTotal={productsNumberTotal} />
    </div>
  );
}

export default FilterProducts;
