export function getJoryFilter(values, folder, contactId, eigen = false) {
    let filter = {
        and: [
            {
                f: 'folder',
                d: folder,
            }
        ]
    }

    if (values.subject) {
        filter.and.push({
            f: 'subject',
            o: 'like',
            d: `%${values.subject}%`,
        })
    }

    if (values.from) {
        filter.and.push({
            f: 'from',
            o: 'like',
            d: `%${values.from}%`,
        })
    }

    if (values.contact) {
        filter.and.push({
            or: [
                {
                    f: 'contacts.fullName',
                    o: 'like',
                    d: `%${values.contact}%`,
                },
                {
                    f: 'manualContacts.fullName',
                    o: 'like',
                    d: `%${values.contact}%`,
                },
            ]
        })
    }

    if (values.mailbox) {
        filter.and.push({
            f: 'mailbox.name',
            o: 'like',
            d: `%${values.mailbox}%`,
        })
    }

    if (values.status) {
        filter.and.push({
            f: 'status',
            d: values.status,
        })
    }

    if (values.responsible) {
        filter.and.push({
            or: [
                {
                    f: 'responsibleUser.firstName',
                    o: 'like',
                    d: `%${values.responsible}%`,
                },
                {
                    f: 'responsibleUser.lastName',
                    o: 'like',
                    d: `%${values.responsible}%`,
                },
                {
                    f: 'responsibleTeam.name',
                    o: 'like',
                    d: `%${values.responsible}%`,
                },
            ]
        })
    }

    if (values.to) {
        filter.and.push({
            f: 'to',
            o: 'like',
            d: `%${values.to}%`,
        })
    }

    if (values.attachment) {
        filter.and.push({
            f: 'attachmentsWithoutCids.id',
            o: '>',
            d: 0,
        })
    }

    if (values.attachment) {
        filter.and.push({
            f: 'attachmentsWithoutCids.id',
            o: '>',
            d: 0,
        })
    }

    if (values.dateSentStart) {
        filter.and.push({
            f: 'dateSent',
            o: '>=',
            d: values.dateSentStart,
        })
    }

    if (values.dateSentEnd) {
        filter.and.push({
            f: 'dateSent',
            o: '<=',
            d: values.dateSentEnd + ' 23:59:59',
        })
    }

    if (contactId) {
        filter.and.push({
            or: [
                {
                    f: 'contacts.contactId',
                    d: contactId,
                },
                {
                    f: 'manualContacts.contactId',
                    d: contactId,
                },
            ]
        })
    }

    if (eigen) {
        filter.and.push({
            f: 'eigenOpenstaand',
        })
    }

    return filter;
}

export function storeFiltersToStorage(values) {
    localStorage.setItem('emailFilters', JSON.stringify(values));
}

export function getFiltersFromStorage() {
    let filters = localStorage.getItem('emailFilters');

    if (!filters) {
        return {...defaultFilters};
    }

    return {
        ...defaultFilters,
        ...JSON.parse(filters),
    };
}

export const defaultFilters = {
    from: '',
    contact: '',
    subject: '',
    mailbox: '',
    status: '',
    responsible: '',
    to: '',
    attachment: '',
    dateSentStart: '',
    dateSentEnd: '',
}
