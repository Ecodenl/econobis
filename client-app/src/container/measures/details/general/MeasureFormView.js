import React from 'react';
import {connect} from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const MeasureFormView = props => {
    const { name, number, description, measureCategory = {} } = props.measureDetails;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Maatregel categorie"}
                    value={measureCategory.name}
                />
                <ViewText
                    label={"Nummer"}
                    value={number}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Maatregel specifiek"}
                    value={name}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">Beschrijving</label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        measureDetails: state.measureDetails,
    }
};

export default connect(mapStateToProps)(MeasureFormView);