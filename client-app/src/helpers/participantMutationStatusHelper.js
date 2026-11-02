export const getParticipantMutationStatusName = (status, projectTypeCodeRef) => {
    if (projectTypeCodeRef === 'energy_community' && (status.codeRef || status.code_ref) === 'final') {
        return 'Deelnemer';
    }

    return status.name;
};
