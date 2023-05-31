const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(jsonParser);
const {auth} = require("./middlewear");
const port = process.env.PORT;

let USERID = 1;
const USER = [];
const SUBMISSIONS = [];

const PROBLEMS = [
        {
          problemId: "1",
          title: "401. Bitwise AND of Numbers Range",
          difficulty: "Medium",
          acceptance: "42%",
          description:
            "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
          exampleIn: "left = 5, right = 7",
          exampleOut: "4",
        },
        {
          problemId: "2",
          title: "205. Add two numbers",
          difficulty: "Medium",
          acceptance: "41%",
          description:
            "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
          exampleIn: "a = 100 , b = 200",
          exampleOut: "300",
        },
        {
          problemId: "3",
          title: "202. Happy Number",
          difficulty: "Easy",
          acceptance: "54.9%",
          description: "Write an algorithm to determine if a number n is happy.",
          exampleIn: "n = 19",
          exampleOut: "true",
        },
        {
          problemId: "4",
          title: "203. Remove Linked List Elements",
          difficulty: "Hard",
          acceptance: "42%",
          description: "Given number k , removed kth element",
          exampleIn: "list: 1->2->3 , k=2",
          exampleOut: "1->3",
        },
        {
          problemId: "5",
          title: "201. Bitwise AND of Numbers Range",
          difficulty: "Medium",
          acceptance: "42%",
          description:
            "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
          exampleIn: "left = 5, right = 7",
          exampleOut: "4",
        },
        {
          problemId: "6",
          title: "205. Add two numbers",
          difficulty: "Medium",
          acceptance: "41%",
          description:
            "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
          exampleIn: "a = 100 , b = 200",
          exampleOut: "300",
        },
        {
          problemId: "7",
          title: "202. Happy Number",
          difficulty: "Easy",
          acceptance: "54.9%",
          description: "Write an algorithm to determine if a number n is happy.",
          exampleIn: "n = 19",
          exampleOut: "true",
        },
        {
          problemId: "8",
          title: "203. Remove Linked List Elements",
          difficulty: "Hard",
          acceptance: "42%",
          description: "Given number k , removed kth element",
          exampleIn: "list: 1->2->3 , k=2",
          exampleOut: "1->3",
        },
      ];

app.get( "/problems" , (req,res) => {
        const filteredProblems = PROBLEMS.map((x) => (
                {
                        problemId : x.problemId,
                        title : x.title,
                        difficulty : x.difficulty,
                        acceptance : x.acceptance
                }
        ));
      console.log(filteredProblems);
      res.json({problems:filteredProblems});
});

app.get( "/problem/:id" , (req,res) => {
        const id = req.params.id;
        const filteredProblem = PROBLEMS.find((x)=> { 
                 console.log(x.problemId);      
               return id === x.problemId;
        })
        res.json(filteredProblem);
} )

app.post("/signup" , (req,res) => {
        const { name, email, password} = req.body;
        const userId = USERID++;
        const user = USER.find((x) => email === x.email)
        if(user) {
               return res.status(403).json({msg: "User already exists"});
        }
        USER.push({name, email, password, userId});
        res.status(201).json({name, email, password , userId});

})

app.get("/me",auth, (req,res) => {
  return res.status(200).json({msg:"I Live"});
})

app.post("/signin" , (req,res) => {
        const { email, password} = req.body;
        const user = USER.find((x) => email === x.email)
        
        if(!user) {
               return res.status(403).json({msg: "User does not exist"});
        }
        if (user.password !== password) {
                return res.status(403).json({ msg: "Incorrect username or password" });
              }
        
        const token = jwt.sign({
            id:user.userId,
        },JWT_SECRET
        );

        return res.json({token});
})

app.post("/submission" ,auth, (req,res) => {
        const isCorrect = Math.random() < 0.5 ;
        const problemId = req.body.problemId;
        const submission = req.body.submission;

        if(isCorrect) {
                SUBMISSIONS.push({
                        userId: req.userId,
                        problemId,
                        submission,
                        status:"CA"
                })
        }
        else {
                SUBMISSIONS.push({
                        userId: req.userId,
                        problemId,
                        submission,
                        status:"WA"
                })
        };
        
        res.json({SUBMISSIONS})
})

app.listen(port,() => {
        console.log(`Hellow from ${port}`)
})