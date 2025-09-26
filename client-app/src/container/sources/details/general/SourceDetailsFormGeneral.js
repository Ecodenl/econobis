import React, { Component } from 'react';
import { connect } from 'react-redux';

import SourceDetailsFormGeneralEdit from './SourceDetailsFormGeneralEdit';
import SourceDetailsFormGeneralView from './SourceDetailsFormGeneralView';

class SourceDetailsFormGeneral extends Component {
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
        const { permissions = {} } = this.props.meDetails;

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageIntakeSources ? (
                    <SourceDetailsFormGeneralEdit
                        source={this.props.source}
                        sources={this.props.sources}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                    />
                ) : (
                    <SourceDetailsFormGeneralView {...this.props.source} switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        sources: state.systemData.intakeSources,
    };
};

export default connect(mapStateToProps)(SourceDetailsFormGeneral);
