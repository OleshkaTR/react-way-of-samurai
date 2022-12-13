import React from 'react';
import preloader from "../../../assets/Spinner-1s-200px.svg";

const Preloader = (props) => {
    return (
        <img
            src={preloader}
            alt='Preloader'
        />
    );
};

export default Preloader;
