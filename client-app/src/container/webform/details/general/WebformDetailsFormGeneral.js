import React, { Component} from 'react';
import {connect} from 'react-redux';

import WebformDetailsFormGeneralEdit from './WebformDetailsFormGeneralEdit';
import WebformDetailsFormGeneralView from './WebformDetailsFormGeneralView';

class WebformDetailsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        })
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        })
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    };

    onDivLeave() {
        if(!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div className={this.state.activeDiv} onMouseEnter={() => this.onDivEnter()} onMouseLeave={() => this.onDivLeave()}>
                {
                    this.state.showEdit && permissions.manageWebform ?
                        <WebformDetailsFormGeneralEdit switchToView={this.switchToView} />
                        :
                        <WebformDetailsFormGeneralView switchToEdit={this.switchToEdit}/>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        teamDetails: state.teamDetails,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions
    };
};

export default connect(mapStateToProps)(WebformDetailsFormGeneral);