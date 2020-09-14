// setting enviroment: development, testing or production with enviroment variable
// options: 'dev' | 'test' | 'prod' | 'local'
// usage: export system enviroment variable UNIRESOLVER_DRIVER_DID_ACE with one of upper options


const env = process.env.UNIRESOLVER_DRIVER_DID_ACE || 'prod';


const dev = {
    app: {
        port: 8083,
        route: '/1.0/identifiers',
    },
    bc: {
        bcURL: 'https://ssi.aceblock.com/rpc',
        IPFSclient: '/dns4/ssi.aceblock.com/tcp/5001',
        contractAddress: '0xcEe408DA63635f2bD9A1608cCDC354F1a506f2b5',
        contractAbi: [{ "constant": true, "inputs": [{ "name": "DIDs", "type": "bytes32[]" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdocs", "type": "string[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "DID", "type": "bytes32" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdoc", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ethAddress", "type": "address" }], "name": "getDID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }],
    },
    validation: {
        didDocSchema: __dirname + '/didDocSchema.json',
        JsonldSchema: __dirname + '/JsonldSchema.json',
    }
}

const test = {
    app: {
        port: 8084,
        route: '/1.0/identifiers',
    },
    bc: {
        bcURL: 'https://ssi.aceblock.com/rpc',
        IPFSclient: '/dns4/ssi.aceblock.com/tcp/5001',
        contractAddress: '0xcEe408DA63635f2bD9A1608cCDC354F1a506f2b5',
        contractAbi: [{ "constant": true, "inputs": [{ "name": "DIDs", "type": "bytes32[]" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdocs", "type": "string[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "DID", "type": "bytes32" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdoc", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ethAddress", "type": "address" }], "name": "getDID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }],
    },
    validation: {
        didDocSchema: __dirname + '/didDocSchema.json',
        JsonldSchema: __dirname + '/JsonldSchema.json',
    }
};

const prod = {
    app: {
        port: 8085,
        route: '/1.0/identifiers',
    },
    bc: {
        bcURL: 'https://ssi.aceblock.com/rpc',
        IPFSclient: '/dns4/ssi.aceblock.com/tcp/5001',
        contractAddress: '0xcEe408DA63635f2bD9A1608cCDC354F1a506f2b5',
        contractAbi: [{ "constant": true, "inputs": [{ "name": "DIDs", "type": "bytes32[]" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdocs", "type": "string[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "DID", "type": "bytes32" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdoc", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ethAddress", "type": "address" }], "name": "getDID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }],
    },
    validation: {
        didDocSchema: __dirname + '/didDocSchema.json',
        JsonldSchema: __dirname + '/JsonldSchema.json',
    }
};

const local = {
    app: {
        port: 8088,
        route: '/1.0/identifiers',
    },
    bc: {
        bcURL: 'localhost/8545',
        IPFSclient: '/ipv4/127.0.0.1/tcp/5001',
        contractAddress: '0xcEe408DA63635f2bD9A1608cCDC354F1a506f2b5',
        contractAbi: [{ "constant": true, "inputs": [{ "name": "DIDs", "type": "bytes32[]" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdocs", "type": "string[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "DID", "type": "bytes32" }], "name": "getDIDdocAddress", "outputs": [{ "name": "DIDdoc", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "ethAddress", "type": "address" }], "name": "getDID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }],
    },
    validation: {
        didDocSchema: __dirname + '/didDocSchema.json',
        JsonldSchema: __dirname + '/JsonldSchema.json',
    }
}

const config = {
    dev,
    test,
    prod,
    local
};

module.exports = config[env];