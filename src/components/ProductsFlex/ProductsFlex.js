import React from "react";

function ProductsFlex({ children,className }) {
  return <div className={`${className} flex flex-wrap  `}>{children}</div>;
}

export default ProductsFlex;
