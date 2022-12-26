import {APIResponseType, GetItemsType, instance} from './api';

export const userAPI = {
    getUsers: (currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) => {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data);
    },

    unFollowUser: (userId: number) => {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(res => res.data);
    },

    followUser: (userId: number) => {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(res => res.data);
    }
};
