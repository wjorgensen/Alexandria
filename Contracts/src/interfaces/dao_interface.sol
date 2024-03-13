// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAlexandriaDAO {
    struct SpendMoney {
        string reason;
        address to;
        uint256 value;
        address creator;
        uint256 votes;
    }

    struct Entry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        string language;
        string cid;
    }

    struct EntryProposal {
        Entry newEntry;
        address maker;
        uint256 votes;
    }

    event Donated(address donater, uint256 value);
    event NewMaterialProposal(Entry newEntry, uint256 arrayIndex, address sender);
    event NewSpendingProposal(SpendMoney newSpendMoneyProposal, uint256 arrayIndex, address sender);
    event MoneySpendExecuted(address to, uint256 value);

    /**
     * @notice Returns the current bank value of the DAO.
     */
    function s_bankValue() external view returns (uint256);

    /**
     * @notice Allows anyone to donate to the DAO.
     */
    function donate() external payable;

    /**
     * @notice Adds an entry to be voted on. Only to be called by Board Members.
     * @param _newEntry Entry to be added to the database.
     */
    function addMaterial(Entry calldata _newEntry) external;

    /**
     * @notice Adds an array of entries to the database. Only to be called by Board Members.
     * @param _newEntries Array of entries to be added to the database.
     */
    function bulkAddMaterial(Entry[] calldata _newEntries) external;

    /**
     * @notice Allows board members to vote on adding a material to the database.
     * @param _arrayIndex Index of the proposal in the array of add material proposals.
     */
    function voteAddMaterial(uint256 _arrayIndex) external;

    /**
     * @notice Allows board members to vote on adding a range of materials to the database.
     * @param _arrayRangeStart The start of the range of proposals to vote on.
     * @param _arrayRangeEnd The end of the range of proposals to vote on.
     * @param _exclusionsInRange Any proposals in the range to exclude from voting.
     */
    function voteBulkAddMaterial(
        uint256 _arrayRangeStart,
        uint256 _arrayRangeEnd,
        uint256[] memory _exclusionsInRange
    ) external;

    /**
     * @notice Allows board members to propose spending money.
     * @param _reason Reason for the spending proposal.
     * @param _to Who will receive the funds.
     * @param _value How much will be sent.
     */
    function spendMoneyProposal(
        string calldata _reason,
        address _to,
        uint256 _value
    ) external;

    /**
     * @notice Allows board members to vote on spending money.
     * @param _arrayIndex Index of the proposal in the array of spend money proposals.
     */
    function voteMoneySpend(uint256 _arrayIndex) external;

    /**
     * @notice Allows board members to vote on adding a new board member.
     * @param _newMember Address of the new board member.
     */
    function addBoardMember(address _newMember) external;
}