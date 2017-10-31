import faker from 'faker/locale/nl';
import moment from 'moment';

const contactDetails = [];

for(let i = 0; i <= 20; i++){
    contactDetails.push(
        {
        id: i,
        contact_no: i,
        type_id: faker.random.number({min:1, max:2}),
        title: {
            id: faker.random.number({min:1, max:2})
        },
        person: {
            id: i,
            contacts_id: i,
            full_name: faker.name.findName(),
            initials: 'R',
            first_name: faker.name.firstName(),
            middle: '',
            last_name: faker.name.lastName(),
            energy_supplier_id: 1
        },
        addresses: [
            {
                id: i,
                contacts_id: i,
                type_id: faker.random.number({min:1, max:4}),
                street: faker.address.streetName(),
                address_number: faker.random.number(100),
                postcode: faker.address.zipCode(),
                city: faker.address.city(),
                primary: true,
            },
            {
                id: i + 1,
                contacts_id: i + 1,
                type_id: faker.random.number({min:1, max:4}),
                street: faker.address.streetName(),
                address_number: faker.random.number(100),
                postcode: faker.address.zipCode(),
                city: faker.address.city(),
                primary: false,
            },
        ],
        telephone_number: {
            id: i,
            contacts_id: i,
            type_id: 1,
            telephone_number: faker.phone.phoneNumberFormat(2)
        },
        email_address: {
            id: i,
            contacts_id: i,
            type_id: 1,
            email: faker.internet.email()
        },
            newsletter: faker.random.boolean(),
            statusId: faker.random.number({min:1, max:4}),
            createdAt: moment(faker.date.past()).format(),
        }
    );
}

export default contactDetails;