// Where you put all of your logic to keep routes uncluttered (Define functions)

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// Added Errorhandling to new getAllData for L06
// const getAllData = (req, res) => {
//     mongodb
//         .getDb()
//         .db()
//         .collection('contacts')
//         .find()
//         .toArray((err, lists) => {
//             if (err) {
//                 res.status(400).json({ message: err });
//             }
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(lists);
//         });
// };

// Added validation for L06
// const getSingleData = (req, res) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json('Must use a valid contact id to find a contact.');
//     }
//     const userId = new ObjectId(req.params.id);
//     mongodb
//         .getDb()
//         .db()
//         .collection('contacts')
//         .find({ _id: userId })
//         .toArray((err, result) => {
//             // Added Errorhandling to new getSingleData for L06
//             if (err) {
//                 res.status(400).json({ message: err });
//             }
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(result[0]);
//         });
// };

// Get all the 'contacts' data
    const getAllData = async (req, res, next) => {
        // Uses 'getDb' instead of 'initDb'
        try {
            const result = await mongodb.getDb().db().collection('contacts').find();
            result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists); 
        });
        } catch (error) {
            console.log(error);
        }
        
    };

// Get a single 'contact' data
    const getSingleData = async (req, res, next) => {
        try {
            const userId = new ObjectId(req.params.id);
            const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
            result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
            });
        } catch (error) {
            console.log(error);
        }
    
    };

// Create a new 'contact'
const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the contact');
    }
};

// Update a 'contact'
// Added validation for L06
const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    // Be aware of updateOne if you only want to update specific fields
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .replaceOne({_id: userId}, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the contact.");
    }
};

// Delete a 'contact'
// Added validation for L06
const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = { getAllData, getSingleData, createContact, updateContact, deleteContact };

// An object named 'data'
// const data = {
//     professionalName: 'Nicole Murff',
//     nameLink: {
//         firstName: 'Nicole',
//         url: 'https://www.linkedin.com/in/nicole-perkins-murff/',
//     },
//     professionalImage: '',
//     firstName: 'Nicole',
//     primaryDescription: ' is a student at BYU-Idaho',
//     workDescription1: 'She is a Domestic Enigineer.',
//     workDescription2: 'She specializes in transportation, general health and finances, inventory management, and escalations.',
//     linkTitleText: 'Check out her work below',
//     linkedInLink: {
//         link: 'https://www.linkedin.com/in/nicole-perkins-murff/',
//         text: 'LinkedIn',
//     },
//     githubLink: {
//         link: 'https://github.com/Murffkins',
//         text: 'GitHub',
//     },
//     contactText: 'Feel free to contact her at mur20031@byui.edu.',
// };

// //  A function named 'getData' that is being exported
// // '.json(data)' returns the 'data' object to wherever it is being called
// exports.getData = (req, res, next) => {
//     res.status(200).json(data);
// };


// // Non-anonymous function:
//         // const imLearningFunction = (req, res, next) => {
//         //     res.json('no entiendo');
//         // };

// // export the functions
// // delineate functions with a comma to add more than one
//         // module.exports = {imLearningFunction};