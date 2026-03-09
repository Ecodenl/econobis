import React, { Component } from 'react';

import { connect } from 'react-redux';
import TeamDetailsDistrictsView from './TeamDetailsDistrictsView';
import TeamDetailsDistrictsItemDelete from './TeamDetailsDistrictsDelete';

class TeamDetailsDistrictsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            district: props.district,
        };
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
                <TeamDetailsDistrictsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    district={this.state.district}
                />
                {this.state.showDelete && this.props.permissions.createTeam && (
                    <TeamDetailsDistrictsItemDelete
                        toggleDelete={this.toggleDelete}
                        districtId={this.state.district.id}
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

export default connect(mapStateToProps)(TeamDetailsDistrictsItem);
