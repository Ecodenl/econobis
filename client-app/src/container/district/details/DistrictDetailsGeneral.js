import React, {useState} from 'react';
import DistrictDetailsGeneralEdit from "./DistrictDetailsGeneralEdit";
import DistrictDetailsGeneralView from "./DistrictDetailsGeneralView";

export default function DistrictDetailsGeneral({district, onSave}) {
    const [divClass, setDivClass] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className={divClass} onMouseEnter={() => setDivClass('panel-grey')} onMouseLeave={() => setDivClass('')}>
            {showEdit ? (
                <DistrictDetailsGeneralEdit district={district} switchToView={() => setShowEdit(false)} onSave={onSave}/>
            ) : (
                <DistrictDetailsGeneralView district={district} switchToEdit={() => setShowEdit(true)}/>
            )}
        </div>
    );
}
