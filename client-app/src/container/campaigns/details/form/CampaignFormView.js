import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

import ViewText from '../../../../components/form/ViewText';

const CampaignFormView = props => {
    const {name, number, description, startDate, endDate, goal, status, measures, type} = props.campaign;

    return (
        <div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Naam"}
                    value={name}
                />
                <ViewText
                    label={"Campagne nummer"}
                    value={number}
                />
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <label htmlFor="description" className="col-sm-12">Beschrijving</label>
                </div>
                <div className="col-sm-9" id="description">
                    {description}
                </div>
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Begindatum"}
                    value={startDate ? moment(startDate).format('L') : ''}
                />
                <ViewText
                    label={"Einddatum"}
                    value={endDate ? moment(endDate).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Doel"}
                    value={goal}
                />
                <ViewText
                    label={"Status"}
                    value={status ? status.name : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={"Aangeboden maatregelen"}
                    value={ measures && measures.map((measure) => measure.name).join(', ') }
                />
                <ViewText
                    label={"Type"}
                    value={type ? type.name : ''}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaign,
    }
};

export default connect(mapStateToProps)(CampaignFormView);