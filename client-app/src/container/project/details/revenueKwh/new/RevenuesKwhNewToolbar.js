import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import ButtonIcon from '../../../../../components/button/ButtonIcon';

// Functionele wrapper voor de class component
const RevenuesKwhNewToolbarWrapper = props => {
    const navigate = useNavigate();
    return <RevenuesKwhNewToolbar {...props} navigate={navigate} />;
};

class RevenuesKwhNewToolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="col-md-4">
                                <div className="btn-group btn-group-flex margin-small" role="group">
                                    <ButtonIcon iconName={'arrowLeft'} onClickAction={() => this.props.navigate(-1)} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h3 className="text-center table-title">Nieuwe opbrengst Kwh</h3>
                            </div>
                            <div className="col-md-4" />
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default RevenuesKwhNewToolbarWrapper;
