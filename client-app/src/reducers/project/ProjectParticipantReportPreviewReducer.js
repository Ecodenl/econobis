export default function(state = [], action) {
    switch (action.type) {
        case 'PROJECT_PARTICIPANT_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_PROJECT_PARTICIPANT_PREVIEW_REPORT':
            return (state.projectParticipantReportPreview = []);

        default:
            return state;
    }
}
