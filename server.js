const express = require("express");

const app = express();

app.get('/api', (req, res, next) => {
    const customers = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            id: 2,
            firstName: 'Steve',
            lastName: 'Smith'
        },
        {
            id: 3,
            firstName: 'Kayoze',
            lastName: 'Rustom'
        },
    ];
    res.status(200).json(customers);
});

const port = 9000;

app.listen(port, () => console.log(`Server started on ${port}`));