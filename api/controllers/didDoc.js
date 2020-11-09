const Web3 = require("web3");
const config = require("../../config/config.js");
const ipfsClient = require("ipfs-http-client");
const { valUidRequestParameter, validateDidDocSchema } = require("../middleware/validations");
const { notFoundErr } = require("../../errors/index.js");
const web3 = new Web3(config.bc.bcURL);
const ipfs = ipfsClient(config.bc.IPFSclient);
const contractAddress = config.bc.contractAddress;
const abi = config.bc.contractAbi;

web3.transactionConfirmationBlocks = 1;

const ResolverContract = new web3.eth.Contract(abi, contractAddress,
    {
        gasPrice: '0',
        gas: 1500000
    });



exports.get_DID_document = async function (req, res) {
    // removes unnecessary commas from request parameter
    let uids = req.replace(/(,)+/g, '$1').replace(/^,|,$/g, '');
    let DIDs = [];
    // result type (a - array, s - single)
    let resType = 'a';
    try {
        if (valUidRequestParameter(uids)) {
            let ids = uids.split(",");

            if (ids.length === 1) resType = 's';

            for (i = 0; i < ids.length; i++) {
                let id = ids[i].split(":");
                await get_ACE_DID_document(req, id[2])
                    .then((did) => DIDs.push(did))
                    .catch(error => {
                        throw error;
                    });

            };

        }
    } catch (error) {
        throw error;
    }

    if ( resType === 's' ) {
        res.json(DIDs[0]);
    } else {
        res.json(DIDs);
    }
};

function get_ACE_DID_document(req, uid) {
    try {
        return new Promise(function (resolve, reject) {
            ResolverContract.methods["getDIDdocAddress(bytes32)"](uid).call()
                .then(response => {
                    if (response == "") {
                        throw new notFoundErr('DID document not found.');
                    } else {
                        ipfs.cat(response).
                            then(async a => {
                                let didDoc = JSON.parse(a.toString());
                                if (didDoc != null) {
                                    let valid = await validateDidDocSchema(req, didDoc);
                                    if (valid) {
                                        resolve(didDoc);
                                    } else {
                                    }
                                }
                            })
                            .catch(error => {
                                reject(error);
                            });
                    }

                })
                .catch(error => {
                    reject(error);
                });

        });
    } catch (error) {
        reject(error);
    }
}
