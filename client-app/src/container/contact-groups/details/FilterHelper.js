export default (type, field) => {
    switch (type) {
        case 'field':
            switch (field) {
                case 'id':
                    return 'Id';
                case 'number':
                    return 'Contact nummer';
                case 'typeId':
                    return 'Type';
                case 'payoutTypeId':
                    return 'Uitkeren op';
                case 'didAgreeAvg':
                    return 'Akkoord privacybeleid';
                case 'fullName':
                    return 'Naam';
                case 'streetAndNumber':
                    return 'Straat';
                case 'postalCode':
                    return 'Postcode';
                case 'city':
                    return 'Woonplaats';
                case 'country':
                    return 'Land';
                case 'emailAddress':
                    return 'E-mailadres';
                case 'phoneNumber':
                    return 'Telefoon nummer';
                case 'statusId':
                    return 'Status';
                case 'name':
                    return 'Naam';
                case 'currentObligations':
                    return 'Aantal obligaties';
                case 'currentParticipations':
                    return 'Aantal participaties';
                case 'currentPostalcodeLinkCapital':
                    return 'Aantal postcoderoos';
                case 'currentLoan':
                    return 'Bedrag lening';
                case 'staticContactGroup':
                    return 'Statische groep';
                case 'occupation':
                    return 'Verbinding';
                case 'occupationPrimary':
                    return 'Primaire verbinding';
                case 'opportunity':
                    return 'Kans';
                case 'portalUser':
                    return 'Portal gebruiker actief';
                case 'product':
                    return 'Product';
                case 'dateStart':
                    return 'Product - Begin datum';
                case 'dateFinish':
                    return 'Product - Eind datum';
                case 'orderStatus':
                    return 'Product - Order status';
                case 'contactType':
                    return 'Contact type';
                case 'address':
                    return 'Adres';
                case 'dateRegister':
                    return 'Eerste ingangsdatum deelname';
                case 'energySupplierId':
                    return 'Energie leverancier';
                case 'contactBirthday':
                    return 'Contact geboortedatum';
                case 'projectId':
                    return 'Project';
                case 'dateOfBirth':
                    return 'Geboortedatum';
                case 'energySupplier':
                    return 'Energie leverancier';
                case 'dateContractSend':
                    return 'Datum contract verzonden';
                case 'dateEnd':
                    return 'Einddatum';
                case 'giftedByContactId':
                    return 'Geschonken door';
                case 'participationsSold':
                    return 'Deelnames overgedragen';
                case 'didAcceptAgreement':
                    return 'Akkoord voorwaarden';
                case 'didUnderstandInfo':
                    return 'Projectinfo begrepen';
                case 'participationsRequested':
                    return 'Deelnames aangevraagd';
                case 'participantMutationTypeId':
                    return 'Deelname type (Mutaties)';
                case 'participantMutationStatusId':
                    return 'Deelname status (Mutaties)';
                case 'participantMutationDateContractRetour':
                    return 'Datum contract retour (Mutaties)';
                case 'participantMutationDatePayment':
                    return 'Betaaldatum (Mutaties)';
                case 'obligationsDefinitive':
                    return 'Huidig aantal obligaties';
                case 'participationsDefinitive':
                    return 'Huidig aantal participaties';
                case 'postalcodeLinkCapitalDefinitive':
                    return 'Huidig aantal postcoderoos';
                case 'loanDefinitive':
                    return 'Huidig bedrag obligaties';
                case 'createdAt':
                    return 'Gemaakt op';
            }
            break;
        case 'comperator':
            switch (field) {
                case 'eq':
                    return 'gelijk aan';
                case 'neq':
                    return 'niet gelijk aan';
                case 'rel':
                    return 'gelijk aan';
                case 'nrel':
                    return 'niet gelijk aan';
                case 'ct':
                    return 'bevat';
                case 'nct':
                    return 'bevat niet';
                case 'lt':
                    return 'kleiner dan';
                case 'lte':
                    return 'kleiner of gelijk aan';
                case 'gt':
                    return 'groter dan';
                case 'gte':
                    return 'groter dan of gelijk aan';
                case 'nl':
                    return 'is leeg';
                case 'nnl':
                    return 'is niet leeg';
                case 'is0':
                    return 'is 0';
                case 'isn0':
                    return 'is niet 0';
                case 'bw':
                    return 'begint met';
                case 'nbw':
                    return 'begint niet met';
                case 'ew':
                    return 'eindigt met';
                case 'new':
                    return 'eindigt niet met';
                case 'bool':
                    return 'is';
            }
    }
};
