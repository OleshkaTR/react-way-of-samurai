import axios from 'axios';
import {UserType} from '../types/types';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
