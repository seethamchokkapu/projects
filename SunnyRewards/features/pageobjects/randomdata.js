
class Randomdata{

async generateRandomMember(id) {
    const firstNames = ["Florella", "John", "Alice", "Robert", "Emily"];
    const lastNames = ["Rookesby", "Doe", "Smith", "Johnson", "Brown"];
    const cities = ["Nashua", "New York", "Los Angeles", "Chicago", "Houston"];
    const countries = ["US", "CA", "UK", "DE", "FR"];
    const languages = ["en-US", "fr-FR", "es-ES", "de-DE"];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}_${lastName.toLowerCase()}@example.com`;
    const languageCode = languages[Math.floor(Math.random() * languages.length)];
    const memberSince = new Date(Date.now() - Math.floor(Math.random() * 10 * 365 * 24 * 60 * 60 * 1000)).toISOString();
    const ipAddress = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const postalCode = `${Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000}`;
    const phoneNumber = `(214) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    const dob = new Date(Date.now() - Math.floor(Math.random() * 50 * 365 * 24 * 60 * 60 * 1000)).toISOString();
    const mailingAddressLine1 = `${Math.floor(Math.random() * 999) + 1} ${["Main", "First", "Second"][Math.floor(Math.random() * 3)]} Street`;
    const mailingAddressLine2 = "Test";
    const mailingState = "NH";
    const mailingCountryCode = "840";
    const homePhoneNumber = `${Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000}`;

    const member = {
        memberDetail: {
            id: id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            languageCode: languageCode,
            memberSince: memberSince,
            ip_address: ipAddress,
            city: city,
            country: country,
            postalCode: postalCode,
            phoneNumber: phoneNumber,
            region: "string",
            dob: dob,
            gender: Math.random() < 0.5 ? "male" : "female",
            ssnLast4: "",
            mailingAddressLine1: mailingAddressLine1,
            mailingAddressLine2: mailingAddressLine2,
            mailingState: mailingState,
            mailingCountryCode: mailingCountryCode,
            homePhoneNumber: homePhoneNumber
        },
        enrollmentDetail: {
            partnerCode: "par-7e92b06aa4fe405198d27d2427bf3de4",
            memberNbr: `nbs${id}vph4vy41fvc711nlezbeq4pa3p`,
            subscriberMemberNbr: `nbs${id}vph4vy41fvc711nlezbeq4pa3p`,
            registrationTs: memberSince,
            eligibleStartTs: memberSince,
            eligibleEndTs: new Date(Date.now() + Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
        }
    };

    return member;
}

async generatePayload() {
    const payload = {
        payload: {
            partnerCode: "par-7e92b06aa4fe405198d27d2427bf3de4",
            members: []
        }
    };

    for (let i = 1; i <= 1000; i++) {
        payload.payload.members.push(generateRandomMember(i));
    }

    return JSON.stringify(payload, null, 2);
}

}
module.exports=new Randomdata()