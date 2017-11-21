import React from 'react';
import { browserHistory } from 'react-router';

import RegistrationNewForm from './RegistrationNewForm';
import RegistrationNewToolbar from './RegistrationNewToolbar';

const RegistrationNewApp = props => {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <RegistrationNewToolbar contactId={props.params.contactId} />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <RegistrationNewForm contactId={props.params.contactId} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="panel panel-default">
                    <div className="panel-body">
                        Harmonica
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RegistrationNewApp;