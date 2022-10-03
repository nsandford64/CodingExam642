const bodyParser = require('body-parser');
const express = require('express');
const lti = require('ims-lti');
const router = express.Router();
//Creates an LTI provider object with the key and secret value from the app when it's registered in the LTI provider
const provider = new lti.Provider('Codekey', 'Keysecret');

/* Handles a POST request from the LTI consumer, in this case Canvas */
router.post('/', (req, res, next) => {
    console.log("made it inside the lti handler");
    /*provider.valid_request(req, (err, isValid)) -> {
        if (!is_valid || !provider.outcome_service) {
            return false
        }
    }*/
});

module.exports = router;
