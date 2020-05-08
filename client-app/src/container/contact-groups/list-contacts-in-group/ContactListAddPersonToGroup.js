import React, { Component } from 'react';
import { connect } from 'react-redux';

import contactAPI from '../../../api/contact/ContactsAPI';
import Modal from '../../../components/modal/Modal';
import InputReactSelect from '../../../components/form/InputReactSelect';

class ContactListAddPersonToGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            personId: '',
            peekLoading: {
                people: true,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        contactAPI.getPerson().then(payload => {
            this.setState({
                ...this.state,
                people: payload,
                peekLoading: {
                    ...this.state.peekLoading,
                    people: false,
                },
            });
        });
    }

    handleReactSelectChange(selectedOption) {
        this.setState({
            ...this.state,
            personId: selectedOption,
        });
    }

    render() {
        return (
            <Modal
                buttonConfirmText="Toevoegen"
                closeModal={this.props.closeModalAddToGroup}
                confirmAction={() => this.props.addPersonToGroup(this.state.personId)}
                title={`Contact toevoegen aan groep: ${this.props.groupName}`}
            >
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <InputReactSelect
                            label={'Voeg bestaand contact toe'}
                            divSize={'col-sm-12'}
                            size={'col-sm-6'}
                            id={'personId'}
                            name={'personId'}
                            value={this.state.personId}
                            onChangeAction={this.handleReactSelectChange}
                            options={this.state.people}
                            optionId={'id'}
                            optionName={'fullName'}
                            multi={false}
                            isLoading={this.state.peekLoading.people}
                        />
                    </div>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactListAddPersonToGroup);
