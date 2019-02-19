import React from 'react';
import { connect } from 'react-redux';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import { startCase } from 'lodash';

const ProjectFormViewObligation = ({
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
    projectTypes,
    projectTypeId,
}) => {
    const checkViewObligationIds = [];
    projectTypes.map(projectType => {
        if (
            projectType.codeRef === 'obligation' ||
            projectType.codeRef === 'capital' ||
            projectType.codeRef === 'postalcode_link_capital'
        ) {
            checkViewObligationIds.push(projectType.id);
        }
    });
    const showViewObligation = checkViewObligationIds.includes(Number(projectTypeId));

    const formatParticipation =
        projectTypes.find(projectType => projectType.codeRef === 'obligation').id == projectTypeId
            ? 'obligatie'
            : 'participatie';

    if (showViewObligation) {
        const activeValueCourse = valueCourses.find(valueCourse => valueCourse.active);

        return (
            <React.Fragment>
                <hr style={{ margin: '10px 0' }} />
                <h4>Obligatie, kapitaal en postcoderoos</h4>
                <div className="row">
                    <ViewText label={`Nominale waarde ${formatParticipation}`} value={participationWorth} />
                    <ViewText
                        label={`Uitgegeven ${formatParticipation}s`}
                        value={issuedParticipations ? issuedParticipations : ''}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Huidige boekwaarde'}
                        value={activeValueCourse && MoneyPresenter(activeValueCourse.bookWorth)}
                    />
                    <ViewText
                        label={`${startCase(formatParticipation)}s in optie`}
                        value={participationsInOption ? participationsInOption : ''}
                    />
                </div>
                <div className="row">
                    <ViewText
                        label={'Huidige overdrachtswaarde'}
                        value={activeValueCourse && MoneyPresenter(activeValueCourse.transferWorth)}
                    />
                    <ViewText
                        label={`Uit te geven ${formatParticipation}s`}
                        value={issuableParticipations ? issuableParticipations : ''}
                    />
                </div>
                <div className="row">
                    <ViewText label={`Aantal ${formatParticipation}s nodig`} value={totalParticipations} />
                    <ViewText label={'Opgesteld vermogen kW'} value={powerKwAvailable} />
                </div>
                <div className="row">
                    <ViewText label={`Minimaal aantal ${formatParticipation}s p/p`} value={minParticipations} />
                </div>
                <div className="row">
                    <ViewText label={`Max aantal ${formatParticipation}s p/p`} value={maxParticipations} />
                </div>
                <div className="row">
                    <ViewText label={`Max aantal ${formatParticipation}s jeugd`} value={maxParticipationsYouth} />
                </div>
                <div className="row">
                    <ViewText
                        label={`${startCase(formatParticipation)}s overdraagbaar`}
                        value={isParticipationTransferable}
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

export default connect(mapStateToProps)(ProjectFormViewObligation);
