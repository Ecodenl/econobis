import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import TeamDetailsDelete from "./TeamDetailsDelete";

class TeamToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelete: false,
        };
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group btn-group-flex margin-small" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">Team: {this.props.name}</h4></div>
                <div className="col-md-4"/>
                {
                    this.state.showDelete &&
                    <TeamDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        name={this.props.name}
                        id={this.props.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        name: state.teamDetails.name,
        id: state.teamDetails.id,
    };
};

export default connect(mapStateToProps, null)(TeamToolbar);