import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";

function Pagination({ productsNumberTotal = 0 }) {
  const pageTotal = Math.ceil(productsNumberTotal / 6);
  const searchUrl = new URLSearchParams(window.location.search);
  const currentPage = Number(searchUrl.get("page")) || 1;

  return (
    <div className="flex flex-col mder:flex-row justify-between items-center w-full py-2.5 mt-10 mb-14 border-y border-light_grey">
      <span className="font-bold text-light_grey mb-10">
        {productsNumberTotal} sản phẩm
      </span>
      {pageTotal !== 1 && (
        <>
          <ul className="flex ">
            {currentPage !== 1 && <PaginationPre />}
            <PaginationNumber pageTotal={pageTotal} currentPage={currentPage} />
            {currentPage !== pageTotal && <PaginationNext />}
          </ul>
        </>
      )}
    </div>
  );
}

export default Pagination;

const PaginationPre = () => {
  return (
    <>
      <PaginateLink to={handleNavigateToPage({ type: "prevPage" })}>
        <GrFormPrevious className="text-3xl " />
      </PaginateLink>
    </>
  );
};
const PaginationNumber = ({ pageTotal, currentPage }) => {
  return (
    <>
      {Array(pageTotal)
        .fill()
        .map((e, index) => (
          <PaginateLink
            key={index}
            style={
              currentPage === index + 1
                ? { backgroundColor: "black", color: "white" }
                : {}
            }
            to={handleNavigateToPage({
              type: "specificPage",
              pageNumber: index + 1,
            })}
          >
            {index + 1}
          </PaginateLink>
        ))}
    </>
  );
};
const PaginationNext = () => {
  return (
    <>
      <PaginateLink to={handleNavigateToPage({ type: "nextPage" })}>
        <GrFormNext className="text-3xl" />
      </PaginateLink>
    </>
  );
};

const PaginateLink = ({ children, to = {}, style = {} }) => {
  return (
    <Link
      to={to}
      style={style}
      className=" w-[35px] h-[35px] mder:w-[50px] mder:h-[50px] cursor-pointer flex justify-center items-center border font-semibold border-pagination_color "
    >
      {children}
    </Link>
  );
};

const handleNavigateToPage = ({ type, pageNumber }) => {
  const searchUrl = new URLSearchParams(window.location.search);
  const currentPage = Number(searchUrl.get("page")) || 1;
  switch (type) {
    case "prevPage":
      searchUrl.set("page", currentPage - 1);
      break;
    case "nextPage":
      searchUrl.set("page", currentPage + 1);
      break;
    case "specificPage":
      searchUrl.set("page", pageNumber);
      break;
    default:
  }
  return `${window.location.pathname}?${searchUrl.toString()}`;
};
