import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import AdministrationDetailsFormGeneral from './general/AdministrationDetailsFormGeneral';
import AdministrationDetailsUsers from './administration-users/AdministrationDetailsUsers';
import Panel from "../../../components/panel/Panel";
import PanelHeader from "../../../components/panel/PanelHeader";

class AdministrationDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.teamDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <AdministrationDetailsFormGeneral />
                    <AdministrationDetailsUsers />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        teamDetails: state.teamDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: (id) => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministrationDetailsForm);
