import React, {FC} from 'react';

import Contact from './Contact';
import {ContactType, ProfileType} from '../../../types/types';
import { Button } from 'antd';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            { isOwner && <Button onClick={goToEditMode}>Edit</Button>}
            <p><strong>Full name: </strong>{profile.fullName}</p>
            <p><strong>looking for a job: </strong>{profile.lookingForAJob ? 'Of course' : 'No thanks'}</p>
            {profile.lookingForAJob &&
            <p>
                <strong>My professional skills: </strong>{profile.lookingForAJobDescription}
            </p>
            }
            <p><strong>About me: </strong>{profile.aboutMe}</p>

            <h3>Contacts:</h3>
            <ul>
                {Object.keys(profile.contacts).map((key) =>
                    <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactType]}
                    />
                )}
            </ul>
        </div>
    );
};

export default ProfileData;
