import React from 'react';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';

const SignupsApp = props => {
    return (
        <div>
            <div className="btn-group" role="group">
                <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
            </div>
            <div className="h4">
                Aanmelding: {props.params.id}
            </div>
        </div>
    )
};

export default SignupsApp;