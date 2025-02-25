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
                case 'campaign':
                    return 'Campagne';
                case 'opportunityMeasureCategory':
                    return 'Kans maatregel categorie';
                case 'opportunityStatus':
                    return 'Kans status';
                case 'opportunityMeasure':
                    return 'Kans maatregel specifiek';
                case 'opportunityEvaluationRealised':
                    return 'Kans status evaluatie uitgevoerd';
                case 'opportunityCampaign':
                    return 'Kans campagne';
                case 'intakeMeasureCategory':
                    return 'Intake - Interesse';
                case 'intakeDateStart':
                    return 'Intake - Begin datum';
                case 'intakeDateFinish':
                    return 'Intake - Eind datum';
                case 'intakeStatus':
                    return 'Intake - Status';
                case 'quotationRequestStatusOrganisationOrCoach':
                    return 'Kansactie status (org/coach)';
                case 'quotationRequestStatusOccupant':
                    return 'Kansactie status (bewoner)';
                case 'portalUser':
                    return 'Portal gebruiker actief';
                case 'housingFileFieldName':
                    return 'Woningdossier - veldnaam';
                case 'housingFileFieldValue':
                    return 'Woningdossier - status / waarde';
                case 'contactFreeFieldsFieldName':
                    return 'Vrij veld contact - veldnaam';
                case 'addressFreeFieldsFieldName':
                    return 'Vrij veld adres - veldnaam';
                case 'contactFreeFieldsFieldValue':
                    return 'Vrij veld contact - status / waarde';
                case 'addressFreeFieldsFieldValue':
                    return 'Vrij veld adres - status / waarde';
                case 'housingFileExists':
                    return 'Woningdossier aanwezig';
                case 'inspectionPersonType':
                    return 'Rol in buurtaanpak';
                case 'sharedArea':
                    return 'Buurt';
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
                case 'energySupplierType':
                    return 'Type huidige energie leverancier';
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
                case 'hoomdossierExists':
                    return 'Hoomdossier aangemaakt';
                case 'addressDongleTypeReadOut':
                    return 'Dongle Type uitlezing';
                case 'addressDongleTypeDongle':
                    return 'Dongle - Type dongel';
                case 'addressDongleDateStart':
                    return 'Dongle - Start datum';
                case 'addressDongleDateEnd':
                    return 'Dongle - Eind datum';
                case 'addressDongleHasEnergyId':
                    return 'Dongle - Heeft energie ID koppeling';
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
