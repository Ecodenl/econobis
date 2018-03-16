import React, {Component} from 'react';
import {connect} from "react-redux";

import ButtonIcon from '../../../components/button/ButtonIcon';
import {hashHistory} from "react-router";
import {setBulkEmailToContactIds} from "../../../actions/email/BulkMailActions";

class IntakesListToolbar extends Component {
    constructor(props) {
        super(props);
    }

    bulkEmailContacts = () => {

        let contactIds = [];
        this.props.intakes.data.map((intake) => (intake.checked === true && (contactIds.push(intake.contactId))));

        this.props.setBulkEmailToContactIds(contactIds);

        hashHistory.push('/email/nieuw/bulk');
    };

    render() {
        const {meta = {}} = this.props.intakes;

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="btn-group" role="group">
                        <ButtonIcon iconName={"glyphicon-refresh"} onClickAction={this.props.resetIntakeFilters}/>
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
                <div className="col-md-4"><h3 className="text-center table-title">Intakes</h3></div>
                <div className="col-md-4">
                    <div className="pull-right">Resultaten: {meta.total || 0}</div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        intakes: state.intakes.list,
    };
};

const mapDispatchToProps = dispatch => ({
    setBulkEmailToContactIds: (contactIds) => {
        dispatch(setBulkEmailToContactIds(contactIds));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(IntakesListToolbar);