import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "../../../components/form-group/FormGroup";
import {
  CLEAR_ERRORMESSAGE,
  errorMessageSelector,
  login,
  postAccount,
} from "../../../features/accountSlice";
import { validateForm } from "../../../helper";
import formProps from "../form-group/login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(errorMessageSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    const canAllowLogin = validateForm.validate();
    if (!canAllowLogin) {
      const values = validateForm.getAllValues();
      const payload = {
        option: "login",
        data: values,
      };
      dispatch(postAccount(payload));
    }
  };

  useEffect(() => {
    validateForm("login-form");
    errorMessage && validateForm.addErrorMessage(errorMessage, "login-form");
    return () => dispatch(CLEAR_ERRORMESSAGE(""));
  });

  return (
    <form id="login-form" className="  w-full mt-5 lg:w-1/2">
      <FormGroup formProps={formProps} type="login" />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          className="border border-black px-2 py-1.5 text-sm"
        >
          Đăng nhập
        </button>
        <p className="text-sm font-bold text-light_grey">Quên mật khẩu?</p>
      </div>
    </form>
  );
};
export default memo(LoginForm);
