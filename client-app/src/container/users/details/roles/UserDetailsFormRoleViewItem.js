import React, { Component } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

class UserDetailsFormRoleViewItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, hasRole } = this.props.role;

        return (
            <div className="col-sm-6 border-bottom">
                <label className="col-sm-6">{name}</label>
                <span className="col-sm-6">{hasRole ? 'Ja' : 'Nee'}
                    {name === 'Projectmanager' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Projecten zichtbaar en kan de gebruiker de functionaliteiten Projecten gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Deelnames en Waardestaten zichtbaar en te gebruiken. Een gebruiker met de rol Projectmanager kan Contactgegevens inzien, wijzigingen aanbrengen en contacten verwijderen. Deze gebruiker kan projecten aanmaken en wijzigen maar geen deelnames wijzigen.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}

                    {name === 'Participatie medewerker' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Projecten zichtbaar en kan de gebruiker de functionaliteiten Projecten gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Deelnames en Waardestaten zichtbaar en te gebruiken. Een gebruiker met de rol Participatiemedewerker kan Contactgegevens inzien, wijzigingen aanbrengen en contacten verwijderen. Deze gebruiker kan deelnames wijzigingen en verwijderen. Maar geen wijzigingen in het project aanbrengen.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}

                    {name === 'Beheerder' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als een gebruiker deze rol toegewezen krijgt kan zij/hij alle opties in het linkmenu zien en krijgt alle rechten voor wijzigen/aanmaken/verwijderen.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}

                    {name === 'Energie adviseur' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Energieadviseur kan Contactgegevens inzien maar geen wijzigingen aanbrengen in Contactgegevens. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}

                    {name === 'Buurtaanpak manager' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Buurtaanpak manager kan Contactgegevens toevoegen en wijzigingen maar niet verwijderen. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}

                    {name === 'Buurtaanpak coördinator' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Buurtaanpak coordinator kan Contactgegevens inzien maar niet toevoegen, wijzigingen of verwijderen. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}
                    {name === 'Marketing medewerker' && (
                        <>
                            &nbsp;&nbsp;
                            <FaInfoCircle
                                color={'blue'}
                                size={'15px'}
                                data-tip={
                                    'Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Marketing medewerker kan Contactgegevens inzien maar niet toevoegen, wijzigingen of verwijderen. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact.'
                                }
                                data-for={`tooltip-note`}
                            />
                            <ReactTooltip
                                id={`tooltip-note`}
                                effect="float"
                                place="right"
                                multiline={true}
                                aria-haspopup="true"
                            />
                        </>
                    )}
                </span>
            </div>
        );
    }
}

export default UserDetailsFormRoleViewItem;
