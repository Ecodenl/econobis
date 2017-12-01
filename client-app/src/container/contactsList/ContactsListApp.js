import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';

import { fetchContacts, clearContacts, setCheckedContactAll } from '../../actions/ContactsActions';
import { setTypeFilter, setStatusFilter, clearFilter } from '../../actions/ContactsFiltersActions';
import ContactsList from './ContactsList';
import ContactsListToolbar from './ContactsListToolbar';
import filterHelper from '../../helpers/FilterHelper';

class ContactsListApp extends Component {
    constructor(props) {
        super(props);

        if(!isEmpty(props.params)) {
            switch(props.params.filter){
                case 'type':
                    this.props.clearFilter();
                    this.props.setTypeFilter(props.params.value);
                    break;
                case 'status':
                    this.props.clearFilter();
                    this.props.setStatusFilter(props.params.value);
                    break;
                default:
                    break;
            };
        };

        this.state = {
            showCheckboxList: false,
            checkedAllCheckboxes: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            const filters = filterHelper(this.props.contactsFilters);
            const sorts = this.props.contactsSorts.reverse();

            this.props.fetchContacts(filters, sorts);
        },100 );
    };

    componentWillReceiveProps(nextProps) {
        if(this.props.params.value !== nextProps.params.value){
            if(!isEmpty(nextProps.params)) {
                switch(nextProps.params.filter){
                    case 'type':
                        this.props.clearFilter();
                        this.props.setTypeFilter(nextProps.params.value);
                        break;
                    case 'status':
                        this.props.clearFilter();
                        this.props.setStatusFilter(nextProps.params.value);
                        break;
                    default:
                        break;
                };
            };

            setTimeout(() => {
                const filters = filterHelper(this.props.contactsFilters);
                const sorts = this.props.contactsSorts.reverse();

                this.props.clearContacts();
                this.props.fetchContacts(filters, sorts);
            }, 100);
        }
    }

    componentWillUnmount() {
        this.props.clearContacts();
    };

    refreshContactsData = () => {
        const filters = filterHelper(this.props.contactsFilters);
        const sorts = this.props.contactsSorts.reverse();

        this.props.clearContacts();
        this.props.fetchContacts(filters, sorts);
    };

    onSubmitFilter() {
        const filters = filterHelper(this.props.contactsFilters);
        const sorts = this.props.contactsSorts.reverse();

        this.props.clearContacts();
        this.props.fetchContacts(filters, sorts);
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

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-12 extra-space-above">
                            <ContactsListToolbar
                                refreshContactsData={() => this.refreshContactsData()}
                                toggleShowCheckboxList={() => this.toggleShowCheckboxList()}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                            />
                        </div>

                        <div className="col-md-12 extra-space-above">
                            <ContactsList
                                contacts={this.props.contacts}
                                showCheckboxList={this.state.showCheckboxList}
                                selectAllCheckboxes={() => this.selectAllCheckboxes()}
                                checkedAllCheckboxes={this.state.checkedAllCheckboxes}
                                onSubmitFilter={() => this.onSubmitFilter()}
                                refreshContactsData={() => this.refreshContactsData()}
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
        contacts: state.contacts,
        contactsFilters: state.contactsFilters,
        contactsSorts: state.contactsSorts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchContacts, clearContacts, setCheckedContactAll, setTypeFilter, setStatusFilter, clearFilter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsListApp);