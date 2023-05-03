import React, {useState} from 'react';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PanelHeader from "../../../components/panel/PanelHeader";
import DistrictDetailsCoachesListItem from "./DistrictDetailsCoachesListItem";
import DistrictDetailsCoachesNew from "./DistrictDetailsCoachesNew";

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

export default function DistrictDetailsCoaches({district, onChange}) {
    const [showNew, setShowNew] = useState(false);

    return (
        <Panel>
            <PanelHeader>
                <span className="h5 text-bold">Gekoppelde coaches</span>
                <a role="button" className="pull-right" onClick={() => setShowNew(true)}>
                    <Icon size={14} icon={plus} />
                </a>
            </PanelHeader>
            <PanelBody>
                <div className="col-md-12">
                    <div className="row border header">
                        <div className="col-sm-11">Naam</div>
                        <div className="col-sm-1"/>
                    </div>
                    {district.coaches.length > 0 ? (
                        district.coaches.map(coach => (
                            <DistrictDetailsCoachesListItem key={coach.id} district={district} coach={coach} onDetach={onChange}/>
                        ))
                    ) : (
                        <div>Geen coaches bekend.</div>
                    )}
                </div>
                <div className="col-md-12 margin-10-top">
                    {showNew && <DistrictDetailsCoachesNew district={district} onCreate={() => {setShowNew(false) ;onChange();}} onHide={() => setShowNew(false)}/>}
                </div>
            </PanelBody>
        </Panel>
    );
}
