/* eslint-disable @typescript-eslint/no-explicit-any */
import "dotenv/config";
import express from "express";
import User from "./models/user";
import UserInfo from "./models/userinfo";
import Certification from "./models/certification";
import JobHistory from "./models/jobhistory";
import SpecExp from "./models/specexp";
import Status from "./models/status";
import cors from "cors";


// import path from "path";
const app = express();
require("./server");
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



// const static_path = path.join(__dirname,"/src/newregistrationform");

// app.use(express.static(static_path));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/register", (req, res)=> {
    // let message=false;
    const { userid, name, password, role} = req.body;
    console.log(role);
    console.log(name);
    console.log(password);
    console.log(userid);
    

    User.findOne({userid: userid}).then((u:any)=>{
        console.log("hello");

        if(u){
            res.status(400).json({ message: "User already registered"});
            // res.send({message: "d"})
        } else {
            // console.log(req.body);
            const user = new User({
                userid:userid,
                name:name,
                password:password,
                roleflag:role
            });
            user.save().then(s => {
                // message = true;
                // console.log("hello save");
                res.send({message: "User registered successfully"})
            })
            .catch((error) => {
                console.log("error");
                
            });
        }
    })
    // res.send({message: "User already registered"})
    
}) 

app.get("/fetchEnggInfo", (req, res)=> {

    User.find({roleflag:1}).then((u:any)=>{
        console.log("inside fetch");
        if(u){
             res.json(u);
        } else {
            res.send({message: "No User Data Found"})
            res.status(400).json({ message: "No User Data Found"});
        }
    })
    
});

// app.post("/fetchEnggInfoByID", async(req, res)=> {
//     const {userid} = req.body;
//     console.log(userid);
    
//     const u = await <any>User.findOne({userid: userid})
//     console.log("hello",u);

//     const ui = await <any> UserInfo.findOne({userid: userid})
//     console.log("hello",ui);
   
//     const sc = await <any>SpecExp.findOne({userid: userid})
//     console.log("hello",sc);
   
//     const jh = await <any>JobHistory.findOne({userid: userid})
//     console.log("hello",jh);
   
//     const c = await <any>Certification.findOne({userid: userid})
//     console.log("hello",c);

//     console.log(u.name);

//     const statusid = ui.statusid;

//     const st = await <any> Status.findOne({statusid: statusid})
//     // console.log("hello",ui);
   
//     UserAllInfo.findOne({userid: userid}).then((f:any)=>{
//         console.log("hello");

//         if(f){
//             res.json(f);
//             // res.send({message: "d"})
//         } else {
//             // console.log(req.body);
//             const allinfo = new UserAllInfo({
//                 userid:userid,
//                 name:u.name, 
//                 password:u.password,
//                 roleflag:u.roleflag,
//                 recompoint: ui.recompoint,
//                 totalexp : ui.totalexp,
//                 jpexp : ui.jpexp,
//                 japanese : ui.japanese,
//                 jpexamname:ui.jpexamname,
//                 jppassedlevel: ui.jppassedlevel,
//                 english : ui.english,
//                 otherlang : ui.otherlang,
//                 techskill : ui.techskill,
//                 appeal:ui.appeal,
//                 hourlywage : ui.hourlywage,
//                 speccontent: sc.content,
//                 specexp : sc.specexp,
//                 exptypeflg : sc.exptypeflg,
//                 jobcontent: jh.content,
//                 tech : jh.tech,
//                 roleandscale : jh.roleandscale,
//                 acqdate: c.acqdate ,
//                 source : c.source ,
//                 certificatename : c.name ,
//                 statusid : st.statusid,
//                 statusname : st.statusname,
//             });
        
//             allinfo.save().then(s => {
//                 // message = true;
//                 // console.log("hello save");
//                 res.json(s);
//                 // res.send({message: "Details Added successfully"})
        
//             })
//             .catch((error) => {
//                 console.log("error");
                
//             });
//         }
//     })
    
    
// }) 

// app.post("/fetchEnggInfoByID", (req, res)=> {
//     const {userid} = req.body;
//     console.log(userid);
    
//     User.findOne({userid: userid}).then((u:any)=>{
//         console.log("inside findone");

//         if(u){
//             res.json(u);
//         } else {
//             res.send({message: "No User Data Found"})
//             res.status(400).json({ message: "No User Data Found"});
//         }
//     })
    
// }) 

app.post("/fetchEnggInfoByID", async (req, res) => {
    const {userid} = req.body;   

    const engginfo = {
        userid:userid,
        name:'', 
        password:'',
        roleflag:'',
        recompoint: '',
        totalexp : '',
        jpexp : '',
        japanese :'',
        jpexamname:'',
        jppassedlevel: '',
        english :'',
        otherlang :'',
        techskill : '',
        appeal:'',
        hourlywage : '',
        statusid:'',
        statusname:'',
        
        specExp: [],
        techSkill: [],
        certification: []
    }

    const u = await <any>User.findOne({userid: userid})

    const ui = await <any> UserInfo.findOne({userid: userid})

    const statusid = ui.statusid;

    const st = await <any> Status.findOne({statusid: statusid})
    
   
    if(ui){
        engginfo.name=u.name; 
        engginfo.password=u.password;
        engginfo.roleflag=u.roleflag;
        engginfo.recompoint= ui.recompoint;
        engginfo.totalexp = ui.totalexp;
        engginfo.jpexp = ui.jpexp;
        engginfo.japanese = ui.japanese;
        engginfo.jpexamname=ui.jpexamname;
        engginfo.jppassedlevel= ui.jppassedlevel;
        engginfo.english = ui.english;
        engginfo.otherlang = ui.otherlang;
        engginfo.techskill = ui.techskill;
        engginfo.appeal=ui.appeal;
        engginfo.hourlywage = ui.hourlywage;
        engginfo.statusid=statusid;
        engginfo.statusname = st.statusname;
    }

   
    const specExps:any = await getSpecExpsByUserId(userid);
    engginfo.specExp = specExps;

    const techSkills:any = await getTechSkillsByUserId(userid);
    engginfo.techSkill = techSkills;

    const certifications:any = await getCertificationsByUserId(userid);
    engginfo.certification = certifications;

    await res.send(engginfo);
});



async function getSpecExpsByUserId(userid: string) {
    let res = null;
    await SpecExp.find({
        userid: userid, delflg: 0
    })
    .then(async (sc) => {
        if (sc) {
            res = sc;
        } 
    });
    return res; 
}

async function getTechSkillsByUserId(userid: string): Promise<any> {
    let res = null;
    await JobHistory.find({
        userid: userid, delflg: 0
    })
    .then(async (jh) => {
        if (jh) {
            res = jh;
        } 
    });
    return res; 
}

async function getCertificationsByUserId(userid: string): Promise<any> {
    let res = null;
    await Certification.find({
        userid: userid, delflg: 0
    })
    .then(async (c) => {
        if (c) {
            res = c;
        } 
    });
    return res; 
}

export default app;


