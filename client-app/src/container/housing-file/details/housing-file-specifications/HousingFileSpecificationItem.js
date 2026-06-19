import React, { Component } from 'react';
import { connect } from 'react-redux';

import HousingFileSpecificationView from './HousingFileSpecificationView';
import HousingFileSpecificationDelete from './HousingFileSpecificationDelete';
import HousingFileSpecificationEdit from './HousingFileSpecificationEdit';
import { isEqual } from 'lodash';

class HousingFileSpecificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            housingFileSpecification: {
                ...props.housingFileSpecification,
            },
        };
    }

    //todo wm: check of deze er niet uit kan?
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.housingFileSpecification, nextProps.housingFileSpecification)) {
            this.setState({
                ...this.state,
                housingFileSpecification: {
                    ...nextProps.housingFileSpecification,
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
            housingFileSpecification: {
                ...this.props.housingFileSpecification,
            },
        });

        this.closeEdit();
    };

    render() {
        return (
            <div>
                <HousingFileSpecificationView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    housingFileSpecification={this.state.housingFileSpecification}
                    showEdit={this.state.showEdit}
                    openEdit={this.openEdit}
                    showCheckboxList={this.props.showCheckboxList}
                    toggleSpecificationCheck={this.props.toggleSpecificationCheck}
                    specificationIds={this.props.specificationIds}
                />
                {!this.props.showCheckboxList && this.state.showEdit && (
                    <HousingFileSpecificationEdit
                        housingFileSpecification={this.state.housingFileSpecification}
                        setInputChange={this.setInputChange}
                        cancelEdit={this.cancelEdit}
                        closeEdit={this.closeEdit}
                    />
                )}
                {this.state.showDelete && (
                    <HousingFileSpecificationDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.housingFileSpecification}
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

export default connect(mapStateToProps, null)(HousingFileSpecificationItem);
