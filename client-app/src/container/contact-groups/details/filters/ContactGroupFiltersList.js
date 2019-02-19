import React from 'react';
import { connect } from 'react-redux';

import ContactGroupFilterItem from './ContactGroupFilterItem';

const ContactGroupFiltersList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Veld</div>
                <div className="col-sm-3">Waarde</div>
            </div>
            {props.filters.length > 0 ? (
                props.filters.map(filter => {
                    return <ContactGroupFilterItem key={filter.id} filter={filter} />;
                })
            ) : (
                <div>Geen filters bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        filters: state.contactGroupDetails.filters,
    };
};
export default connect(mapStateToProps)(ContactGroupFiltersList);
