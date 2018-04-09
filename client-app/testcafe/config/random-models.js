const faker = require('faker');

//person
export const personFirstName = faker.name.firstName();
export const personLastName = faker.name.lastName();

//organisation
export const organisationName = faker.company.companyName();

//person address
export const personPostalCode = faker.address.zipCode();
export const personStreet = faker.address.streetName();
export const personCity = faker.address.city();
export const personNumber = faker.random.number();

//organisation address
export const organisationPostalCode = faker.address.zipCode();
export const organisationStreet = faker.address.streetName();
export const organisationCity = faker.address.city();
export const organisationNumber = faker.random.number();

//production project
export const productionProjectName = faker.company.catchPhrase();
export const productionProjectCode = faker.lorem.word();

//campaign
export const campaignName = faker.lorem.sentence();

//contact group
export const contactGroupName = faker.name.findName();