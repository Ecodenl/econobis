import React from 'react';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';
import MoneyPresenter from '../../../helpers/MoneyPresenter';
import ViewText from '../../../components/form/ViewText';

const ProjectFormEditObligation = ({
    participationWorth,
    totalParticipations,
    participationsDefinitive,
    participationsGranted,
    participationsOptioned,
    participationsInteressed,
    minParticipations,
    maxParticipations,
    isParticipationTransferable,
    valueCourses,
    handleInputChange,
}) => {
    const activeValueCourse = valueCourses && valueCourses.find(valueCourse => valueCourse.active);
    const participationsAvailable = totalParticipations - participationsDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligatie</h4>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Nominale waarde obligatie'}
                    name={'participationWorth'}
                    value={participationWorth}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Obligaties interesse'}
                    value={participationsInteressed || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige hoofdsom'}
                    value={activeValueCourse ? MoneyPresenter(activeValueCourse.bookWorth) : MoneyPresenter(0)}
                    className={'form-group col-sm-6'}
                />
                <ViewText
                    label={'Obligaties ingeschreven'}
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
                    label={'Obligaties toegekend'}
                    value={participationsGranted || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Aantal obligaties nodig'}
                    name={'totalParticipations'}
                    value={totalParticipations}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Uitgegeven obligaties'}
                    value={participationsDefinitive || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Min. aantal obligaties p/p'}
                    name={'minParticipations'}
                    value={minParticipations}
                    onChangeAction={handleInputChange}
                />
                <ViewText
                    label={'Uit te geven obligaties'}
                    value={participationsAvailable || 0}
                    className={'form-group col-sm-6'}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max. aantal obligaties p/p'}
                    name={'maxParticipations'}
                    value={maxParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputToggle
                    label={'Obligaties overdraagbaar'}
                    name={'isParticipationTransferable'}
                    value={isParticipationTransferable}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormEditObligation;
