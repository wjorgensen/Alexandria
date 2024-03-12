// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAlexandriaDAO {
    // Events
    event Donated(address donater, uint value);
    event NewMaterialProposal(Entry newEntry, uint256 arrayIndex, address sender);
    event NewSpendingProposal(SpendMoney newSpendMoneyProposal, uint256 arrayIndex, address sender);
    event MoneySpendExecuted(address to, uint value);

    struct SpendMoney {
        string reason;
        address to;
        uint value;
        address creator;
        uint256 votes;
    }

    struct Entry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        uint256 edition;
        string language;
        string cid;
    }

    struct EntryProposal {
        Entry newEntry;
        address maker;
        uint256 votes;
    }

    /**
     * @notice Allows anyone to donate to the DAO
     */
    function donate() external payable;

    /**
     * @notice Adds an entry to the database. Only to be called by Board Members
     */
    function addMaterial(
        string calldata _name,
        string calldata _author,
        string calldata _medium,
        uint256 _yearReleased,
        uint256 _edition,
        string calldata _language,
        string calldata _cid
    ) external;

    /**
     * @notice Adds an array of entries to the database. Only to be called by Board Members
     */
    function bulkAddMaterial(Entry[] calldata _newEntries) external;

    /**
     * @notice Allows board members to vote on adding a material to the database
     */
    function voteAddMaterial(uint256 _arrayIndex) external;

    /**
     * @notice Allows board members to vote on adding a range of materials to the database
     */ 
    function voteBulkAddMaterial(
        uint256 _arrayRangeStart,
        uint256 _arrayRangeEnd,
        uint256[] memory _exclusionsInRange
    ) external;

    /**
     * @notice Allows board members to propose spending money
     */
    function spendMoneyProposal(
        string calldata _reason,
        address _to,
        uint256 _value
    ) external;

    /**
     * @notice Allows board members to vote on spending money
     */
    function voteMoneySpend(uint256 _arrayIndex) external;

    /**
     * @notice Allows board members to vote on adding a new board member
     */
    function addBoardMember(address _newMember) external;
}