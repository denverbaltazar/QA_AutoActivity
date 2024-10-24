import AllureReporter from "@wdio/allure-reporter"
import File from './file.js';

class Reporter {
    async addLog(strMsg){
        await File.appendTxtFile(global.strPath, strMsg)
        await AllureReporter.addStep(strMsg);
    }
    
    // async addStep(){

    // }   
}

export default new Reporter()