import React from 'react';
import {useSelector} from 'react-redux'
import InputSelectGroup from "../form/InputSelectGroup";

export default function ResponsibleInputSelect({values, onChangeAction}) {
    const teams = useSelector((state) => state.systemData.teams);
    const users = useSelector((state) => state.systemData.users);

    const setResonsibleValue = (val) => {
        let updatedValues = {
            responsibleUserId: null,
            responsibleTeamId: null,
        };

        if (val.indexOf('user') === 0) {
            updatedValues.responsibleUserId = val.replace('user', '');
        }

        if (val.indexOf('team') === 0) {
            updatedValues.responsibleTeamId = val.replace('team', '');
        }

        onChangeAction(updatedValues);
    }

    const getResponsibleValue = () => {
        if (values.responsibleUserId) {
            return 'user' + values.responsibleUserId;
        }
        if (values.responsibleTeamId) {
            return 'team' + values.responsibleTeamId;
        }

        return '';
    }

    return (
        <InputSelectGroup
            label={'Verantwoordelijke'}
            size={'col-sm-6'}
            name={'responsible'}
            optionsInGroups={[
                {
                    name: 'user',
                    label: 'Gebruikers',
                    options: users,
                    optionName: 'fullName',
                },
                {name: 'team', label: 'Teams', options: teams},
            ]}
            value={getResponsibleValue()}
            onChangeAction={(e) => setResonsibleValue(e.target.value)}
        />
    );
}

