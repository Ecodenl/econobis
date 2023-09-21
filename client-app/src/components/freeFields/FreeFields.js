import React, { Component } from 'react';
import { connect } from 'react-redux';

// import FreeFieldsEdit from './FreeFieldsEdit';
// import FreeFieldsView from './FreeFieldsView';
import FreeFieldsView from './FreeFieldsView';
import FreeFieldsEdit from './FreeFieldsEdit';

class FreeFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: ""
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
        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit ? (
                    <FreeFieldsEdit
                        id={this.props.id}
                        table={this.props.table}
                        switchToView={this.switchToView}
                        fetchFreeField={this.props.fetchFreeField}
                    />
                ) : (
                    <FreeFieldsView id={this.props.id} table={this.props.table} switchToEdit={this.switchToEdit} />
                )}
            </div>
        );
    }
}

export default FreeFields;
