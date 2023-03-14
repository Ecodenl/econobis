import React, {useEffect, useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import ButtonIcon from "../../../components/button/ButtonIcon";
import {browserHistory} from "react-router";
import DistrictAPI from "../../../api/district/DistrictAPI";
import DistrictDetailsGeneral from "./DistrictDetailsGeneral";
import DistrictDetailsCoaches from "./DistrictDetailsCoaches";
import DistrictListItemDeleteModal from "./DistrictListItemDeleteModal";

export default function DistrictDetailsApp(props) {
    const [district, setDistrict] = useState({coaches: []});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        DistrictAPI.fetchDistrictDetails(props.params.id)
            .then(data => {
                setDistrict(data);
            })
            .catch(() => {
                alert('Er is iets misgegaan met ophalen van de afspraakkalender.');
            });
    }

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
                                        <DistrictListItemDeleteModal district={district} onDelete={browserHistory.goBack} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/>                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="text-center">Instellingen Afspraakkalender: {district.name}</h4>
                                </div>
                                <div className="col-md-4"/>
                            </div>
                        </PanelBody>
                    </Panel>
                </div>

                <div className="col-md-12 margin-10-top">
                    <DistrictDetailsGeneral district={district} onSave={fetch}/>
                    <DistrictDetailsCoaches district={district} onChange={fetch}/>
                </div>
            </div>
            <div className="col-md-3"/>
        </div>
    );
}
