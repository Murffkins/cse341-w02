// Where you put all of your logic to keep routes uncluttered (Define functions)

const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all the 'contacts' data
const getAllData = async (req, res, next) => {
    // Uses 'getDb' instead of 'initDb'
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists); 
    });
};

// Get a single 'contact' data
const getSingleData = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAllData, getSingleData };

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