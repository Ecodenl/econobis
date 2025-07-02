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
