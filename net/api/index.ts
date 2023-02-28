import request from "net/request";


// 登录接口
export async function loginApi(data: LoginApi) {
    return request.postJson<any>({
        url: "/api/login",
        retry: 3,
        data
    });
}
