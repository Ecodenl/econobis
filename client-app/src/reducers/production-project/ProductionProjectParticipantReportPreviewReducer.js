export default function (state = [], action) {
    switch (action.type) {
        case 'PRODUCTION_PROJECT_PARTICIPANT_PREVIEW_REPORT':
            return {
                ...action.data,
            };
        case 'CLEAR_PRODUCTION_PROJECT_PARTICIPANT_PREVIEW_REPORT':
            return state.productionProjectParticipantReportPreview = [];

        default:
            return state;
    }
}