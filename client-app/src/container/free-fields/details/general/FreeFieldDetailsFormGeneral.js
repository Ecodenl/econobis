import React, { Component } from 'react';
import { connect } from 'react-redux';

import FreeFieldDetailsFormGeneralEdit from './FreeFieldDetailsFormGeneralEdit';
import FreeFieldDetailsFormGeneralView from './FreeFieldDetailsFormGeneralView';

class FreeFieldDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: true,
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
        const { permissions = {} } = this.props;
        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
                    <FreeFieldDetailsFormGeneralEdit
                        freeField={this.props.freeField}
                        switchToView={this.switchToView}
                        fetchFreeField={this.props.fetchFreeField}
                    />
                ) : (
                    <FreeFieldDetailsFormGeneralView {...this.props.freeField} switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(FreeFieldDetailsFormGeneral);
