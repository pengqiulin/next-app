import axios from "axios";
import qs from "qs";
import { Methods, RequestParameter, ResultCode, ResultData } from "@type/net";
import { getLocalToken, clearLocalStorage } from "@tool/storage";
const httpUrl = ''

const TIME_OUT = 5000;
let token: string | null = null;
export const rpcUrl: string = process.env.RpcUrl as string;


class Request {
    success<T>(data: T) {
        return {
            code: ResultCode.T0,
            msg: "成功",
            success: true,
            data: data,
        };
    }
    error<T>(data: T) {
        return {
            code: ResultCode.T1,
            msg: "失败",
            success: false,
            data: data,
        };
    }

    errorTimeout<T>(data: T) {
        return {
            code: ResultCode.T2,
            msg: "超时",
            success: false,
            data: null,
        };
    }

    private _request<T>(parameter: RequestParameter) {
        let { url, headers, timeout, method, data, retry, release } = parameter;
        let _timeout = typeof timeout === "undefined" ? TIME_OUT : timeout;
        let _headers = typeof headers === "undefined" ? {} : headers;
        let _method = typeof method === "undefined" ? Methods.T3 : method;
        let _retryCount = typeof retry === "undefined" ? 0 : retry;
        // let _release = typeof release === "undefined" ? 0 : release;

        const configData: any = {
            url: `${httpUrl}${url}`,
            timeout: _timeout,
            headers: {
                ..._headers,
                token: getLocalToken()
            },
            retry: _retryCount,
            release: release,
        };

        switch (_method) {
        case Methods.T0:
            configData.method = Methods.T0;
            configData.params = data;
            break;
        case Methods.T1:
            configData.method = "post";
            if (data instanceof FormData) {
                configData.headers["Content-Type"] =
                        "multipart/form-data; charset=UTF-8";
                configData.data = data;
            } else {
                configData.headers["Content-Type"] =
                        "application/x-www-form-urlencoded; charset=UTF-8";
                configData.data = qs.stringify(data);
            }
            break;
        default:
            configData.method = "post";
            configData.headers["Content-Type"] =
                    "application/json; charset=UTF-8";
            configData.data = data;
        }
        return new Promise<ResultData<T | null>>((resolve, reject) => {
            axios(configData)
                .then((result: any) => {
                    resolve(this.success(result.data));
                })
                .catch((error) => {
                    const { status, message, response } = error;
                    if(response?.data?.Code === 401) {
                        clearLocalStorage()
                        window.location.reload()
                    }
                    try {
                        if (message.includes("timeout")) {
                            resolve(this.errorTimeout(null));
                        } else {
                            resolve(this.error(error));
                        }
                    } catch (e) {
                        resolve(this.error(error));
                    }
                });
        });
    }

    postJson<T>(data: RequestParameter) {
        data.method = Methods.T3;
        // data.url = `http://127.0.0.1:6545${data.url}`;
        // data.url = `http://54.254.1.84:6545${data.url}`;
        data.url = `${rpcUrl}${data.url}`;
        return this._request<T>(data);
    }
}
// http://54.254.1.84:8888/api/magicBox/Login
export default new Request();
