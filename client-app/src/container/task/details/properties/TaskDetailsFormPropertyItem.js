import React, {Component} from 'react';

import TaskDetailsAPI from '../../../../api/task/TaskDetailsAPI';
import TaskDetailsFormPropertiesView from './TaskDetailsFormPropertiesView';
import TaskDetailsFormPropertyEdit from './TaskDetailsFormPropertyEdit';
import {connect} from "react-redux";

class TaskDetailsFormPropertyItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,

            property: {
                ...props.property,
            },
        };
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

    openEdit = () => {
        if(this.props.permissions.manageTask) {
            this.setState({showEdit: true});
        }
    };

    closeEdit = () => {
        this.setState({showEdit: false});
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            property: {
                ...this.props.property,
        }});

        this.closeEdit();
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            property: {
                ...this.state.property,
                [name]: value
            },
        });
    };

    setPropertyIdAndName = (id, name) => {
        this.setState({
            ...this.state,
            property: {
                ...this.state.property,
                propertyId: id,
                property: {
                    ...this.state.property,
                    id,
                    name
                }
            }
        });
    };

    handleSubmit = () => {
        const { property } = this.state;

        TaskDetailsAPI.updateTaskProperty(property.id, property).then(() => {
            this.closeEdit();
        });
    };

    render() {
        return (
            <div>
                <TaskDetailsFormPropertiesView
                    property={this.state.property}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    updateTaskProperty={this.state.property}
                />
                {
                    this.state.showEdit &&
                    <TaskDetailsFormPropertyEdit
                        property={this.state.property}
                        handleSubmit={this.handleSubmit}
                        cancelEdit={this.cancelEdit}
                        handleInputChange={this.handleInputChange}
                        setPropertyIdAndName={this.setPropertyIdAndName}
                    />
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(TaskDetailsFormPropertyItem);