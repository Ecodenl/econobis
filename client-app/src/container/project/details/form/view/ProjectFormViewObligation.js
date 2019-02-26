import React from 'react';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

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
}) => {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligatie, Kapitaal of Postcoderoos kapitaal</h4>
            <div className="row">
                <ViewText label={'Nominale waarde obligatie'} value={MoneyPresenter(participationWorth)} />
                <ViewText label={'Uitgegeven obligaties'} value={issuedParticipations ? issuedParticipations : ''} />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.bookWorth)}
                />
                <ViewText label={'Obligaties in optie'} value={participationsInOption ? participationsInOption : ''} />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige overdrachtswaarde'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.transferWorth)}
                />
                <ViewText
                    label={'Uit te geven obligaties'}
                    value={issuableParticipations ? issuableParticipations : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Aantal obligaties nodig'} value={totalParticipations} />
                <ViewText label={'Opgesteld vermogen kWh'} value={powerKwAvailable} />
            </div>
            <div className="row">
                <ViewText label={'Minimaal aantal obligaties p/p'} value={minParticipations} />
            </div>
            <div className="row">
                <ViewText label={'Max aantal obligaties p/p'} value={maxParticipations} />
            </div>
            <div className="row">
                <ViewText label={'Max aantal obligaties jeugd'} value={maxParticipationsYouth} />
            </div>
            <div className="row">
                <ViewText label={'Obligaties overdraagbaar'} value={isParticipationTransferable} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewObligation;
