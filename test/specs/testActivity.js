

import { expect } from '@wdio/globals'
import HerokuApp from '../pageObject/herokuAppQA.js';
import objUtil from '../utils/objUtil';
import Reporter from '../utils/reporter.js';
import moment from 'moment';
import herokuAppQA from '../pageObject/herokuAppQA.js';
import File from '../utils/file.js'

let storedEmail = 'test_20241024112812@test.com';
let password = 'testing';

async function signUpOnce() {
    if (!storedEmail) {
        const strDateTime = moment(new Date()).format('YYYYMMDDhhmm');
        storedEmail = `test_${strDateTime}12@test.com`; 

        await Reporter.addLog('Step 1: Navigate to Heroku App');
        await HerokuApp.navigate();
        await $('//button[@id="signup"]').click();
        await $('//input[@id="firstName"]').waitForExist();
        await $('//input[@id="firstName"]').setValue('Denver');
        await $('//input[@id="lastName"]').setValue('Baltazar');
        await $('//input[@id="email"]').setValue(storedEmail);
        await $('//input[@id="password"]').setValue(password);
        await $('//button[@id="submit"]').click(); 
        await $('//button[@id="add-contact"]').waitForExist({ timeout: 20000 });
    }
}

describe('Heroku App', () => {
    it.skip('Heroku App SignUp_TC001', async () => {
        await signUpOnce();
    })
    it('Heroku App Login User_TC002', async () => {
        await HerokuApp.navigate();
        await objUtil.setObjectValue(herokuAppQA.loginEmail, storedEmail)
        await objUtil.setObjectValue(herokuAppQA.loginPassword, password)
        await objUtil.clickObject(herokuAppQA.subtmitBtn)
        await $('//button[@id="add-contact"]').waitForExist({ timeout: 20000 });
    })
    it('Heroku App Add Contact TC003', async () => {
        await HerokuApp.navigate();
        await objUtil.setObjectValue(herokuAppQA.loginEmail, storedEmail)
        await objUtil.setObjectValue(herokuAppQA.loginPassword, password)
        await objUtil.clickObject(herokuAppQA.subtmitBtn)
        await $('//button[@id="add-contact"]').waitForExist({ timeout: 20000 });

        const table = await $('table');
        const rows = await table.$$('tr');
        let userCount = await rows.length;

        while(userCount < 3){
            await objUtil.clickObject(herokuAppQA.addContactBtn);
            await herokuAppQA.firstNameEdit.waitForExist();
            await objUtil.setObjectValue(herokuAppQA.firstNameEdit, `test${userCount}`);
            await objUtil.setObjectValue(herokuAppQA.lastNameEdit, `test${userCount}`);
            await objUtil.setObjectValue(herokuAppQA.birthdayEdit, await herokuAppQA.generateBirth());
            await objUtil.setObjectValue(herokuAppQA.emailEdit, `test${userCount}@test.com`)
            await objUtil.setObjectValue(herokuAppQA.phoneEdit, `09123456789${userCount}`)
            await objUtil.setObjectValue(herokuAppQA.street1Edit, `street${userCount}`)
            await objUtil.setObjectValue(herokuAppQA.street2Edit, `street${userCount}`)
            await objUtil.setObjectValue(herokuAppQA.cityEdit, `test${userCount} City`)
            await objUtil.setObjectValue(herokuAppQA.stateProvinceEdit, `test${userCount} Province`)
            await objUtil.setObjectValue(herokuAppQA.postalCodeEdit, `300${userCount}`)
            await objUtil.setObjectValue(herokuAppQA.countryEdit, 'Philippines')
            await objUtil.clickObject(herokuAppQA.subtmitBtn)
            await browser.pause(1000);
            const new_table = await $('table');
            const new_row = await new_table.$$('tr');
            userCount = await new_row.length;
        }
    })
    it('Heroku App Edit Contact TC004', async () => {
        await HerokuApp.navigate();
        await objUtil.setObjectValue(herokuAppQA.loginEmail, storedEmail)
        await objUtil.setObjectValue(herokuAppQA.loginPassword, password)
        await objUtil.clickObject(herokuAppQA.subtmitBtn)
        
        await $('//table//tr[1]//td[2]').waitForExist();
        await objUtil.clickObject($('//table//tr[1]//td[2]'));
        await herokuAppQA.editContactBtn.waitForExist();
        await objUtil.clickObject(herokuAppQA.editContactBtn);
        const strDateTime = moment(new Date()).format('YYYYMMDD');

        await herokuAppQA.postalCodeEdit.clearValue()
        await browser.pause(1000)
        await objUtil.setObjectValue(herokuAppQA.postalCodeEdit, strDateTime)
        await objUtil.clickObject(herokuAppQA.subtmitBtn);
        await herokuAppQA.returnContactBtn.waitForExist();
        await objUtil.clickObject(herokuAppQA.returnContactBtn);
        await $('//table//tr[1]//td[7]').waitForExist();
        await expect($('//table//tr[1]//td[7]')).toHaveText(expect.stringContaining(strDateTime))
    })
    it('Heroku App Delete Contact TC005', async () => {
        await HerokuApp.navigate();
        await objUtil.setObjectValue(herokuAppQA.loginEmail, storedEmail)
        await objUtil.setObjectValue(herokuAppQA.loginPassword, password)
        await objUtil.clickObject(herokuAppQA.subtmitBtn)

        await $('//table//tr[1]//td[2]').waitForExist();
        await objUtil.clickObject($('//table//tr[1]//td[2]'));
        await herokuAppQA.deleteContactBtn.waitForExist();
        const deleteBtn = await herokuAppQA.deleteContactBtn;
        await deleteBtn.click();

        await browser.acceptAlert();
        await browser.pause(1000); 
    })
    it('Heroku App Export Contacts on File_TC006', async () => {

        await HerokuApp.navigate();
        await objUtil.setObjectValue(herokuAppQA.loginEmail, storedEmail)
        await objUtil.setObjectValue(herokuAppQA.loginPassword, password)
        await objUtil.clickObject(herokuAppQA.subtmitBtn)


        const table = await $('table');
        const rows = await table.$$('tr');
        const userCount = await rows.length; 
        const contactData = {}
        for (let i = 1; i < userCount; i++){
            const cells = await rows[i].$$('td'); // Get <td> elements for the current row
            const cellCount = cells.length;
            for (let j = 2 ; j < cellCount+1; j++){
                const header = await objUtil.getObjText($(`//thead//tr//th[${j-1}]`))
                const data = await objUtil.getObjText($(`//table/tr[${i}]/td[${j}]`))
                contactData[header]  = data;
            }
            await File.appendTxtFile(global.strPathContacts, JSON.stringify(contactData, 0 ,2))
        }
    })
})

