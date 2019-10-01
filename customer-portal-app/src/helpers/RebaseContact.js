export default function(contactData) {
    const typeContact = contactData.typeId ? contactData.typeId : null;

    let primaryAddress = null;
    let visitAddress = null;
    let postalAddress = null;
    let invoiceAddress = null;
    switch (typeContact) {
        case 'person':
            // Set primary address
            primaryAddress = contactData.addresses.find(address => address.primary);
            contactData.primaryAddress = primaryAddress ? primaryAddress : {};
            break;
        case 'organisation':
            // Set visit, postal, invoice addresses
            visitAddress = contactData.addresses.find(address => address.typeId === 'visit');
            contactData.visitAddress = visitAddress ? visitAddress : {};
            postalAddress = contactData.addresses.find(address => address.typeId === 'postal');
            contactData.postalAddress = postalAddress ? postalAddress : {};
            invoiceAddress = contactData.addresses.find(address => address.typeId === 'invoice');
            contactData.invoiceAddress = invoiceAddress ? invoiceAddress : {};
            break;
    }

    // Set correspondence email address
    const emailCorrespondence = contactData.emailAddresses.find(emailAddress => emailAddress.primary);
    contactData.emailCorrespondence = emailCorrespondence ? emailCorrespondence : {};

    // Set invoice email address
    const emailInvoice = contactData.emailAddresses.find(
        emailAddress => emailAddress.typeId === 'invoice' && !emailAddress.primary
    );
    contactData.emailInvoice = emailInvoice ? emailInvoice : {};

    // Set primary phone number
    const phoneNumberPrimary = contactData.phoneNumbers.find(phoneNumber => phoneNumber.primary);
    contactData.phoneNumberPrimary = phoneNumberPrimary ? phoneNumberPrimary : {};

    // Set first phone number which is not primary
    const phoneNumberTwo = contactData.phoneNumbers.filter(phoneNumber => !phoneNumber.primary)[0];
    contactData.phoneNumberTwo = phoneNumberTwo ? phoneNumberTwo : {};

    return contactData;
}
