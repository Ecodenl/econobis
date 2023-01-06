import React from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory} from "react-router";
import QuotationRequestPlanNewPlanningPanel from "./QuotationRequestPlanNewPlanningPanel";

export default function QuotationRequestPlanNewApp(props) {
    return (
        <div className="row">
            <div className="col-md-9">
                <div className="col-md-12 margin-10-top">
                    <Panel>
                        <PanelBody className={'panel-small'}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="btn-group" role="group">
                                        <ButtonIcon iconName={'glyphicon-arrow-left'}
                                                    onClickAction={browserHistory.goBack}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Afspraak plannen</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <QuotationRequestPlanNewPlanningPanel districtId={props.params.districtId} opportunityId={props.params.opportunityId} />
                </div>
            </div>
            <div className="col-md-3"/>
        </div>
    );
}