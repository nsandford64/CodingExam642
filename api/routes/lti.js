const bodyParser = require('body-parser');
const express = require('express');
const lti = require('ims-lti');
const { request } = require('../app');
const router = express.Router();
//Creates an LTI provider object with the key and secret value from the app when it's registered in the LTI provider
const provider = new lti.Provider('Codekey', 'Keysecret', [nonce_store=MemoryStore], [signature_method=HMAC_SHA1])

/* Handles a POST request from the LTI consumer, in this case Canvas */
router.post('/api', function(req, res, next) {
    /*provider.valid_request(req, (err, isValid)) -> {
        if (!is_valid || !provider.outcome_service) {
            return false
        }
    }*/
});

module.exports = router;
