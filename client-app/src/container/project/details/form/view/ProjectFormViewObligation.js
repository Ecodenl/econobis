import React from 'react';
import ViewText from '../../../../../components/form/ViewText';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const ProjectFormViewObligation = ({
    participationWorth,
    totalParticipations,
    participationsDefinitive,
    participationsGranted,
    participationsOptioned,
    participationsInteressed,
    powerKwAvailable,
    minParticipations,
    maxParticipations,
    isParticipationTransferable,
    valueCourses,
}) => {
    const activeValueCourse = valueCourses ? valueCourses.find(valueCourse => valueCourse.active) : [];
    const participationsAvailable = totalParticipations - participationsDefinitive;

    return (
        <React.Fragment>
            <hr style={{ margin: '10px 0' }} />
            <h4>Obligatie, Kapitaal of Postcoderoos kapitaal</h4>
            <div className="row">
                <ViewText label={'Nominale waarde obligatie'} value={MoneyPresenter(participationWorth)} />
                <ViewText
                    label={'Obligaties interesse'}
                    value={participationsInteressed ? participationsInteressed : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige hoofdsom'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.bookWorth)}
                />
                <ViewText
                    label={'Obligaties ingeschreven'}
                    value={participationsOptioned ? participationsOptioned : ''}
                />
            </div>
            <div className="row">
                <ViewText
                    label={'Huidige overdrachtswaarde'}
                    value={activeValueCourse && MoneyPresenter(activeValueCourse.transferWorth)}
                />
                <ViewText label={'Obligaties toegekend'} value={participationsGranted ? participationsGranted : ''} />
            </div>
            <div className="row">
                <ViewText label={'Aantal obligaties nodig'} value={totalParticipations} />
                <ViewText
                    label={'Uitgegeven obligaties'}
                    value={participationsDefinitive ? participationsDefinitive : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Min. obligaties p/p'} value={minParticipations} />
                <ViewText
                    label={'Uit te geven obligaties'}
                    value={participationsAvailable ? participationsAvailable : ''}
                />
            </div>
            <div className="row">
                <ViewText label={'Max. aantal obligaties p/p'} value={maxParticipations} />
                <ViewText label={'Opgesteld vermogen kWp'} value={powerKwAvailable} />
            </div>
            <div className="row">
                <ViewText label={'Obligaties overdraagbaar'} value={isParticipationTransferable ? 'Ja' : 'Nee'} />
            </div>
        </React.Fragment>
    );
};

export default ProjectFormViewObligation;
