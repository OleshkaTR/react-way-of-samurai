import {PhotosType, PostType, ProfileType} from '../types/types';
import {BaseThunkType, InferActionsTypes} from './reduxStore';
import {profileAPI} from '../api/profileApi';

const initialState = {
    posts: [
        {
            id: 1,
            message: 'Hi, how are you?',
            likesCount: 2
        },
        {
            id: 2,
            message: 'It\'s my first post',
            likesCount: 4
        },
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
};

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'profile/ADD_POST':
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        case 'profile/UPDATE_NEW_POST_TEXT':
            return {
                ...state,
                newPostText: action.newText
            }
        case 'profile/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'profile/SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'profile/DELETE_POST':
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id !== action.postId)]
            }
        case 'profile/SAVE_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
};

export const actions = {
    addPost: () => ({type: 'profile/ADD_POST'} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    updateNewPostText: (text: string) =>
        ({type: 'profile/UPDATE_NEW_POST_TEXT', newText: text} as const),
    setUserStatus: (status: string) => ({type: 'profile/SET_USER_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'profile/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO', photos} as const),
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(data));
};

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    }catch (e) {
        alert('Some error occured');
    }
};

export const saveProfilePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.postPhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export const saveProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profileData);
    if (data.resultCode === 0) {
        if (userId !== null) {
            await dispatch(getUserProfile(userId));
        }else {
            throw new Error("UserId can't be null");
        }
    } else {
        alert(data.messages[0]);
    }
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
