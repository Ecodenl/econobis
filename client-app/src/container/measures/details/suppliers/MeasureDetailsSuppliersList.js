import React from 'react';
import {connect} from 'react-redux';

import MeasureDetailsSupplierItem from "./MeasureDetailsSupplierItem";

const MeasureDetailsSuppliersList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-5">Organisatie</div>
                <div className="col-sm-6">Plaats</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.suppliers.length > 0 ?
                    props.suppliers.map(supplier => {
                        return <MeasureDetailsSupplierItem
                            key={supplier.id}
                            supplier={supplier}
                        />;
                    })
                    :
                    <div>Geen leveranciers bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        suppliers: state.measureDetails.suppliers,
    };
};
export default connect(mapStateToProps)(MeasureDetailsSuppliersList);

