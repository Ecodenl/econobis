import React from 'react';
import {connect} from 'react-redux';

import AdministrationDetailsSepasItem from "./AdministrationDetailsSepasItem";

const AdministrationDetailsSepasList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Id</div>
                <div className="col-sm-3">Naam</div>
                <div className="col-sm-3">Datum</div>
                <div className="col-sm-3">Type</div>
            </div>
            {
                props.sepas.length > 0 ?
                    props.sepas.map(sepa => {
                        return <AdministrationDetailsSepasItem
                            key={sepa.id}
                            sepa={sepa}
                        />;
                    })
                    :
                    <div>Geen sepa bestanden bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        sepas: state.administrationDetails.sepas,
    };
};

export default connect(mapStateToProps)(AdministrationDetailsSepasList);

