import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

// Functionele wrapper voor de class component
const ContactNewToolbarWrapper = props => {
    const navigate = useNavigate();
    return <ContactNewToolbar {...props} navigate={navigate} />;
};

class ContactNewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group btn-group-flex margin-small" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h4 className="text-center margin-small">Nieuw contact</h4>
                        </div>
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

export default ContactNewToolbarWrapper;
