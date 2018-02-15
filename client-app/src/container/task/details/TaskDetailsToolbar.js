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
        const { finished } = this.props.taskDetails;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <Panel>
                        <PanelBody className={"panel-small"}>
                            <div className="col-md-4">
                                <div className="btn-group" role="group">
                                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                                    {this.props.permissions.manageTask &&
                                    <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-4"><h3 className="text-center table-title margin-small">{ finished ? 'Notitie' : 'Taak' } </h3></div>
                            <div className="col-md-4" />
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
        taskDetails: state.taskDetails,
        id: state.taskDetails.id,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps, null)(TaskDetailsToolbar);