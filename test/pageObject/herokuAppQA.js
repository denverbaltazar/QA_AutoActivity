

class HerokuApp {

    get loginEmail()    {  return $('//input[@id="email"]')};
    get loginPassword()    {  return $('//input[@id="password"]')};
    get subtmitBtn()         {  return $('//button[@id="submit"]') };
    get addContactBtn() {   return $('//button[@id="add-contact"]')};

    get firstNameEdit() {   return $('//input[@id="firstName"]')};
    get lastNameEdit() {   return $('//input[@id="lastName"]')};
    get birthdayEdit() {    return $('//input[@id="birthdate"]')};
    get emailEdit() {   return $('//input[@id="email"]')}
    get phoneEdit() {   return $('//input[@id="phone"]')}
    get street1Edit()   {   return $('//input[@id="street1"]')}
    get street2Edit()   {   return $('//input[@id="street2"]')}
    get cityEdit()  {   return $('//input[@id="city"]')}
    get stateProvinceEdit()  {   return $('//input[@id="stateProvince"]')}
    get postalCodeEdit()  {   return $('//input[@id="postalCode"]')}
    get countryEdit()  {   return $('//input[@id="country"]')}

    get editContactBtn()    {   return $('//button[@id="edit-contact"]')}
    get deleteContactBtn()  { return $('//button[@id="delete"]')}
    get returnContactBtn()  { return $('//button[@id="return"]')}

    async navigate(){
        await browser.url(`https://thinking-tester-contact-list.herokuapp.com/`);
    }

    async generateBirth(){
        const year = Math.floor(Math.random() * (2005 - 1950 + 1)) + 2005;
        const month = Math.floor(Math.random() * 12) + 1;
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
}

export default new HerokuApp();