import * as express from "express";
import * as bodyParser from "body-parser";
import * as fs from 'fs'
import * as path from 'path'
import * as jsonfile from 'jsonfile'
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.post("/", (res, req) => {
    var imagedata = ''
    res.setEncoding('binary')
    const prefix = res.header('X-Prefix')
    res.on('data', function(chunk){
        imagedata += chunk
    })
    const dataPath = path.join(__dirname, 'data.json')
    const counters = jsonfile.readFileSync(dataPath)

    res.on('end', function(){
        fs.writeFile(path.join(__dirname,'img' ,`${prefix}-${counters[prefix]}.png`), imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
            counters[prefix]++
            jsonfile.writeFileSync(dataPath, counters, { spaces: 2 })
            req.send({ res: 'img' })
        })
    })
  
});

app.listen(3001, () => {
  console.log("Listening");
});
