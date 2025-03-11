import React, { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { waitTime } from "@src/utils";
interface IRequestProps {
  // 类型
  method: "get" | "post";
  // 接口地址
  url: string;
  // 接口参数
  params: string;
  render: (loading: boolean, success: boolean, data: any) => any;
}

const Request = memo((props: IRequestProps) => {
  const { method, url, params, render } = props;
  // 获取数据
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getData = useCallback(async () => {
    if (url && method) {
      setLoading(true);
      await waitTime(2000);
      await axios({
        url: url,
        method: method,
        params: JSON.parse(params),
      })
        .then((res: any) => {
          setLoading(false);
          setSuccess(true);
          setData(res.data.data || res.data);
        })
        .catch((res) => {
          setLoading(false);
          setSuccess(false);
        });
    }
  }, [method, params, url]);

  useEffect(() => {
    getData();
  }, [getData]);
  return <>{render(loading, success, data)}</>;
});
export default Request;
