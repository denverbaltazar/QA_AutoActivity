
import Reporter from './reporter.js';

class objUtil {

    /***********************************************
     * @function clickObject | @author jbaltazar_20241023
     * @description Click Object
     * @param {Object} objElement - Object to be clicked
     * @returns <none>
     ***********************************************/

    async clickObject(objElement) {
        await Reporter.addLog('Started Function: click Object')
        await objElement.waitForExist();
        await objElement.click();
        const strXpath = await objElement.selector
        await Reporter.addLog(`Completed Function: click Object - Successfully clicked [${strXpath}]`)
    }

    /***********************************************
     * @function setValue | @author jbaltazar_20241023
     * @description Click Object
     * @param {Object} objElement 
     * @param {String} strText 
     ************************************************/
    async setObjectValue(objElement, strText){
        await Reporter.addLog('Started Function: setValue')
        await objElement.waitForExist();
        await objElement.setValue(strText);
        await Reporter.addLog('Completed Function: setValues')
        
    }

    /***********************************************
     * @function getObjText | @author jbaltazar_20241023
     * @description Click Object
     * @param {Object} objElement 
     * @return <text>
     ************************************************/
    async getObjText(objElement){
        await Reporter.addLog('Started Function: getObjText')
        await objElement.waitForExist();
        const strText = await objElement.getText()
        const strXpath = await objElement.selector
        await Reporter.addLog(`Completed Function: getObjText - Object [${strXpath}]  Text [${strText}]`)
        return objElement.getText();
    }

    /***********************************************
     * @function getObjValue| @author jbaltazar_20241023
     * @description Click Object
     * @param {Object} objElement 
     * @return <value>
     ************************************************/
    async getObjValue(objElement){
        await Reporter.addLog('Started Function: getObjValue')
        await objElement.waitForExist();
        const strValue= await objElement.getValue()
        const strXpath = await objElement.selector
        await Reporter.addLog(`Completed Function: getObjValue - Object [${strXpath}]  Value [${strValue}]`)
        return objElement.getValue();
    }
}

export default new objUtil();