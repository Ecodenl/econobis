import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from '../../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const OpportunityNewToolbarWrapper = props => {
    const navigate = useNavigate();
    return <OpportunityNewToolbar {...props} navigate={navigate} />;
};

class OpportunityNewToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelete: false,
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-md-4">
                        <div className="btn-group btn-group-flex margin-small" role="group">
                            <ButtonIcon iconName={'arrowLeft'} onClickAction={browserHistory.goBack} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-center margin-small">Nieuwe kans</h3>
                    </div>
                    <div className="col-md-4" />
                </div>
            </div>
        );
    }
}

export default OpportunityNewToolbarWrapper;
