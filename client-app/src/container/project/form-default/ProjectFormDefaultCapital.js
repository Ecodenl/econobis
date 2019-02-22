import React from 'react';
import InputText from '../../../components/form/InputText';
import InputToggle from '../../../components/form/InputToggle';
import MoneyPresenter from '../../../helpers/MoneyPresenter';

const ProjectFormDefaultCapital = ({
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
    const activeValueCourse = valueCourses && valueCourses.find(valueCourse => valueCourse.active);

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
                <InputText
                    label={'Uitgegeven participaties'}
                    name={'issuedParticipations'}
                    value={issuedParticipations ? issuedParticipations : ''}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige boekwaarde'}
                    name={'activeBookWorth'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.bookWorth)}
                    readOnly={true}
                />
                <InputText
                    label={'Participaties in optie'}
                    name={'participationsInOption'}
                    value={participationsInOption ? participationsInOption : ''}
                    readOnly={true}
                />
            </div>
            <div className="row">
                <InputText
                    label={'Huidige overdrachtswaarde'}
                    name={'activeTransferWorth'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.transferWorth)}
                    readOnly={true}
                />
                <InputText
                    label={'Uit te geven participaties'}
                    name={'issuableParticipations'}
                    value={issuableParticipations ? issuableParticipations : ''}
                    readOnly={true}
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
                    label={'Opgesteld vermogen kW'}
                    name={'powerKwAvailable'}
                    value={powerKwAvailable}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Minimaal aantal participaties p/p'}
                    name={'minParticipations'}
                    value={minParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max aantal participaties p/p'}
                    name={'maxParticipations'}
                    value={maxParticipations}
                    onChangeAction={handleInputChange}
                />
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Max aantal participaties jeugd'}
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
