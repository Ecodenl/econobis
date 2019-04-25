import React, { Component } from 'react';
import { connect } from 'react-redux';

import contactAPI from '../../../api/contact/ContactsAPI';
import Modal from '../../../components/modal/Modal';
import VirtualizedSelect from 'react-virtualized-select';

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
                        <div className="col-sm-6">Voeg bestaand contact toe</div>
                        <div className="col-sm-6">
                            <VirtualizedSelect
                                id={'personId'}
                                name={'personId'}
                                value={this.state.personId}
                                onChange={this.handleReactSelectChange}
                                options={this.state.people}
                                valueKey={'id'}
                                labelKey={'fullName'}
                                placeholder={''}
                                noResultsText={'Geen resultaat gevonden'}
                                multi={false}
                                simpleValue
                                removeSelected
                                isLoading={this.state.peekLoading.people}
                            />
                        </div>
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
