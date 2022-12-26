import React, {FC} from 'react';

type PropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<PropsType> = ({contactTitle, contactValue}) => {
    return <li><strong>{contactTitle}:</strong> {contactValue}</li>
};

export default Contact;
