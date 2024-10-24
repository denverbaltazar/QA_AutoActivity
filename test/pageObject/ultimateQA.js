
class ultimateQA{
    get contactNameEdit()    {  return $('//input[@name="et_pb_contact_name_1"]')};
    get contactMessageEdit() {  return $('//textarea[@name="et_pb_contact_message_1"]')};
    get captchaEdit()        { return $('//input[@name="et_pb_contact_captcha_1"]')};
    get subtmitBtn()         {  return $('//div[@id="et_pb_contact_form_1"]//button') };
    get errorMsgElm()        {  return $('//div[@class="et-pb-contact-message"]//ul//li[text()]')};

    async navigate(){
        await browser.url(`https://thinking-tester-contact-list.herokuapp.com/`);
    }

}   

export default new ultimateQA();