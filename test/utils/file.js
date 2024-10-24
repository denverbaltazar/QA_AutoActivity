import fs from 'fs'
import moment from 'moment';

class File {
    async createTxtFile(strPath, strTxt){
        const strDateTime = moment(new Date()).format('LLL');
        await fs.writeFile(`${strPath}.txt`, `[${strDateTime}] - ${strTxt}\n`, async(e) => {
            if (e) throw e;
        })
    }

    async appendTxtFile(strPath, strTxt){
        const strDateTime = moment(new Date()).format('LLL');
        await fs.appendFile(`${strPath}.txt`, `[${strDateTime}] - ${strTxt}\n`, { flag: 'a+'}, async(e) => {
            if (e) throw e;
        })
    }

    async deleteFolderContents(strFolder){
        const arrDir = await fs.readdirSync(strFolder);
        for(const strFile of arrDir){
            await fs.unlinkSync(`${strFolder}/${strFile}`)
        }
    }
}

export default new File();