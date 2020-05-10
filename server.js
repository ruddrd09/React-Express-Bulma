const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const employees = [
    {
        id: 0,
        name: 'Eric',
        surveyAvailable: ["Survey 1", "Survey 2", "Survey 3", "Survey 4", "Survey 5", "Survey 6"],
        surveyAssigned: []
    },
    {
        id: 1,
        name: 'Gabriel',
        surveyAvailable: ["Survey 1", "Survey 2", "Survey 3", "Survey 4", "Survey 5", "Survey 6"],
        surveyAssigned: []
    },
    {
        id: 2,
        name: 'Charles',
        surveyAvailable: ["Survey 1", "Survey 2", "Survey 3", "Survey 4", "Survey 5", "Survey 6"],
        surveyAssigned: []
    },
    {
        id: 3,
        name: 'John',
        surveyAvailable: ["Survey 1", "Survey 2", "Survey 3", "Survey 4", "Survey 5", "Survey 6"],
        surveyAssigned: []
    },
];

app.get('/employee', (req, res, next) => {
    res.status(200).json(employees);
});

app.post('/editSurvey', (req, res, next) => {
    console.log(req.body);
    employees[req.body.id].surveyAvailable = req.body.available;
    employees[req.body.id].surveyAssigned = req.body.assigned;
    res.status(201).json(employees)
})

const port = 9000;

app.listen(port, () => console.log(`Server started on ${port}`));