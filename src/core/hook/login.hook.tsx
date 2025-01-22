import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@service/index";
import { message } from "antd";
export function useLogin() {
  // 是否处理loading状态
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = useCallback(
    (params: any, callback?: (data: string) => void) => {
      setLoginLoading(true);
      API.loginService
        .login(params)
        .then((data) => {
          console.log(data, "data");
          setLoginLoading(false);
          if (data.result) {
            navigate("/home");
            callback && callback(data.data);
          } else {
            message.error(data.message);
          }
        })
        .catch(() => {
          setLoginLoading(false);
        });
    },
    [navigate]
  );

  return {
    loginLoading,
    login,
  };
}
