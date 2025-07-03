import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAPI from '../../../../api/user/UserAPI';

import { updateRole } from '../../../../actions/user/UserDetailsActions';
import InputToggle from '../../../../components/form/InputToggle';

class UserDetailsFormRoleListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.role,
        };
    }

    handleInputChange = event => {
        const target = event.target;
        if (!target.checked) {
            UserAPI.removeRole(this.props.id, this.state.id)
                .then(() => {
                    this.setState({
                        ...this.state,
                        hasRole: !this.state.hasRole,
                    });
                    this.props.updateRole(target.id, false);
                })
                .catch(function() {
                    alert('Je hebt niet de rechten om deze rol toe te kennen');
                });
        } else {
            UserAPI.addRole(this.props.id, this.state.id)
                .then(() => {
                    this.setState({
                        ...this.state,
                        hasRole: !this.state.hasRole,
                    });
                    this.props.updateRole(target.id, true);
                })
                .catch(function() {
                    alert('Je hebt niet de rechten om deze rol toe te kennen');
                });
        }
    };

    render() {
        const { id, name, hasRole } = this.state;

        return (
            <InputToggle
                label={name}
                id={id}
                name={'name'}
                value={hasRole}
                size="col-sm-5"
                onChangeAction={this.handleInputChange}
                {...(name === 'Projectmanager' && {
                    textToolTip: "Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Projecten zichtbaar en kan de gebruiker de functionaliteiten Projecten gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Deelnames en Waardestaten zichtbaar en te gebruiken. Een gebruiker met de rol Projectmanager kan Contactgegevens inzien, wijzigingen aanbrengen en contacten verwijderen. Deze gebruiker kan projecten aanmaken en wijzigen maar geen deelnames wijzigen."
                })}
                {...(name === 'Participatie medewerker' && {
                    textToolTip: "Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Projecten zichtbaar en kan de gebruiker de functionaliteiten Projecten gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Deelnames en Waardestaten zichtbaar en te gebruiken. Een gebruiker met de rol Participatiemedewerker kan Contactgegevens inzien, wijzigingen aanbrengen en contacten verwijderen. Deze gebruiker kan deelnames wijzigingen en verwijderen. Maar geen wijzigingen in het project aanbrengen."
                })}
                {...(name === 'Beheerder' && {
                        textToolTip: "Als een gebruiker deze rol toegewezen krijgt kan zij/hij alle opties in het linkmenu zien en krijgt alle rechten voor wijzigen/aanmaken/verwijderen."
                })}
                {...(name === 'Energie adviseur' && {
                        textToolTip: "Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Energieadviseur kan Contactgegevens inzien maar geen wijzigingen aanbrengen in Contactgegevens. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact."
                })}
                {...(name === 'Buurtaanpak manager' && {
                        textToolTip: "Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Buurtaanpak manager kan Contactgegevens toevoegen en wijzigingen maar niet verwijderen. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact."
                })}
                {...(name === 'Buurtaanpak coördinator' && {
                        textToolTip: "Als deze rol wordt toegewezen, wordt voor de gebruiker in het linkermenu de optie Energiebesparing zichtbaar en kan de gebruiker de functionaliteiten Energiebesparing gebruiken. Ook worden voor de gebruiker op de Contactpagina in het rechtermenu de onderdelen Intakes, Kansen en Woningdossiers zichtbaar en te gebruiken. Een gebruiker met de rol Buurtaanpak coordinator kan Contactgegevens inzien maar niet toevoegen, wijzigingen of verwijderen. Deze gebruiker kan wel Intakes, Kansen en Woningdossiers toevoegen, wijzigen of verwijderen bij het Contact."
                })}
                {...(name === 'Marketing medewerker' && {
                        textToolTip: "Als deze rol wordt toegewezen krijgt de gebruiker in het linkermenu de optie Energiebesparing en in het rechtermenu op de contactpagina de opties Intakes, Kansen en Woningdossiers te zien . De rol Marketing medewerker mag contacten wijzigingen en verwijderen. Intakes, Kansen en Woningdossiers mogen niet worden toegevoegd, gewijzigd of verwijderd worden. De gebruiker met de rol Marketing medewerker mag Campagnes aanmaken."
                })}
                {...(name === 'Financieel medewerker' && {
                        textToolTip: "Als deze rol wordt toegewezen krijgt de gebruiker in het linkermenu de optie Financieel en in het rechtermenu op de contactpagina de opties Orders en Nota’s te zien . De rol Financieel medewerker mag contacten, orders en nota;s wijzigingen en verwijderen."
                })}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateRole: (id, value) => {
        dispatch(updateRole(id, value));
    },
});

export default connect(null, mapDispatchToProps)(UserDetailsFormRoleListItem);
