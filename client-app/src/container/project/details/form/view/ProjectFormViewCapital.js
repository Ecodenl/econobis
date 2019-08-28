import React from 'react';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const ProjectFormViewCapital = ({
    participationWorth,
    totalParticipations,
    participationsDefinitive,
    participationsGranted,
    participationsOptioned,
    participationsInteressed,
    powerKwAvailable,
    minParticipations,
    maxParticipations,
    maxParticipationsYouth,
    isParticipationTransferable,
    valueCourses,
}) => {
    const activeValueCourse = valueCourses.find(valueCourse => valueCourse.active);
    const participationsAvailable = totalParticipations - participationsDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligatie, Kapitaal of Postcoderoos kapitaal</h4>
            <div className="row">
                <ViewText label={'Nominale waarde participatie'} value={MoneyPresenter(participationWorth)} />
                <ViewText
                    label={'Participaties interesse'}
                    value={participationsInteressed ? participationsInteressed : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige boekwaarde'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.bookWorth)}
                />
                <ViewText
                    label={'Participaties ingeschreven'}
                    value={participationsOptioned ? participationsOptioned : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige overdrachtswaarde'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.transferWorth)}
                />
                <ViewText
                    label={'Participaties toegekend'}
                    value={participationsGranted ? participationsGranted : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Aantal participaties nodig'} value={totalParticipations} />
                <ViewText
                    label={'Uitgegeven participaties'}
                    value={participationsDefinitive ? participationsDefinitive : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Min. aantal participaties p/p'} value={minParticipations} />
                <ViewText
                    label={'Uit te geven participaties'}
                    value={participationsAvailable ? participationsAvailable : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Max. aantal participaties p/p'} value={maxParticipations} />
                <ViewText label={'Opgesteld vermogen kWh'} value={powerKwAvailable} />
            </div>
            <div className="row">
                <ViewText label={'Max. aantal participaties jeugd'} value={maxParticipationsYouth} />
            </div>
            <div className="row">
                <ViewText label={'Participaties overdraagbaar'} value={isParticipationTransferable ? 'Ja' : 'Nee'} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewCapital;
