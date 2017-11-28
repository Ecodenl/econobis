import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { deleteContact } from '../../actions/ContactDetailsActions';

import ButtonIcon from '../../components/button/ButtonIcon';
import ContactDetailsDelete from './ContactDetailsDelete';

class ContactDetailsToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showDelete: false,
        }
    }

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack} />
                        {
                            this.props.typeId === 'account' && this.props.permissions.deleteAccount &&
                            <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                        }
                        {
                            this.props.typeId === 'person' && this.props.permissions.deletePerson &&
                            <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleDelete}/>
                        }
                    </div>
                </div>
                <div className="col-md-4"><h4 className="text-center"><strong>{this.props.fullName || 'Nieuw'}</strong></h4></div>
                <div className="col-md-4" />

                {
                    this.state.showDelete &&
                    <ContactDetailsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        fullName={this.props.fullName}
                        id={this.props.id}
                    />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        fullName: state.contactDetails.fullName,
        id: state.contactDetails.id,
        typeId: state.contactDetails.typeId,
        permissions: state.meDetails.permissions,
    }
};

const mapDispatchToProps = dispatch => ({
    deleteContact: (id) => {
        dispatch(deleteContact(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsToolbar);