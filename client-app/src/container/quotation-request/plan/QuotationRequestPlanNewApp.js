import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory} from "react-router";
import QuotationRequestPlanNewPlanningPanel from "./QuotationRequestPlanNewPlanningPanel";
import DistrictAPI from "../../../api/district/DistrictAPI";

export default function QuotationRequestPlanNewApp(props) {
    const [district, setDistrict] = useState(false);

    useEffect(() => {
        DistrictAPI.fetchDistrictDetails(props.params.districtId).then(district => {
            setDistrict(district);
        });
    }, []);

    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'arrowLeft'}
                                                    onClickAction={browserHistory.goBack}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Afspraak plannen {district.name}</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <QuotationRequestPlanNewPlanningPanel district={district} opportunityId={props.params.opportunityId} />
                </div>
            </div>
            <div className="col-md-3"/>
        </div>
    );
}