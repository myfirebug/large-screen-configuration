import { useState, useCallback } from "react";
import { API, IuserInfo } from "@service/index";
export function useInfo() {
  // 是否处理loading状态
  const [userInfoLoading, setUserInfoLoading] = useState<boolean>(false);
  const getUserInfo = useCallback((callback: (data: IuserInfo) => void) => {
    setUserInfoLoading(true);
    API.userService
      .userInfo()
      .then((res) => {
        setUserInfoLoading(false);
        callback && callback(res.data);
      })
      .catch(() => {
        setUserInfoLoading(false);
      });
  }, []);

  return {
    userInfoLoading,
    getUserInfo,
  };
}
