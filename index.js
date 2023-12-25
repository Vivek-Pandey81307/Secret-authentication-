
import express from 'express'
import bodyParser from 'body-parser'
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import 'dotenv/config'

const __dirname= dirname(fileURLToPath(import.meta.url))
const app = express();
const port = 9000;
var isAuthorised = false;
app.use(bodyParser.urlencoded({extended:true}));
function passwordCheck(req,res,next){
    const password = req.body.password;
    console.log(process.env.SECRET_AUTHENTICATION_MATCH);
    if(password===process.env.SECRET_AUTHENTICATION_MATCH){
        isAuthorised=true;
    }next();
}
app.use(passwordCheck)
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})
app.get("/secret",(req,res)=>{
    res.sendFile(__dirname + '/public/secret.html');isAuthorised=false;
})
app.post("/check",(req,res)=>{
    if(isAuthorised){
        res.redirect('/secret');
    }else{res.redirect('/');}
})
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`)
})