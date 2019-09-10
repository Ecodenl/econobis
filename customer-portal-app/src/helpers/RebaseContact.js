export default function(contactData) {
    // Set correspondence email address
    const emailCorrespondence = contactData.emailAddresses.find(emailAddress => emailAddress.primary);
    contactData.emailCorrespondence = emailCorrespondence ? emailCorrespondence : {};

    // Set invoice email address
    const emailInvoice = contactData.emailAddresses.find(emailAddress => emailAddress.type === 'invoice');
    contactData.emailInvoice = emailInvoice ? emailInvoice : {};

    // Set primary phone number
    const phoneNumberPrimary = contactData.phoneNumbers.find(phoneNumber => phoneNumber.primary);
    contactData.phoneNumberPrimary = phoneNumberPrimary ? phoneNumberPrimary : {};

    // Set first phone number which is not primary
    const phoneNumberTwo = contactData.phoneNumbers.filter(phoneNumber => !phoneNumber.primary)[0];
    contactData.phoneNumberTwo = phoneNumberTwo ? phoneNumberTwo : {};

    return contactData;
}
