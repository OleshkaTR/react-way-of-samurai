import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {

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

    const onStatusChange = (e) => {
        let body = e.target.value;
        setStatus(body);
    };

    return (
        <>
            {!editMode ?
                <p
                    onDoubleClick={ activatedEditMode }
                >
                    {props.status ? props.status : 'Nope'}
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
