export function checkFieldRecord(record) {
    let valueToCheck = null;

    switch (record.fieldFormatType) {
        case 'boolean':
            valueToCheck = record.fieldRecordValueBoolean;
            break;
        case 'text_short':
        case 'text_long':
            valueToCheck = record.fieldRecordValueText;
            break;
        case 'int':
            valueToCheck = record.fieldRecordValueInt;
            break;
        case 'double_2_dec':
        case 'amount_euro':
            valueToCheck = record.fieldRecordValueDouble;
            break;
        case 'date':
        case 'datetime':
            valueToCheck = record.fieldRecordValueDatetime;
            break;
        default:
            valueToCheck = null;
            break;
    }

    // Check if the field is mandatory and empty
    if (record.mandatory === 1 && (valueToCheck == null || valueToCheck + '' === '')) {
        return 'verplicht';
    }

    // Check for specific formats based on the field type
    if (record.fieldFormatType === 'int') {
        // Check if value is an integer
        if (!Number.isInteger(Number(valueToCheck))) {
            return 'moet een geheel getal zijn';
        }
    }

    if (record.fieldFormatType === 'double_2_dec' || record.fieldFormatType === 'amount_euro') {
        // Replace comma with a period for decimal input
        let formattedValue = typeof valueToCheck === 'string' ? valueToCheck.replace(',', '.') : valueToCheck;

        // Check if the value is a number with two decimal places
        const isValidDouble = /^\d+(\.\d{2})?$/.test(formattedValue);
        if (!isValidDouble) {
            return 'moet een decimaal getal zijn met twee decimalen';
        }
    }

    // Mask validation check
    if (!checkMask(valueToCheck, record.mask, record.mandatory)) {
        return 'voldoet niet aan het masker: ' + record.mask;
    }

    return false;

    function checkMask(value, mask) {
        // Check if the value complies with the mask
        if (value != null && value !== '' && mask != null && mask !== '') {
            let valueAsString = value.toString(); // Ensure value is a string
            let explodedMask = mask.split('');
            let explodedValue = valueAsString.split('');

            // If no '?' in mask and lengths differ, return false immediately
            if (!mask.includes('?') && mask.length !== valueAsString.length) {
                return false;
            }

            for (let i = 0; i < explodedMask.length; i++) {
                switch (explodedMask[i]) {
                    case '9':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[0-9]$/)) return false;
                        break;
                    case 'a':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z]$/)) return false;
                        break;
                    case 'x':
                        if (!explodedValue[i] || !explodedValue[i].match(/^[a-zA-Z0-9]$/)) return false;
                        break;
                    default:
                        if (explodedValue[i] !== explodedMask[i]) return false;
                        break;
                }
            }
        }

        return true;
    }
}
