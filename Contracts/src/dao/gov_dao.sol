// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {

    uint256 private MINIMUM_SPEND_FOR_TOKEN = 0.005e18; //0.005 Eth
    mapping(address => bool) internal s_tokenHolders;
    uint256 private s_numOfTokenHolders;
    mapping(address => bool) internal s_boardMembers;
    uint256 private s_numOfBoardMembers;
    uint256 s_bankValue; 
    MaterialProposal[] private materialProposals;
    uint256 private s_numOfDeletedMaterialProposals;
    SpendMoney[] private spendMoneyProposals;
    uint256 private s_numOfDeletedMoneyProposals;

    error NotTokenHolder();

    event Donated(address donater, uint value);
    event NewMaterialProposal(Entry newEntry, address sender);

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
            addGovernanceDAOToken(msg.sender);
        }
    }

    function addGovernanceDAOToken(
        address _toAdd
    ) 
        internal 
        tokenHolder 
    {
        s_tokenHolders[_toAdd] = true;
        ++s_numOfTokenHolders;
    }

    function addMaterial(
        string calldata _name,
        string calldata _author,
        string calldata _medium,
        string calldata _hashCode
    ) 
        external
        tokenHolder
    {
        Entry memory temp = Entry(_name, _author, _medium, _hashCode);
        materialProposals.push(MaterialProposal(temp, msg.sender, 1, 0));
        emit NewMaterialProposal(temp, msg.sender);
    }

    function spendMoneyProposal(
        string calldata _reason, 
        address _to, 
        uint256 _value
    ) 
        external 
        boardMember
    {
        
    }

    function voteMoneySpend(
        uint256 _arrayIndex
    ) 
        external 
        boardMember
    {
        
    }

    function executeMoneySpend(
        uint256 _arrayIndex
    ) 
        internal 
    {
        
    }

}