import { Button } from 'antd';
import React, {ChangeEvent, FC} from 'react';
import {ContactType, ProfileType} from '../../../types/types';

type PropsType = {
    profile: ProfileType
    onChangeInput: (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => void
    deactivateEditMode: (e: ChangeEvent<HTMLFormElement>) => void
    onChangeContactInput: (e: ChangeEvent<HTMLInputElement>) => void
    addToState: () => void
}

const ProfileDataForm: FC<PropsType> = ({
                                            profile,
                                            onChangeInput,
                                            deactivateEditMode,
                                            onChangeContactInput,
                                            addToState
                                        }) => {
    return <form onSubmit={deactivateEditMode}>
        <Button>Save</Button>
        <p><strong>Full name: </strong><input
            defaultValue={profile.fullName}
            onChange={onChangeInput}
            name='fullName'
            type="text"
            placeholder='Enter new name'
        /></p>
        <p><strong>looking for a job: </strong><input
            checked={profile.lookingForAJob}
            onChange={onChangeInput}
            name='lookingForAJob'
            type="checkbox"
        /></p>
        <p>
            <strong>My professional skills: </strong>
            <input
                defaultValue={profile.lookingForAJobDescription}
                onChange={onChangeInput}
                name='lookingForAJobDescription'
                placeholder='Enter about my skills'
            /></p>
        <p><strong>About me: </strong>
            <input
                onChange={onChangeInput}
                defaultValue={profile.aboutMe}
                name='aboutMe'
                placeholder='Enter about me'
            /></p>

        <h3>Contacts:</h3>
        <ul>
            {Object.keys(profile.contacts).map(key =>
                <p key={key}>{key}: <input
                    name={key}
                    defaultValue={profile.contacts[key as keyof ContactType]}
                    type="text"
                    onChange={onChangeContactInput}
                    onBlur={addToState}
                    placeholder={key}
                /></p>
            )}
        </ul>
    </form>
};

export default ProfileDataForm;
