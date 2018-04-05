import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';
import {setBulkEmailToContactIds} from "../../../actions/email/BulkMailActions";

class OpportunitiesListToolbar extends Component {
    constructor(props) {
        super(props);
    }

    bulkEmailContacts = () => {

        let contactIds = [];
        this.props.opportunities.data.map((opportunity) => (opportunity.checked === true && (contactIds.push(opportunity.contactId))));

        //filter out duplicates
        let uniqueContactIds = [...new Set(contactIds)];

        this.props.setBulkEmailToContactIds(uniqueContactIds);

        hashHistory.push('/email/nieuw/bulk');
    };



    render() {
        const {permissions = {}} = this.props;
        const {meta = {}} = this.props.opportunities;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.resetOpportunitiesFilters} />
                        <div className="nav navbar-nav btn-group" role="group">
                            <button className="btn btn-success btn-sm" data-toggle="dropdown">
                                <span className="glyphicon glyphicon-share-alt"/>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a onClick={this.bulkEmailContacts}>Contacten emailen</a></li>
                            </ul>
                        </div>
                        <ButtonIcon iconName={"glyphicon-ok"} onClickAction={this.props.toggleShowCheckboxList}/>
                    </div>

                </div>
                <div className="col-md-4"><h3 className="text-center table-title">Kansen</h3></div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        opportunities: state.opportunities.list,
    }
};

const mapDispatchToProps = dispatch => ({
    setBulkEmailToContactIds: (contactIds) => {
        dispatch(setBulkEmailToContactIds(contactIds));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesListToolbar);

