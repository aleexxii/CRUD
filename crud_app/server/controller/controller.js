var Userdb = require('../model/model')

// create and save new user
exports.create = (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({messege:"content can not be empty"})
        return;
    }

    // new user
    const user = new Userdb({
        name :req.body.name,
        email:req.body.email,
        gender:req.body.gender
    })

    // save user in the database
    user
    .save(user)
    .then(data => {
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err => {
        res.status(500).send({
            messagge :err
        })
    })
}

// retrive and return all users / retrive and return a single user
exports.find = (req,res) => {

    if(req.query.id) {
        const id = req.query.id;
        console.log(id);

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({messagge :'Not found user with id' + id})
            }else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({messagge:"Error retrieving user with id" + id})
        })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({messagge : err.messagge || "Error Occured while retriving user information"})
        })
    }

}

// update a new idetified user by user id 
exports.update =(req,res) => {
    if(!req.body){
        return res
        .status(400)
        .send({messagge : "Data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data => {
        if(!data){
            res.status(404).send({messagge :`Cannot update user with ${id}. Maybe user not found`})
        }else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({messagge : "Error Update user information"})
    })
}

// Delete a user with specified user id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({messagge : `Cannot Delete with ${id}.Maybe id is wrong`})
        }else {
            res.send({
                messagge:"User was deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            messagge : "Could not delete User with " + id
        });
    }); 
}