import { expect } from '@wdio/globals'
import ultimateQA from '../pageObject/ultimateQA';
import objUtil from '../utils/objUtil';
import Reporter from '../utils/reporter.js';

describe('Fill Out The Forms', () => {
    // it('Fill Sample Form_TC001', async () => {
    //     // await browser.url(`https://ultimateqa.com/filling-out-forms/`);

    //     // await $('//input[@name="et_pb_contact_name_1"]').waitForExist();
    //     // await $('//input[@name="et_pb_contact_name_1"]').setValue('Sample Test Conctact Name');
    //     // await $('//textarea[@name="et_pb_contact_message_1"]').setValue('Sample Test Message');
    //     // await $('//input[@name="et_pb_contact_captcha_1"]').setValue(10);
    //     // await $('//div[2]/form/div/button').click();
    //     // await $('//div[@class="et-pb-contact-message"]//ul//li[text()]').waitForExist();
    // })
    it('Fill Sample Form_TC001_OOP', async () => {

        await Reporter.addLog('Step 1: Navigate to Ultimateqa website')
        await ultimateQA.navigate();

        await Reporter.addLog('Step 2: User fill contact name field')
        await objUtil.setObjectValue(ultimateQA.contactNameEdit, 'Denver');

        await Reporter.addLog('Step 3: User fill message field')
        await objUtil.setObjectValue(ultimateQA.contactMessageEdit, "This is a message");

        await Reporter.addLog('Step 4: User fill captcha field')
        await objUtil.setObjectValue(ultimateQA.captchaEdit, "0");

        await Reporter.addLog('Step 5: Click Submit')
        await objUtil.clickObject(ultimateQA.subtmitBtn);

        await objUtil.getObjText(ultimateQA.errorMsgElm);
        await expect(ultimateQA.errorMsgElm).toHaveText('You entered the wrong number in captcha.');
    })
})

