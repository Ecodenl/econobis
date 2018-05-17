import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { fetchContacts, clearContacts, setCheckedContactAll } from '../../../actions/contact/ContactsActions';
import { setTypeFilter, clearFilterContacts } from '../../../actions/contact/ContactsFiltersActions';
import { setContactsPagination } from '../../../actions/contact/ContactsPaginationActions';
import ContactsList from './ContactsList';
import ContactsListToolbar from './ContactsListToolbar';
import filterHelper from '../../../helpers/FilterHelper';

class ContactsListApp extends Component {
    constructor(props) {
        super(props);
        if (!isEmpty(props.params)) {
            switch (props.params.filter) {
                case 'type':
                    this.props.clearFilterContacts();
                    this.props.setTypeFilter(props.params.value);
                    break;
                default:
                    break;
            };
        } else {
            this.props.clearFilterContacts();
        }

        this.state = {
            showCheckboxList: false,
            checkedAllCheckboxes: false,
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleExtraFiltersChange = this.handleExtraFiltersChange.bind(this);
    }

    componentDidMount() {
        this.fetchContactsData();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.value !== nextProps.params.value){
            if(!isEmpty(nextProps.params)) {
                switch(nextProps.params.filter){
                    case 'type':
                        this.props.clearFilterContacts();
                        this.props.setTypeFilter(nextProps.params.value);
                        break;
                    default:
                        break;
                };
            }
            else {
                this.props.clearFilterContacts();
            }

            setTimeout(() => {
                this.fetchContactsData();
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearContacts();
    };

    fetchContactsData = () => {
        setTimeout(() => {
            const extraFilters = this.state.extraFilters;
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts.reverse();
            const pagination = { limit: 20, offset: this.props.contactsPagination.offset };

            this.props.fetchContacts(filters, extraFilters, sorts, pagination);
        },100 );
    };

    resetContactFilters = () => {
        this.props.clearFilterContacts();

        this.setState({
            extraFilters: undefined,
            amountOfFilters: undefined,
        });

        this.fetchContactsData();
    };

    onSubmitFilter() {
        this.props.clearContacts();

        this.props.setContactsPagination({page: 0, offset: 0});

        this.fetchContactsData();
    };

    handlePageClick(data) {
        let page = data.selected;
        let offset = Math.ceil(page * 20);

        this.props.setContactsPagination({page, offset});

        this.fetchContactsData();
    };

    toggleShowCheckboxList = () => {
        this.setState({
            showCheckboxList: !this.state.showCheckboxList
        });
    };

    selectAllCheckboxes = () => {
        this.setState({
            checkedAllCheckboxes: !this.state.checkedAllCheckboxes
        });

        this.props.setCheckedContactAll(!this.state.checkedAllCheckboxes);
    };

    handleExtraFiltersChange(extraFilters, amountOfFilters){
        this.setState({
            amountOfFilters: amountOfFilters,
            extraFilters: extraFilters
        });

        this.props.setContactsPagination({page: 0, offset: 0});

        setTimeout(() => {
            this.fetchContactsData();
        },100 );
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 margin-10-top">
                            <ContactsListToolbar
                                toggleShowCheckboxList={() => this.toggleShowCheckboxList()}
                                resetContactFilters={() => this.resetContactFilters()}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                handleExtraFiltersChange={this.handleExtraFiltersChange}
                                extraFilters={this.state.extraFilters}
                                amountOfFilters={this.state.amountOfFilters}
                            />
                        </div>

                        <div className="col-md-12 margin-10-top">
                            <ContactsList
                                contacts={this.props.contacts}
                                contactsPagination={this.props.contactsPagination}
                                showCheckboxList={this.state.showCheckboxList}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                onSubmitFilter={() => this.onSubmitFilter()}
                                fetchContactsData={() => this.fetchContactsData()}
                                handlePageClick={this.handlePageClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.list,
        contactsFilters: state.contacts.filters,
        contactsSorts: state.contacts.sorts,
        contactsPagination: state.contacts.pagination,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchContacts, clearContacts, setCheckedContactAll, setTypeFilter, clearFilterContacts, setContactsPagination }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListApp);