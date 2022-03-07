const express = require('express');
const app = express();
const config = require('./config');
const Student = require('./Models/Student');

app.use(express.urlencoded({extended: false}));
app.use('/', (req, res, next) => {
   console.log('Request Type:', req.method)
   
    next()
  });
app.use('/:student_id', (req, res, next) => {
   console.log('Request Type:', req.method)
   
    next()
  });



//Establish connetion to database
config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err);
});

//List all students
app.get('/', function(req, res){
    let data = {
        where: {}
    }

    //Department filter
    if(req.query.department !== undefined){
        data.where.department = req.query.department;
    }

    //Age filter
    if(req.query.age !== undefined){
        data.where.age = req.query.age;
    }

    Student.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//Create a new student
app.post('/', function(req, res){
    Student.create(req.body).then(function(result){
        res.redirect('/'); //Redirect to the get route to display all students
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//Update first name of a student
app.patch('/:student_id', function(req, res){
    let studentId = req.params.student_id;

    //Find the student 
    Student.findByPk(studentId).then(function(result){
        //Check if student was found
        if(result){
            //Update student record
            result.fname = req.body.fname;

            //Save changes to DB
            result.save().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Student record not found');
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});

//Delete a student record
app.delete('/:student_id', function(req, res){
    let studentId = req.params.student_id;

    //Find the student
    Student.findByPk(studentId).then(function(result){

        if(result){
            //Delete student from database
            result.destroy().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Student record not found');
        }

    }).catch(function(err){
        res.status(500).send(err);
    });
});


app.listen(3000, function(){
    console.log('Server running on port 3000...');
});