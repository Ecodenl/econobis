import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import TaskDetailsDelete from './TaskDetailsDelete';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

class TaskDetailsToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    };

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-2">
                                <div className="btn-group" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageTasks &&
                                    <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-2"><h4><strong>Taak</strong></h4></div>
                            <div className="col-md-6"><h4>{ this.props.taskDetailsName }</h4></div>
                            <div className="col-md-2" />
                        </PanelBody>
                    </Panel>
                </div>
                {
                    this.state.showDelete &&
                    <TaskDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        name={this.props.taskDetailsName}
                        id={this.props.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        taskDetailsName: state.taskDetails.name,
        id: state.taskDetails.id,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TaskDetailsToolbar);