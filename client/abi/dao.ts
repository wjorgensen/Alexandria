export const DAOABI = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_boardMembers",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "_database",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AlreadyExecuted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NoBurn",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotAbleToAddMaterial",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotBoardMember",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotEnoughFunds",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "TransactionFailed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "donater",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Donated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "MoneySpendExecuted",
      "type": "event"
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
          "internalType": "struct AlexandriaDAO.Entry",
          "name": "newEntry",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "arrayIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "NewEntryProposal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "reason",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct AlexandriaDAO.SpendMoney",
          "name": "newSpendMoneyProposal",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "arrayIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "NewSpendingProposal",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newMember",
          "type": "address"
        }
      ],
      "name": "addBoardMember",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "internalType": "struct AlexandriaDAO.Entry",
          "name": "_newEntry",
          "type": "tuple"
        }
      ],
      "name": "addEntry",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "internalType": "struct AlexandriaDAO.Entry[]",
          "name": "_newEntries",
          "type": "tuple[]"
        }
      ],
      "name": "bulkAddEntries",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEntryProposals",
      "outputs": [
        {
          "components": [
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
              "internalType": "struct AlexandriaDAO.Entry",
              "name": "newEntry",
              "type": "tuple"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "internalType": "struct AlexandriaDAO.EntryProposal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getExecutedEntryProposals",
      "outputs": [
        {
          "components": [
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
              "internalType": "struct AlexandriaDAO.Entry",
              "name": "newEntry",
              "type": "tuple"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "internalType": "struct AlexandriaDAO.EntryProposal[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getExecutedSpendMoneyProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "reason",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "internalType": "struct AlexandriaDAO.SpendMoney[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSpendMoneyProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "reason",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "internalType": "struct AlexandriaDAO.SpendMoney[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_bankValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_reason",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "spendMoneyProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_arrayIndex",
          "type": "uint256"
        }
      ],
      "name": "voteAddEntry",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_arrayRangeStart",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_arrayRangeEnd",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_exclusionsInRange",
          "type": "uint256[]"
        }
      ],
      "name": "voteBulkAddEntries",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_arrayIndex",
          "type": "uint256"
        }
      ],
      "name": "voteMoneySpend",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]