import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import RegistrationDetailsDelete from './RegistrationDetailsDelete';

class RegistrationDetailsToolbar extends Component {
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
        const { registrationAddress = {} } = this.props;
        const fullStreet = `${registrationAddress.street || ''} ${registrationAddress.number || ''}`;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center">{ `Aanmelding voor: ${fullStreet}` }</h4></div>
                <div className="col-md-4" />
                {
                    this.state.showDelete &&
                    <RegistrationDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        fullStreet={fullStreet}
                        id={this.props.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        registrationAddress: state.registrationDetails.address,
    };
};

export default connect(mapStateToProps, null)(RegistrationDetailsToolbar);