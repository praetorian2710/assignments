const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]
app.post('/signup', function(req, res) {
  const { email, password } = req.body;
  const userExists = USERS.some(user => user.email === email);
  if (userExists) {
    return res.status(409).send('User already exists');
  }
  // Store email and password in the USERS array
  USERS.push({ email, password });

  // Return 200 status code to the client
  res.sendStatus(200);
})

app.post('/login', function(req, res) {
  const { email, password } = req.body;

  // Find the user with the given email
  const user = USERS.find(user => user.email === email);

  // Check if the user exists and the password matches
  if (user && user.password === password) {
    // Generate a random token (here, using a simple random string)
    const token = Math.random().toString(36).substring(7);
    return res.status(200).json({ token });
  }

  // If the user doesn't exist or the password is incorrect, return 401 status code
  res.sendStatus(401);
})

app.get('/questions', function(req, res) {

 res.json(QUESTIONS);
})

app.get("/submissions", function(req, res) {
   const { email } = req.query;

  // Find submissions by the user with the given email
  const userSubmissions = SUBMISSIONS.filter(submission => submission.email === email);

  res.json(userSubmissions);
});


app.post("/submissions", function(req, res) {
    const { email, problemId, solution } = req.body;

  // Generate a submission object
  const submission = {
    email,
    problemId,
    solution,
    accepted: Math.random() < 0.5 // Randomly accept or reject the solution
  };

  // Store the submission in the SUBMISSIONS array
  SUBMISSIONS.push(submission);

  res.sendStatus(200);
});

app.post("/problems", function(req, res) {
    const { email,title, description, testCases } = req.body;
  
    // Check if the admin token is valid
    if (!isAdmin(email)) {
      return res.sendStatus(401);
    }
  
    // Create a new problem object
    const problem = {
      title,
      description,
      testCases
    };
  
    // Add the new problem to the QUESTIONS array
    QUESTIONS.push(problem);
  
    res.sendStatus(200);
  });
  
  // Helper function to check if a token is an admin token
  function isAdmin(token) {
    if(email=="admin@gmail.com")
    return true;
    else
    return false;
  }
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})