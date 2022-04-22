import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { isLoadingSelector } from "../../../features/accountSlice";
import RegisterForm from "./RegisterForm";

function Register() {
  const isLoading = useSelector(isLoadingSelector);

  return (
    <>
      <div className=" py-[50px] px-[30px]  ">
        <h3 className="text-3xl font-bold">Tạo tài khoản</h3>
        <div className="flex flex-col w-full lg:items-end">
          <RegisterForm />
          <div className="text-light_grey my-5">
            Đã có tài khoản? <Link to="/account/login">Đăng nhập</Link>{" "}
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </>
  );
}

export default Register;
