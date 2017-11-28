import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../components/button/ButtonIcon';
import ContactsListExtraFilters from './ContactsListExtraFilters';
import ContactsDeleteSelectedItems from './ContactsDeleteSelectedItems';

class ContactsListToolbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            showExtraFilters: false,
            showDeleteSelectedItems: false,
        };
    }

    toggleShowExtraFilters = () => {
        this.setState({
            showExtraFilters: !this.state.showExtraFilters
        });
    };

    toggleShowDeleteSelectedItems = () => {
        this.setState({
            showDeleteSelectedItems: !this.state.showDeleteSelectedItems
        });
    };

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };

    render() {
        const { permissions = {} } = this.props.meDetails;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.refreshContactsData} />
                        { (permissions.createPerson || permissions.createAccount) &&
                            <div className="nav navbar-nav btn-group" role="group">
                                <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                    <span className="glyphicon glyphicon-plus"/>
                                </button>
                                <ul className="dropdown-menu">
                                    {   permissions.createPerson &&
                                            <li><Link to="contact/nieuw/persoon">Persoon</Link></li>
                                    }
                                        {permissions.createAccount &&
                                            <li><Link to="contact/nieuw/bedrijf">Bedrijf</Link></li>
                                    }
                                </ul>
                            </div>
                        }
                        <ButtonIcon iconName={"glyphicon-trash"} onClickAction={this.toggleShowDeleteSelectedItems} />
                        <ButtonIcon iconName={"glyphicon-save"} />
                        <ButtonIcon iconName={"glyphicon-ok"} onClickAction={this.props.toggleShowCheckboxList} />
                    </div>
                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Contacten</h3></div>
                <div className="col-md-4">
                    {/*<button type="button" className="btn btn-success btn-sm pull-right" onClick={this.toggleShowExtraFilters}>Extra filters</button>*/}
                </div>
                {
                    this.state.showExtraFilters && <ContactsListExtraFilters toggleShowExtraFilters={this.toggleShowExtraFilters} />
                }
                {
                    this.state.showDeleteSelectedItems && <ContactsDeleteSelectedItems toggleShowDeleteSelectedItems={this.toggleShowDeleteSelectedItems} />
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps, null)(ContactsListToolbar);