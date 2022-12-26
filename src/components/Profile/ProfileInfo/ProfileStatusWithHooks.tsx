import React, {ChangeEvent, FC, useEffect, useState} from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
};

const ProfileStatusWithHooks: FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    },[props.status]);

    const activatedEditMode = () => {
        setEditMode(true);
    };

    const deactivatedEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        let body = e.target.value;
        setStatus(body);
    };

    return (
        <>
            {!editMode ?
                <p
                    onDoubleClick={ activatedEditMode }
                >
                    <strong>Status: </strong>{props.status ? props.status : 'Nope'}
                </p>
                :
                <div>
                    <input
                        onChange={ onStatusChange }
                        value={status}
                        type="text"
                        autoFocus={true}
                        onBlur={ deactivatedEditMode }
                    />
                </div>
            }
        </>
    );
};

export default ProfileStatusWithHooks;
