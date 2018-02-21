import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';
import moment from "moment/moment";
moment.locale('nl');

const QuotationRequestDetailsFormConclusionView = props => {
    const { createdAt, updatedAt, updatedBy, createdBy } = props.quotationRequestDetails;

    return (
        <div>
            <div className="row">
                <ViewText
                    label={"Gemaakt door"}
                    value={createdBy ? createdBy.fullName : 'Onbekend'}
                />
                <ViewText
                    label={"Laatste gewijzigd door"}
                    value={updatedBy ? updatedBy.fullName : 'Onbekend'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={"Gemaakt op"}
                    value={createdAt ? moment(createdAt.date).format('L') : 'Onbekend'}
                />
                <ViewText
                    label={"Laatste gewijzigd op"}
                    value={updatedAt ? moment(updatedAt.date).format('L') : 'Onbekend'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        quotationRequestDetails: state.quotationRequestDetails,
    };
};

export default connect(mapStateToProps)(QuotationRequestDetailsFormConclusionView);