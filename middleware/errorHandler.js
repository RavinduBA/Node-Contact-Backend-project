const {constants} = require('../constants');

//This file defines a custom error-handling middleware for an Express application. It ensures that errors are handled consistently throughout the API.

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    //Checks if a status code is already set in the response.If not, it defaults to 500 (Internal Server Error).
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title:"Validation Failed", message: err.message, stackTrace: err.stack   })
            break;
        case constants.NOT_FOUND:
            res.json({ title:"Not Found", message: err.message, stackTrace: err.stack   })
        case constants.UNAUTHORIZED:
            res.json({ title:"Unautherized", message: err.message, stackTrace: err.stack   })
        case constants.FORBIDDEN:
            res.json({ title:"Forbidden", message: err.message, stackTrace: err.stack   })
        case constants.SERVER_ERROR:
            res.json({ title:"Server Error", message: err.message, stackTrace: err.stack   })
        default:
            console.log("No Error, All good !");
            break;
    }

};

module.exports = errorHandler;