import React from 'react';
import { connect } from 'react-redux';
import InputText from '../../../../components/form/InputText';
import InputToggle from '../../../../components/form/InputToggle';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';
import { startCase } from 'lodash';

const ProjectFormNewObligation = ({
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
    const checkNewObligationIds = [];
    projectTypes.map(projectType => {
        if (
            projectType.codeRef === 'obligation' ||
            projectType.codeRef === 'capital' ||
            projectType.codeRef === 'postalcode_link_capital'
        ) {
            checkNewObligationIds.push(projectType.id);
        }
    });
    const showNewObligation = checkNewObligationIds.includes(Number(projectTypeId));

    const formatParticipation =
        projectTypes.find(projectType => projectType.codeRef === 'obligation').id == projectTypeId
            ? 'obligatie'
            : 'participatie';

    if (showNewObligation) {
        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Obligatie, Kapitaal of Postcoderoos kapitaal</h4>
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
                        value={''}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText label={'Huidige boekwaarde'} name={'activeBookWorth'} value={''} readOnly={true} />
                    <InputText
                        label={`${startCase(formatParticipation)}s in optie`}
                        name={'participationsInOption'}
                        value={''}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Huidige overdrachtswaarde'}
                        name={'activeTransferWorth'}
                        value={''}
                        readOnly={true}
                    />
                    <InputText
                        label={`Uit te geven ${formatParticipation}s`}
                        name={'issuableParticipations'}
                        value={''}
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

export default connect(mapStateToProps)(ProjectFormNewObligation);
