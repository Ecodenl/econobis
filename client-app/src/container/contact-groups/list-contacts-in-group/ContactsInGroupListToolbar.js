import React, {Component} from 'react';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

class ContactsInGroupListToolbar extends Component {
    constructor(props){
        super(props);
    }

    newContact = () => {
        hashHistory.push(`/contact/nieuw`);
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.refreshContactsInGroupData} />
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-plus" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to="contact/nieuw/persoon">Persoon</Link></li>
                                <li><Link to="contact/nieuw/bedrijf">Bedrijf</Link></li>
                            </ul>
                        </div>
                        <ButtonIcon iconName={"glyphicon-save"} />
                    </div>
                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Contacten in groep</h3></div>
                <div className="col-md-4" />
            </div>
        );
    };
};

export default ContactsInGroupListToolbar;