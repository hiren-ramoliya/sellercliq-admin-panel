import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApiPost } from "../../helpers/API/ApiData";
import { setToken } from "../../utils/auth.util";
import { useAppDispatch } from "../../store/store";
import { fetchUserProfile } from "../../store/slices/userProfileSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorKey, setErrorKey] = useState<""[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);

  const clearForm = () => {
    setLogin({
      email: "",
      password: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    type: string
  ) => {
    const { value } = e.target;
    setLogin({ ...login, [key]: value });
  };

  const handleOnSave = async () => {
    if (!login?.email || !login?.password) {
      if (!login?.email) {
        handleFormError("email", "Email is required");
      }
      if (!login?.password) {
        handleFormError("number", "Number is required");
      }
      return;
    } else {
      try {
        let data = {
          email: login.email,
          password: login.password,
        };
        let logRes = await ApiPost(`admin/login`, data);
        if (logRes?.data?.result === 0) {
          setToken(logRes?.data?.payload?.token);
          dispatch(fetchUserProfile());
          clearForm();
          history.push("/");
        } else {
          console.log("error", logRes?.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFormError = (key: string, message: string) => {
    let tempErrorKey: any = errorKey;
    tempErrorKey.push(key);
    setErrorKey(tempErrorKey);
    setIsInvalid(true);
  };

  return (
    <>
      <div className="container pad-top-25">
        <h2 className="text-center">Admin Login</h2>
        <div className="row col-center">
          <div className="col6">
            <div className="white-box">
              <div className="pad-top-25">
                <div className="form-control b-none">
                  <label>
                    Email{" "}
                    {isInvalid && !login?.email && (
                      <small> Email is required</small>
                    )}
                  </label>
                  <input
                    type="text"
                    value={login?.email}
                    onChange={(e) => handleInputChange(e, "email", "text")}
                  />
                </div>
                <div className="form-control b-none pt10">
                  <label>
                    Password{" "}
                    {isInvalid && !login?.password && (
                      <small> Password is required</small>
                    )}
                  </label>
                  <input
                    type="password"
                    value={login?.password}
                    onChange={(e) => handleInputChange(e, "password", "text")}
                  />
                </div>
              </div>
              <div className="box-last-child-text text-center pad-top-25">
                <p>
                  <div className="green-button" onClick={handleOnSave}>
                    <button>Login</button>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
