import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory, hashHistory} from "react-router";
import DistrictAPI from "../../../api/district/DistrictAPI";
import DistrictGeneralEditForm from "../generic/DistrictGeneralEditForm";

export default function DistrictNewApp() {
    const handleSubmit = (values, {setSubmitting}) => {
        DistrictAPI.newDistrict(values)
            .then(district => {
                hashHistory.push(`/afspraak-kalender/${district.id}`);
            })
            .catch(() => {
                setSubmitting(false);
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    };

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className="panel-small">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group btn-group-flex margin-small" role="group">
                                        <ButtonIcon iconName={'arrowLeft'}
                                                    onClickAction={browserHistory.goBack}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center margin-small">Nieuwe Afspraakkalender</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <DistrictGeneralEditForm initialValues={{}} onSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    );
};
