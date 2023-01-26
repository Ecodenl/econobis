import React, {useEffect, useState} from 'react';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from '../../../components/form/InputSelect';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import DistrictAPI from "../../../api/district/DistrictAPI";
import InspectionPersonAPI from "../../../api/contact/InspectionPersonAPI";

export default function DistrictDetailsCoachesNew({district, onCreate, onHide}) {
    const [coaches, setCoaches] = useState([]);
    const [coachId, setCoachId] = useState(null);

    useEffect(function () {
        InspectionPersonAPI.getCoachPeek().then(response => {
            setCoaches(response);
        }).catch(() => {
            alert('Er is iets misgegaan met ophalen van de coaches! Herlaad de pagina en probeer het nogmaals.');
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        DistrictAPI.attachDistrictCoach({districtId: district.id, coachId: coachId}).then(() => {
            onCreate();
        }).catch(() => {
            alert('Er is iets misgegaan met het koppelen van de coach.');
        });
    };

    const getUnselectedCoaches = () => {
        return coaches.filter(coach => {
            return !district.coaches.some(districtCoach => districtCoach.id === coach.id);
        });
    }

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Afspraakkalender'}
                            name={'afspraakKalender'}
                            value={district.name}
                            readOnly={true}
                        />
                        <InputSelect
                            label={'Coach'}
                            size={'col-sm-6'}
                            name={'coachId'}
                            options={getUnselectedCoaches()}
                            optionName={'name'}
                            value={coachId}
                            onChangeAction={(event) => setCoachId(event.target.value)}
                            required={'required'}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={onHide}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                        />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}
