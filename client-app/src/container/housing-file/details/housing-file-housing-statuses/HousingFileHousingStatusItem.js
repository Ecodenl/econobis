import React, { Component } from 'react';
import { connect } from 'react-redux';

import HousingFileHousingStatusView from './HousingFileHousingStatusView';
// import HousingFileHousingStatusDelete from './HousingFileHousingStatusDelete';
import HousingFileHousingStatusEdit from './HousingFileHousingStatusEdit';
import { isEqual } from 'lodash';
import HousingFileHousingStatusDelete from './HousingFileHousingStatusDelete';

class HousingFileHousingStatusItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            housingFileHousingStatus: {
                ...props.housingFileHousingStatus,
            },
        };
    }

    //todo wm: check of deze er niet uit kan?
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.housingFileHousingStatus, nextProps.housingFileHousingStatus)) {
            this.setState({
                ...this.state,
                housingFileHousingStatus: {
                    ...nextProps.housingFileHousingStatus,
                },
            });
        }
    }
    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    openEdit = () => {
        if (this.props.permissions.manageHousingFile) {
            this.setState({ showEdit: true });
        }
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            housingFileHousingStatus: {
                ...this.props.housingFileHousingStatus,
            },
        });

        this.closeEdit();
    };

    render() {
        return (
            <div>
                <HousingFileHousingStatusView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    housingFileHousingStatus={this.state.housingFileHousingStatus}
                    showEdit={this.state.showEdit}
                    openEdit={this.openEdit}
                />
                {this.state.showEdit && (
                    <HousingFileHousingStatusEdit
                        housingFileHousingStatus={this.state.housingFileHousingStatus}
                        setInputChange={this.setInputChange}
                        cancelEdit={this.cancelEdit}
                        closeEdit={this.closeEdit}
                    />
                )}
                {this.state.showDelete && (
                    <HousingFileHousingStatusDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.housingFileHousingStatus}
                    />
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

export default connect(mapStateToProps, null)(HousingFileHousingStatusItem);
