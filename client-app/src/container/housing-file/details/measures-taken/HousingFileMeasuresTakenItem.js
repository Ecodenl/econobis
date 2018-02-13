import React, {Component} from 'react';
import { connect } from 'react-redux';

import HousingFileMeasuresTakenView from './HousingFileMeasuresTakenView';
import HousingFileMeasuresTakenDelete from './HousingFileMeasuresTakenDelete';
import HousingFileDetailsAPI from "../../../../api/housing-file/HousingFileDetailsAPI";
import {isEqual} from "lodash";


class HousingFileMeasuresTakenItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,
            measureTaken: {
                ...props.measureTaken,
            },
        };
    };

    componentWillReceiveProps(nextProps) {
        if(!isEqual(this.state.measureTaken, nextProps.measureTaken)){
            this.setState({
                ...this.state,
                measureTaken: {
                    ...nextProps.measureTaken,
                },
            });
        }
    };
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
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
              <HousingFileMeasuresTakenView
                  highlightLine={this.state.highlightLine}
                  showActionButtons={this.state.showActionButtons}
                  onLineEnter={this.onLineEnter}
                  onLineLeave={this.onLineLeave}
                  toggleDelete={this.toggleDelete}
                  measureTaken={this.state.measureTaken}
              />
                {
                    this.state.showDelete &&
                    <HousingFileMeasuresTakenDelete
                        closeDeleteItemModal={this.toggleDelete}
                        {...this.props.measureTaken}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(HousingFileMeasuresTakenItem);
