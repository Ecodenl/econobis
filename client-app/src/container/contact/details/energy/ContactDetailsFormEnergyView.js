import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../../components/form/ViewText';

const ContactDetailsFormEnergyView = props => {
    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Energiemaatschappij"}
                    value={'Van de bron'}
                />
                <ViewText
                    label={"Energiemaatschappij gas"}
                    value={'Nuon'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Klantnummer EM"
                    value={'123456'}
                />

                <ViewText
                    label="Klantnummer EM gas"
                    value={'654321'}
                />
            </div>

            <div className="row">
                <ViewText
                    label="EAN elektriciteit"
                    value={ '' }
                />

                <ViewText
                    label={"EAN gas"}
                    value={ '' }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Klant sinds"
                    value={ '' }
                />
                <ViewText
                    label={"Mogelijke overstap"}
                    value={ '' }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Overstap status"
                    value={ '' }
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormEnergyView);