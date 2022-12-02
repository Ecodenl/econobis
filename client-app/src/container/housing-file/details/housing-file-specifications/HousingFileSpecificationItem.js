import React, { Component } from 'react';
import { connect } from 'react-redux';

import HousingFileSpecificationView from './HousingFileSpecificationView';
import HousingFileSpecificationDelete from './HousingFileSpecificationDelete';
import { isEqual } from 'lodash';

class HousingFileSpecificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            housingFileSpecification: {
                ...props.housingFileSpecification,
            },
        };
    }

    componentWillReceiveProps(nextProps) {
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
                />
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
