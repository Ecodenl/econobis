import React, { Component} from 'react';

import RegistrationDetailsFormGeneralEdit from './RegistrationDetailsFormGeneralEdit';
import RegistrationDetailsFormGeneralView from './RegistrationDetailsFormGeneralView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import {connect} from "react-redux";

class RegistrationDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    };

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        this.setState({
            activeDiv: '',
        });
    };

    render() {
        return (
            <Panel className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                <PanelBody>
                    <div className="col-md-12">
                        {
                            this.state.showEdit && this.props.permissions.manageRegistration ?
                                <RegistrationDetailsFormGeneralEdit switchToView={this.switchToView} />
                                :
                                <RegistrationDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                        }
                    </div>
                </PanelBody>
            </Panel>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(RegistrationDetailsFormGeneral);