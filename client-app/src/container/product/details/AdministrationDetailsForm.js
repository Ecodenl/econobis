import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import ProductDetailsFormGeneral from './general/ProductDetailsFormGeneral';
import ProductDetailsUsers from './administration-users/ProductDetailsUsers';
import moment from "moment/moment";
import PanelDeletedItem from "../../../components/panel/PanelDeletedItem";
import ProductDetailsFormConclusion from "./conclusion/ProductDetailsFormConclusion";
moment.locale('nl');

class ProductDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        const { deletedAt } = this.props.administrationDetails;
        return (
            isEmpty(this.props.administrationDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    { deletedAt &&
                    <PanelDeletedItem
                        text={`Deze administratie is verwijderd op ${moment(deletedAt).format('L')}.`}
                    />
                    }
                    <ProductDetailsFormGeneral />
                    <ProductDetailsUsers />
                    <ProductDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: (id) => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsForm);
