const Web3 = require("web3");
const config = require("../../config/config.js");
const { validDidAddress, validateDidAddress } = require("../middleware/validations");
const { intErr, notFoundErr } = require("../../errors/index.js");
const web3 = new Web3(config.bc.bcURL);
const contractAddress = config.bc.contractAddress;
const abi = config.bc.contractAbi;

web3.transactionConfirmationBlocks = 1;

var ResolverContract = new web3.eth.Contract(abi, contractAddress,
    {
        gasPrice: '0',
        gas: 1500000
    });

exports.get_uid_from_address = async function (req, res) {
    // removes unnecessary commas from request parameter
    var address = req.replace(/(,)+/g, '$1').replace(/^,|,$/g, '');
    let DIDs = [];
    try {
        if (validDidAddress(address)) {
            let eAdd = address.split(",");
            for (i = 0; i < eAdd.length; i++) {
                await get_DID_address_from_any_address(eAdd[i])
                    .then(did => DIDs.push(did))
                    .catch(error => {
                        throw error;
                    });

            };
        }
    } catch (error) {
        throw error;
    }
    res.json(DIDs);
}



function get_DID_address_from_any_address(anyAddress) {
    try {
        return new Promise(function (resolve, reject) {
            ResolverContract.methods["getDID(address)"](anyAddress).call()
                .then(response => {
                    if (response == "") {
                        throw new notFoundErr(`DID addres not found for ethereum address: '${anyAddress}' `);
                    } else {
                        if (validateDidAddress(response)) {
                            resolve({ ethAddress: anyAddress, DID: "did:ace:" + response.toString() });
                        }
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    } catch (error) {
        console.log(error);
        reject(error);
    }
}
