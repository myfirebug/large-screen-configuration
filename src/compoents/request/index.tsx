import React, { FC } from "react";
import { useRequest } from "ahooks";
import axios from "axios";

interface IResult {
  code: string;
  data: any;
  msg: string;
  success: boolean;

  [propNames: string]: any;
}

interface IRequestProps {
  // 类型
  method: "get" | "post";
  // 接口地址
  url: string;
  // 接口参数
  params: string;
  render: (data: any, success: boolean, setP?: React.Dispatch<any>) => any;
}

const Request: FC<IRequestProps> = ({ method, url, params, render }) => {
  // 获取数据
  const { data, error } = useRequest(
    async () => {
      return await new Promise(
        (resolve: (data: IResult) => void, reject: (data: any) => void) => {
          axios({
            url:
              process.env.REACT_APP_ENV === "production" &&
              url === "http://localhost:3000/configuration"
                ? "https://myfirebug.github.io/bigscreen/configuration"
                : url,
            method: method,
            params: JSON.parse(params),
          })
            .then((res: any) => {
              resolve(res);
            })
            .catch((res) => {
              reject(res);
            });
        }
      );
    },
    {
      refreshDeps: [params, url],
      ready: Boolean(url),
    }
  );

  return <>{render(url ? data : null, url ? !error : true)}</>;
};
export default Request;
