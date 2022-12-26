import {instance} from './api';

type GetCaptchaUrlResponseType = {
    url: string
    resultCode: number
}

export const secureApi = {
    getCaptchaUrl: () => {
        return instance.get<GetCaptchaUrlResponseType>(`/security/get-captcha-url`)
            .then(res => res.data);
    },
};
