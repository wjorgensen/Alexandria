// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {

    uint256 private MINIMUM_SPEND_FOR_TOKEN = 0.05e18; //0.05 Eth, will change depending on the chain being deployed to
    mapping(address => bool) internal s_tokenHolders;
    uint256 private s_numOfTokenHolders;
    mapping(address => bool) internal s_boardMembers;
    uint256 private s_numOfBoardMembers;
    uint256 s_bankValue; 
    MaterialProposal[] private s_materialProposals;
    uint256 private s_numOfDeletedMaterialProposals;
    SpendMoney[] private s_spendMoneyProposals;
    uint256 private s_numOfDeletedMoneyProposals;

    error NotTokenHolder();

    event Donated(address donater, uint value);
    event NewMaterialProposal(Entry newEntry, uint256 arrayIndex, address sender);
    event NewSpendingProposal(SpendMoney newSpendMoneyProposal, uint256 arrayIndex, address sender);

    struct SpendMoney{
        string reason;
        address to;
        uint value;
        address creator;
    }

    struct Entry{
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        uint256 edition;
        string hashCode;
    }

    struct MaterialProposal{
        Entry newEntry;
        address maker;
        uint256 votesYay;
        uint256 votesNay;
    }

    modifier tokenHolder {
        if(!s_tokenHolders[msg.sender]){
            revert NotTokenHolder();
        }
        _;
    }

    modifier boardMember {
        if(!s_boardMembers[msg.sender]){
            revert NotTokenHolder();
        }
        _;
    }

    constructor(address[] memory _boardMembers) {
        for(uint256 i; i < _boardMembers.length; i++){
            s_boardMembers[_boardMembers[i]] = true;
        }
    }

    function donate() payable external {
        s_bankValue += msg.value;
        emit Donated(msg.sender, msg.value);
        if(msg.value > MINIMUM_SPEND_FOR_TOKEN){
            internalAddGovernanceDAOToken(msg.sender);
        }
    }

    function internalAddGovernanceDAOToken(
        address _toAdd
    ) 
        internal
    {
        s_tokenHolders[_toAdd] = true;
        ++s_numOfTokenHolders;
    }

    function addMaterial(
        string calldata _name,
        string calldata _author,
        string calldata _medium,
        uint256 _yearReleased,
        uint256 _edition,
        string calldata _hashCode
    ) 
        external
        tokenHolder
    {
        Entry memory temp = Entry(_name, _author, _medium,_yearReleased, _edition, _hashCode);
        s_materialProposals.push(MaterialProposal(temp, msg.sender, 1, 0));
        emit NewMaterialProposal(temp, s_materialProposals.length - 1, msg.sender);
    }

    function bulkAddMaterial(
        Entry[] calldata _newEntries
    ) 
        external
        tokenHolder
    {
        for(uint i; i<_newEntries.length; ++i){
            s_materialProposals.push(MaterialProposal(_newEntries[i], msg.sender, 1, 0));
            emit NewMaterialProposal(_newEntries[i], s_materialProposals.length - 1, msg.sender);
        }
    }

    //Add check for already executed 
    function voteAddMaterial(
        uint256 _arrayIndex, 
        bool yayNay
    )
        external
        tokenHolder
    {
        yayNay ? ++s_materialProposals[_arrayIndex].votesYay : ++s_materialProposals[_arrayIndex].votesNay;
        internalExecuteAddMaterial(_arrayIndex);
    }

    //function voteBulkAddMaterial

    function internalExecuteAddMaterial(uint256 _arrayIndex
    )
        internal
        returns(bool)
    {
        //Call database contract
        //If true remove from array
        return true;
    }

    //function internalBulkExecuteAddMaterial

    function spendMoneyProposal(
        string calldata _reason, 
        address _to, 
        uint256 _value
    ) 
        external 
        boardMember
    {
        s_spendMoneyProposals.push(SpendMoney(_reason, _to, _value, msg.sender));
    }

    //Add check for already executed
    function voteMoneySpend(
        uint256 _arrayIndex,
        bool _yayNay
    ) 
        external 
        boardMember
    {
        
    }

    function internalExecuteMoneySpend(
        uint256 _arrayIndex
    ) 
        internal 
    {
        
    }


    /**
     * Note this DAO will be vulnerable to a number of attacks due to its decentralized nature. These are:
     *  1. Sybil Attack: Should an adversarial party choose they could donate the minimum spend on a number of 
     *     wallets until they gain over 50% of the DAO tokens and render the DAO effectively useless. They cannot
     *     remove material from the library but they can prevent any new material from being added and prevent
     *     any new spending. 
     */
}