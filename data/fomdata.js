import  { GoogleSpreadsheet } from 'google-spreadsheet';
import mongoose from "mongoose";
// import User from '../models/User';
import creds from "./credentials.json" assert { type: "json" };
/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */

// status window 空白 = fail , mac = check
export async function getData(docID, sheetID, credentialsPath = './credentials.json') {
    const result = [];
    const doc = new GoogleSpreadsheet(docID);
    // await doc.useServiceAccountAuth(creds);
    await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEET_CRED))
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetID];
    const rows = await sheet.getRows();
    // console.log('rows=',rows)
    const status_list = []
    const name_list = []
    const data_list = []
    var count = 0
    for (const row of rows) {
        // result.push(row._rawData)
        console.log('row',row)
        const data = row._rawData;
        if (data.length>8){
            var status = row._rawData[0].toLowerCase().replaceAll(' ','')
            
            var name = row._rawData[2].toLowerCase().replaceAll(' ','')
            if (name.includes('ｍandy')){
                name = "mandy"
            }


            // Window color
            // const system = "Window"
            // if (status.includes('pass')){
            //     var statuscolor = '#145A32'
            //     status = 'close'
            // }
            // if (status.includes('fail')|| status === ''){
            //     var statuscolor = '#E74C3C'
            //     status = 'fail'
            // }
            // if (status.includes('pending')){
            //     var statuscolor = '#9B59B6'
            //     status = 'pending'
            // }

            // MacOS color
            const system = "MacOS"
            if (status.includes('pass')){
                var statuscolor = '#2ECC71'
                status = 'pass'
            }
            if (status.includes('fail')){
                var statuscolor = '#E74C3C'
                status = 'fail'
            }
            // if (status.includes('pending')){
            //     var statuscolor = '#9B59B6'
            //     status = 'pending'
            // }
            // if (status.includes('close')){
            //     var statuscolor = '#145A32'
            //     status = 'close'
            // }
            // if (status === ''){
            //     var statuscolor = '#F39C12'
            //     status = 'Not Ready for JIRA'
            // }
            
            


            if (!status_list.includes(status)){
                status_list.push(status)
                if (status!== 'pass' && status !== 'pending' && status!=='fail' && status!== 'close' && status!=='Not Ready for JIRA'){
                    console.log(row._rawData)
                }
            }
            // name
            if (NameObject.get(name) === undefined){
                var nameid = NameObject.get('nobody')
            }else{
                var nameid = NameObject.get(name)
            }
            
            const data = {
                    _id: new mongoose.Types.ObjectId(),
                    form: mongoose.Types.ObjectId("63f482034adbf7ccf3c6d9d5"),
                    creator: mongoose.Types.ObjectId(nameid),
                    data:{
                        "status":statuscolor,
                        "priority":"blue",
                        "system":system,
                        "pin":(row._rawData[3]!==undefined ? (row._rawData[3]):""),
                        "tester":(RealName.get(name)!==undefined?RealName.get(name):name),
                        "time":(row._rawData[1]!==undefined?(row._rawData[1]):""),
                        "testcasename":(row._rawData[4]!==undefined?(row._rawData[4]):""),
                        "chinesedescription":(row._rawData[5]!==undefined?(row._rawData[5]):""),
                        "title":(row._rawData[6]!==undefined?(row._rawData[6]):""),
                        "systeminformation":(row._rawData[7]!==undefined?(row._rawData[7]):""),
                        "description":(row._rawData[8]!==undefined?(row._rawData[8]):""),
                        "informationlink":(row._rawData[9] !== undefined ?(row._rawData[9]+'\n'):""),
                        

                    }
                }
            data_list.push(data)
            
            if (!name_list.includes(name) && NameObject.get(name)=== undefined){
                name_list.push(name)
            }
        }
    }


    console.log('status list = ',status_list)
    console.log('name list =',name_list)
    return data_list;
};


// // 預設密碼
// const updateUsers = async () => {
//     try {
//         const users = await User.find();
//         for (const user of users) {
//             if (!user.password) { // Check if user already has a password
//                 var password = "123"
//                 user.password = password;
//                 await user.save();
//                 console.log(`Password generated for user ${user.Name}: ${password}`);
//             }
//         }
//     } catch (error) {
//         console.log('Error updating users:', error);
//     } finally {
//         mongoose.connection.close();
//     }
// };


const NameObject = new Map([
    ["leo", "63c9dc2d2fd170fd2ff2ce27"],
    ["lanere", "63ca3c3b23d0db8e397ce754"],
    ["ray", "63ca3e5f23d0db8e397ce785"],
    ["chad","63d71dbec424e1f674f068c9"],
    ["wayne","63d71ae7c424e1f674f067e3"],
    ["xin","63d71b3dc424e1f674f067e9"],
    ["aurora","63d71b79c424e1f674f0683a"],
    ["sheila","63d71cdec424e1f674f0689e"],
    ["ready","63d71d25c424e1f674f068a1"],
    ["kira","63d71d97c424e1f674f068c4"],
    ["kephyr","63d71db2c424e1f674f068c7"],
    ["racpy","63d71df7c424e1f674f068cc"],
    ["zoe","63d71e59c424e1f674f068d0"],
    ["eddie","63d71f2bc424e1f674f068e3"],
    ["eric","63d720fec424e1f674f068e9"],
    ["guo","63d72159c424e1f674f068ee"],
    ["austin","63e1a844e85d73a699ffd099"],
    ["terry","63d75d28c4e213f1ab470383"],
    ["alan","63e1a201e85d73a699ffd047"],
    ["nobody","63d76ce842d2d4d7b029a58f"],
    ["ruby","63e0acd3f5736585ada727cb"],
    ["evic","63e0ad01f5736585ada727ce"],
    ["mandy","63e0ad40f5736585ada727d1"],
    ["小eric","63f425097be6a7acefd3684f"]

]);

const RealName = new Map([
    ["leo", "Huang Chien Hung"],
    ["lanere", "Lanere"],
    ["ray", "Ray RY Hou"],
    ["chad","Chad YW Chang"],
    ["wayne","Wayne WJ Juang"],
    ["xin","Xin Rong"],
    ["aurora","Aurora Yang"],
    ["sheila","Chao Sheila"],
    ["ready","Ready MH Hsieh"],
    ["kira","Kira SY Chen"],
    ["kephyr","Kephyr"],
    ["racpy","Racpy"],
    ["zoe","zoe chen"],
    ["eddie","Eddie YT Tsou"],
    ["eric","eric wang"],
    ["guo","Ginny Kuo"],
    ["austin","Austin"],
    ["terry","Terry"],
    ["alan","Alan Shih"],
    ["nobody","NoBody"],
    ["ruby","Ruby Chen"],
    ["mandy","Mandy Du"],
    ["evic","evic"],
    ["小eric","小eric"]
])
