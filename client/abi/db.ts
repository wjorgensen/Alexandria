export const dbcontractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "NotDAO",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotOwner",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "author",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "medium",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "yearReleased",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "language",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    }
                ],
                "indexed": false,
                "internalType": "struct Database.Entry",
                "name": "newEntry",
                "type": "tuple"
            }
        ],
        "name": "AddedEntry",
        "type": "event"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "author",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "medium",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "yearReleased",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "language",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    }
                ],
                "internalType": "struct Database.Entry",
                "name": "_entry",
                "type": "tuple"
            }
        ],
        "name": "addEntry",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dump",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "author",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "medium",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "yearReleased",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "language",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    }
                ],
                "internalType": "struct Database.Entry[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_search",
                "type": "string"
            }
        ],
        "name": "search",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "author",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "medium",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "yearReleased",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "language",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cid",
                        "type": "string"
                    }
                ],
                "internalType": "struct Database.Entry[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_dao",
                "type": "address"
            }
        ],
        "name": "setDao",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];