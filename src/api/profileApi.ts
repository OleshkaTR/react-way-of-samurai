import {PhotosType, ProfileType} from '../types/types';
import {instance, APIResponseType} from './api';

type SavePhotoResponseDtaType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data);
    },
    getStatus: (userId: number) => {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data);
    },
    updateStatus: (status: string) => {
        return instance.put<APIResponseType>(`profile/status`,
            {status})
            .then(res => res.data);
    },
    postPhoto: (photoFile: File) => {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<SavePhotoResponseDtaType>>(`profile/photo`,
            formData, {
                headers: {
                    "Content-type": "multipart/from-data"
                }
            })
            .then(response => response.data);
    },
    saveProfile: (profile: ProfileType) => {
        return instance.put<APIResponseType>(`profile`,
            profile)
            .then(res => res.data);
    }
};
