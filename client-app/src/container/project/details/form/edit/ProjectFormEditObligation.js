import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../../components/form/InputText';
import InputToggle from '../../../../../components/form/InputToggle';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import { startCase } from 'lodash';

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
    projectTypes,
    projectTypeId,
}) => {
    const activeValueCourse = valueCourses.find(valueCourse => valueCourse.active);

    const checkEditObligationIds = [];
    projectTypes.map(projectType => {
        if (
            projectType.codeRef === 'obligation' ||
            projectType.codeRef === 'capital' ||
            projectType.codeRef === 'postalcode_area_capital'
        ) {
            checkEditObligationIds.push(projectType.id);
        }
    });
    const showEditObligation = checkEditObligationIds.includes(Number(projectTypeId));

    const formatParticipation =
        projectTypes.find(projectType => projectType.codeRef === 'obligation').id == projectTypeId
            ? 'obligatie'
            : 'participatie';

    if (showEditObligation) {
        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Obligatie, kapitaal en postcoderoos</h4>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={`Nominale waarde ${formatParticipation}`}
                        name={'participationWorth'}
                        value={participationWorth}
                        onChangeAction={handleInputChange}
                    />
                    <InputText
                        label={`Uitgegeven ${formatParticipation}s`}
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
                        label={`${startCase(formatParticipation)}s in optie`}
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
                        label={`Uit te geven ${formatParticipation}s`}
                        name={'issuableParticipations'}
                        value={issuableParticipations ? issuableParticipations : ''}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={`Aantal ${formatParticipation}s nodig`}
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
                        label={`Minimaal aantal ${formatParticipation}s p/p`}
                        name={'minParticipations'}
                        value={minParticipations}
                        onChangeAction={handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={`Max aantal ${formatParticipation}s p/p`}
                        name={'maxParticipations'}
                        value={maxParticipations}
                        onChangeAction={handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={`Max aantal ${formatParticipation}s jeugd`}
                        name={'maxParticipationsYouth'}
                        value={maxParticipationsYouth}
                        onChangeAction={handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputToggle
                        label={`${startCase(formatParticipation)}s overdraagbaar`}
                        name={'isParticipationTransferable'}
                        value={isParticipationTransferable}
                        onChangeAction={handleInputChange}
                    />
                </div>
            </React.Fragment>
        );
    }
    return null;
};

const mapStateToProps = state => {
    return {
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectFormEditObligation);
