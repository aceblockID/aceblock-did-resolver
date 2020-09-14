const express = require('express');
const router = express.Router();
const didAddressController = require("../controllers/didAddress");

const route = '/ethtodid/:addr';

// GET route
router.get(route, (req, res, next) => {
    let adr = req.params.addr;
    didAddressController.get_uid_from_address(adr, res)
        .catch(error => next(error));
});

// POST route
router.post(route, (req, res, next) => {
    let adr = req.params.addr;
    didAddressController.get_uid_from_address(adr, res)
        .catch(error => next(error));
});


module.exports = router;