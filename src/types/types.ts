export type PostType = {
    id: number
    message: string
    likesCount: number
};
export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
};

export type PhotosType = {
    large: string | null
    small: string | null
};

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactType
    photos: PhotosType
};

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
};

export type FriendType = {
    id: number,
    name: string,
};
export type MapStateToFriendsPropsType = {
    friends: Array<FriendType>
};
