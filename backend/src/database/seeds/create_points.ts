import Knex from 'knex'
import faker from 'faker/locale/pt_BR'

export async function seed(knex: Knex) {
    await knex('points').insert([
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: faker.internet.url(), name: faker.company.companyName(), email: faker.internet.email(), whatsapp: faker.phone.phoneNumber(), longitude: faker.address.longitude(), latitude: faker.address.latitude(), city: faker.address.city(), uf: faker.address.stateAbbr() },
        { image: 'fake-image', name: 'fake-name', email: 'fake-email', whatsapp: '928137921', longitude: 21312312, latitude: 3213131, city: 'fake-city', uf: 'uf' }
        
    ])
}