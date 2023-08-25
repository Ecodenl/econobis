export function mapEmojiToStatuses(statusses) {
    return statusses.map(status => {
        return {
            ...status,
            name: getStatusIcon(status.id) + ' ' + status.name,
        }
    });
}

export function getStatusIcon(statusId) {
    switch (statusId) {
        case 'unread':
            return '✉️'
        case 'read':
            return '📭';
        case 'in_progress':
            return '⏳';
        case 'urgent':
            return '❗';
        case 'closed':
            return '✔️';
        default:
            return '';
    }
}
