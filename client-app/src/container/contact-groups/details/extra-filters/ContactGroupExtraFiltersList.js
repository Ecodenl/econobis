import React from 'react';
import { connect } from 'react-redux';

import ContactGroupExtraFilterItem from './ContactGroupExtraFilterItem';

const ContactGroupExtraFiltersList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Veld</div>
                <div className="col-sm-3">Type</div>
                <div className="col-sm-3">Waarde</div>
            </div>
            {props.extraFilters.length > 0 ? (
                props.extraFilters.map(extraFilter => {
                    return <ContactGroupExtraFilterItem key={extraFilter.id} extraFilter={extraFilter} />;
                })
            ) : (
                <div>Geen extra filters bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        extraFilters: state.contactGroupDetails.extraFilters,
    };
};
export default connect(mapStateToProps)(ContactGroupExtraFiltersList);
