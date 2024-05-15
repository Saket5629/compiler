const express = require('express');
const hbs = require("hbs");
const app = express();
const bodyP = require('body-parser');
const path = require('path');
const compiler = require('compilex');
const port = process.env.PORT || 3000;
const collection = require('./mongodb');

const tempelatePath = path.join(__dirname,'../tempelates');

const options = {stats:true};
compiler.init(options);

// app.use((req,res,next)=>{
//     console.log(req.url);
// })
app.use(bodyP.json());
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.static(path.join(__dirname,"../")));
// app.use('/codemirror', express.static(path.join(__dirname, '..', 'codemirror-5.65.16')));
app.use(express.urlencoded({ extended: false }));
app.set('view engine','hbs');
app.set("views",tempelatePath);

app.get('/', (req, res) => {
  res.render("login");
});

app.get('/signup',(req,res)=>{
  res.render("signup");
})

app.post('/signup',async (req,res)=>{
  const data = {
      name: req.body.name,
      password: req.body.password
  }

  const checking = await collection.findOne({ name: req.body.name })

  try{
      if( checking && checking.name === req.body.name && checking.password===req.body.password){
          res.send("user details already exists");
      }
      else{
          await collection.insertMany([data]);
          res.render("login");
      }
  }
  catch{
      res.send("wrong inputs")
  }

})

app.post('/login',async (req,res)=>{
  try{
      const check = await collection.findOne({ name: req.body.name })

      if(check && check.password === req.body.password){
          res.status(201).sendFile(path.join(__dirname, '..', 'new.html'));
      }
      else{
          res.send("There is no such account with this detail");
      }
  }
  catch{
      res.send("wrong inputs")
      }
})

app.get('/new*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'compile.html'));
});

app.post("/compile", (req, res) => {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "C++" || lang == "C") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                })
            }
            else { 
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "CS") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileCS(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileCSWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log("error")
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

compiler.flush(function() {
    console.log("All temporary files flushed !");
});