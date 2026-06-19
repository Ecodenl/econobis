import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../../../../../components/panel/Panel';
import PanelBody from '../../../../../../../../components/panel/PanelBody';

import RevenuePartsKwhFormEdit from './RevenuePartsKwhFormEdit';
import RevenuePartsKwhFormView from './RevenuePartsKwhFormView';

class RevenuePartsKwhFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    {this.state.showEdit &&
                    !this.props.revenuePartsKwh.confirmed &&
                    this.props.permissions.manageProject ? (
                        <RevenuePartsKwhFormEdit switchToView={this.switchToView} />
                    ) : (
                        <RevenuePartsKwhFormView switchToEdit={this.switchToEdit} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        revenuePartsKwh: state.revenuePartsKwh,
    };
};

export default connect(mapStateToProps)(RevenuePartsKwhFormGeneral);
