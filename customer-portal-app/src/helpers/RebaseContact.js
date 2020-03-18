export default function(contactData) {
    const typeContact = contactData.typeId ? contactData.typeId : null;

    let emptyAddress = { street: '', number: '', addition: '', postalCode: '', city: '', countryId: null };
    let primaryAddress = null;
    let visitAddress = null;
    let postalAddress = null;
    let invoiceAddress = null;
    switch (typeContact) {
        case 'person':
            // Set primary address
            primaryAddress = contactData.addresses.find(address => address.primary);
            contactData.primaryAddress = primaryAddress ? { ...emptyAddress, ...primaryAddress } : emptyAddress;
            break;
        case 'organisation':
            // Set visit, postal, invoice addresses
            visitAddress = contactData.addresses.find(address => address.typeId === 'visit');
            contactData.visitAddress = visitAddress ? { ...emptyAddress, ...visitAddress } : emptyAddress;
            postalAddress = contactData.addresses.find(address => address.typeId === 'postal');
            contactData.postalAddress = postalAddress ? { ...emptyAddress, ...postalAddress } : emptyAddress;
            invoiceAddress = contactData.addresses.find(address => address.typeId === 'invoice');
            contactData.invoiceAddress = invoiceAddress ? { ...emptyAddress, ...invoiceAddress } : emptyAddress;
            break;
    }

    // Set correspondence email address
    let emptyEmail = { email: '' };
    const emailCorrespondence = contactData.emailAddresses.find(emailAddress => emailAddress.primary);
    contactData.emailCorrespondence = emailCorrespondence ? { ...emptyEmail, ...emailCorrespondence } : emptyEmail;

    // Set invoice email address
    const emailInvoice = contactData.emailAddresses.find(
        emailAddress => emailAddress.typeId === 'invoice' && !emailAddress.primary
    );
    contactData.emailInvoice = emailInvoice ? { ...emptyEmail, ...emailInvoice } : emptyEmail;

    // Set primary phone number
    let emptyPhoneNumber = { number: '' };
    const phoneNumberPrimary = contactData.phoneNumbers.find(phoneNumber => phoneNumber.primary);
    contactData.phoneNumberPrimary = phoneNumberPrimary
        ? { ...emptyPhoneNumber, ...phoneNumberPrimary }
        : emptyPhoneNumber;

    // Set first phone number which is not primary
    const phoneNumberTwo = contactData.phoneNumbers.filter(phoneNumber => !phoneNumber.primary)[0];
    contactData.phoneNumberTwo = phoneNumberTwo ? { ...emptyPhoneNumber, ...phoneNumberTwo } : emptyPhoneNumber;

    // Set primary contact energy supplier
    let emptyPrimaryContactEnergySupplier = {
        energySupplierId: null,
        esNumber: '',
        eanElectricity: '',
        memberSince: '',
        eanGas: '',
    };
    if (!contactData.primaryContactEnergySupplier) {
        contactData.primaryContactEnergySupplier = emptyPrimaryContactEnergySupplier;
    }
    return contactData;
}
