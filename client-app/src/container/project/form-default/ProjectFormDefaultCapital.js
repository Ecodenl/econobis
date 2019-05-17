import React from 'react';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import ViewText from '../../../components/form/ViewText';

const ProjectFormDefaultCapital = ({
    participationWorth,
    totalParticipations,
    participationsDefinitive,
    participationsOptioned,
    powerKwAvailable,
    minParticipations,
    maxParticipations,
    maxParticipationsYouth,
    isParticipationTransferable,
    valueCourses,
    handleInputChange,
}) => {
    const activeValueCourse = valueCourses && valueCourses.find(valueCourse => valueCourse.active);
    const participationsAvailable = totalParticipations - participationsDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Participatie, Kapitaal of Postcoderoos kapitaal</h4>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Nominale waarde participatie'}
                    name={'participationWorth'}
                    value={participationWorth}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Uitgegeven participaties'}
                    value={participationsDefinitive || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde'}
                    value={activeValueCourse ? MoneyPresenter(activeValueCourse.bookWorth) : MoneyPresenter(0)}
                    className={'form-group col-sm-6'}
                />
                <ViewText
                    label={'Participaties in optie'}
                    value={participationsOptioned || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige overdrachtswaarde'}
                    value={activeValueCourse ? MoneyPresenter(activeValueCourse.transferWorth) : MoneyPresenter(0)}
                    className={'form-group col-sm-6'}
                />
                <ViewText
                    label={'Uit te geven participaties'}
                    value={participationsAvailable || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Aantal participaties nodig'}
                    name={'totalParticipations'}
                    value={totalParticipations}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    type={'number'}
                    label={'Opgesteld vermogen kWh'}
                    name={'powerKwAvailable'}
                    value={powerKwAvailable}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Min. aantal participaties p/p'}
                    name={'minParticipations'}
                    value={minParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max. aantal participaties p/p'}
                    name={'maxParticipations'}
                    value={maxParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max. aantal participaties jeugd'}
                    name={'maxParticipationsYouth'}
                    value={maxParticipationsYouth}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputToggle
                    label={'Participaties overdraagbaar'}
                    name={'isParticipationTransferable'}
                    value={isParticipationTransferable}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormDefaultCapital;
