
/**
 * 请求数据
 *  2022/4/15 15:58
 */
export interface RequestData<T> {
    data: T;
}

/**
* 响应数据
*  2022/4/15 15:58
*/
export interface ResultData<T> {
    code: ResultCode;
    data: T;
    msg: string;
    success: boolean
}

/**
* 响应基础状态码
*  2022/4/15 15:58
*/
export enum ResultCode {
    'T0' = 0, // 成功
    'T1' = 1, //失败
    'T2' = 2, // 超时
    'T3' = 3, // 异常
    'T4' = 4, // ws未准备好
    'T401' = 401, // 无权限 或者 登录过期 被挤下线了
}

/**
* 短链接请求方式
*  2022/5/23 11:23
*/
export enum Methods {
    T0 = "get",
    T1 = "postForm",
    T2 = "postJson",
    T3 = "post",
}

/**
 * 请求参数
 *  2022/5/23 11:49
 */
// export interface RequestParameter<T, V>  {
export interface RequestParameter  {
    method?: Methods, // 请求类型
    url: string, //url
    data?: any, //请求参数
    headers?: any, //自定义请求头
    timeout?: number, // 超时时间
    retry?: number, // 失败重试次数
    release?: boolean | null | undefined, // 放行，不拦截
}
