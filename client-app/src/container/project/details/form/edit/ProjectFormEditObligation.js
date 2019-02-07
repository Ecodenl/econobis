import React from 'react';
import InputText from '../../../../../components/form/InputText';
import InputToggle from '../../../../../components/form/InputToggle';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const ProjectFormEditObligation = ({
    participationWorth,
    issuedParticipations,
    participationsInOption,
    issuableParticipations,
    totalParticipations,
    powerKwAvailable,
    minParticipations,
    maxParticipations,
    maxParticipationsYouth,
    isParticipationTransferable,
    valueCourses,
    handleInputChange,
}) => {
    const activeValueCourse = valueCourses.find(valueCourse => valueCourse.active);

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligatie, kapitaal en postcoderoos</h4>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Nominale waarde deelname'}
                    name={'participationWorth'}
                    value={participationWorth}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    label={'Uitgegeven deelnames'}
                    name={'issuedParticipations'}
                    value={issuedParticipations ? issuedParticipations : ''}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige boekwaarde'}
                    name={'activeBookWorth'}
                    value={MoneyPresenter(activeValueCourse.bookWorth)}
                    readOnly={true}
                />
                <InputText
                    label={'Deelnames in optie'}
                    name={'participationsInOption'}
                    value={participationsInOption ? participationsInOption : ''}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige overdrachtswaarde'}
                    name={'activeTransferWorth'}
                    value={MoneyPresenter(activeValueCourse.transferWorth)}
                    readOnly={true}
                />
                <InputText
                    label={'Uit te geven deelnames'}
                    name={'issuableParticipations'}
                    value={issuableParticipations ? issuableParticipations : ''}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Aantal deelnames nodig'}
                    name={'totalParticipations'}
                    value={totalParticipations}
                    onChangeAction={handleInputChange}
                />
                <InputText
                    type={'number'}
                    label={'Opgesteld vermogen kW'}
                    name={'powerKwAvailable'}
                    value={powerKwAvailable}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Minimaal aantal deelnames p/p'}
                    name={'minParticipations'}
                    value={minParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max aantal deelnames p/p'}
                    name={'maxParticipations'}
                    value={maxParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max aantal deelnames jeugd'}
                    name={'maxParticipationsYouth'}
                    value={maxParticipationsYouth}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputToggle
                    label={'Deelnames overdraagbaar'}
                    name={'isParticipationTransferable'}
                    value={isParticipationTransferable}
                    onChangeAction={handleInputChange}
                />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormEditObligation;
