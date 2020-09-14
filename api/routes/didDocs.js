const express = require('express');
const router = express.Router();
const didDocumentController = require('../controllers/didDoc');

const route = '/:did';

// GET route
router.get(route, (req, res, next) => {

    let uids = req.params.did;
    didDocumentController.get_DID_document(uids, res)
        .catch(error => next(error));
});


// POST route
router.post(route, async (req, res, next) => {

    let uids = req.params.did;
    didDocumentController.get_DID_document(uids, res)
        .catch(error => next(error));
});


module.exports = router;