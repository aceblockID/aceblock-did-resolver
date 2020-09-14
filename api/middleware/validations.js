const Joi = require("@hapi/joi");
const Ajv = require("ajv");
const { badReqErr, intErr, intErrMsg, notFoundErr } = require("../../errors");
const eth_addr = require("ethereum-address");
const schemaJids = Joi.string().regex(/^0x[a-fA-F0-9]+$/);
const schemaEthAddresses = Joi.string().regex(/^[a-fA-F0-9,x]+$/);
const config = require("../../config/config.js");

const didDocSchema = require(config.validation.didDocSchema);
const JsonldSchema = require(config.validation.JsonldSchema);

// Validating did document request parameters
const valUidRequestParameter = (uids) => {
    if (uids.length > 1500) {
        // throws error if request string is too long
        throw new badReqErr(`Request can contain only 20 uid parameter. You have submitted too long request string. `);
    } else { //checks for usage of valid characters in string
        let ids = uids.split(",");
        for (i = 0; i < ids.length; i++) {
            let id = ids[i].split(":");
            if (id.length != 3) {
                throw new badReqErr(`Invalid input parameter '${ids[i]}', parameter you submitted has '${id.length}' subparameters. There shoud be 3 subparameters.`);
            }
            if (ids[i].substring(0, 10) !== "did:ace:0x") { // testing if method and begiinging of address are correctly formed
                throw new badReqErr(`Invalid input parameter '${ids[i]}', parameter must start with 'did:ace:0x'`);
            }
            if (id[2].length != 66) { // check if address is of lenght 66 characters, if not throw error
                throw new badReqErr(`Invalid input parameter ${ids[i]}, parameter does not contain enough characters. Length is: ${id[2].length}`);
            }
            if (schemaJids.validate(id[2]).error) { // checking if address contains allowed characters
                throw new badReqErr(`Invalid input parameter '${id[2]}, parameter contains invalid caharacters'`);
            }
        }
        return true;
    }

}


// Initalizing Ajv for json-ld schema validation
const ajv = new Ajv();

async function ajvInit() {
    //let schm = await sdo_jsd.JSONLD_SCHEMA;
    // instead of loading schema each time from schemaorg-jsd npm package is schema saved in config folder
    let schm = JsonldSchema;
    ajv.addSchema(schm);
}

ajvInit();

// Validating did document by didDocSchema
async function validateDidDocSchema(req, didDoc) {
    let valid = await ajv.validate(didDocSchema, didDoc);
    if (!valid) {
        throw new intErrMsg(` Tracking number:'${Date.now()}' for request DID: '${req}'.  DID document has invalid shcema. Detail info message: '${ajv.errors[0].message}'`);
    }
    return valid;
}


// Validating did address parameters
const validDidAddress = (address) => {
    let valEthAddr = schemaEthAddresses.validate(address);
    // validates if lenght fits at least for one ethereum address
    if (valEthAddr.error) { // checks if in parameter string are only allowed characters
        throw new badReqErr(`Invalid input parameter '${valEthAddr.error}'. Parameter contains unallowed characters. `)
    }
    if (address.length > 860) {  // validates if there are not more than 20 ethereum addresses 
        let calcLen = Math.round((address.length) / 43);
        throw new badReqErr(`Request can contain only 20 parameters. You have submitted too long request string.`)
    } else {
        let eAdd = address.split(',');

        for (i = 0; i < eAdd.length; i++) {
            if (!eth_addr.isAddress(eAdd[i])) {
                throw new badReqErr(`Invalid input parameter. Ethereum address '${eAdd[i]}' is not valid. `)
            }
        }
        return true;
    }
}

// Validating if returned did address is valid
function validateDidAddress(didAddress) {
    let val = schemaJids.validate(didAddress);
    // SC has default return '0x0000000000000000000000000000000000000000000000000000000000000000' for non existing addresses and 
    // DID addresses should be validated befor published on BC so val.error is doublechecking of our system implementation of generating DID addresses on BC.
    if (val.error || didAddress === '') {
        throw new intErrMsg(`'${didAddress}' is invalid DID address`);
    }
    if (didAddress === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        throw new notFoundErr(`DID address is not registered.`);
    }
    return true;
}


module.exports = { valUidRequestParameter, validateDidDocSchema, validDidAddress, validateDidAddress };