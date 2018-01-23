import React from 'react';
import ChangePassword from "./ChangePassword";

const Content = props => {
    return (
        <div>
            {props.children}
            {props.changePasswordActive &&
                <ChangePassword closeModal={props.toggleChangePassword}/>
            }
        </div>
    );
};

export default Content;