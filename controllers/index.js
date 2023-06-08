// Where you put all of your logic to keep routes uncluttered (Define functions)

// Non-anonymous function:
const imLearningFunction = (req, res, next) => {
    res.json('no entiendo');
};

// export the functions
// delineate functions with a comma to add more than one
module.exports = {imLearningFunction};