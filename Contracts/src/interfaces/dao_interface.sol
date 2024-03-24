// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDatabase} from "./database_interface.sol";

interface IAlexandriaDAO {
    struct SpendMoney {
        string reason;
        address to;
        uint value;
        address creator;
        uint256 votes;
    }

    struct DAOEntry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        string language;
        string cid;
        address creator;
        uint256 votes;
    }

    /**
     * @notice Allows anyone to donate to the DAO
     */
    function donate() external payable;

    /**
     *
     * @param _newEntry Entry to be added to the database
     *
     * @notice Adds an entry to be voted on. Only to be called by Board Members
     */
    function addEntry(IDatabase.Entry calldata _newEntry) external;

    /**
     *
     * @param _newEntries Array of entries to be added to the database
     *
     * @notice Adds an array of entries to the database. Only to be called by Board Members
     */
    function bulkAddEntries(IDatabase.Entry[] calldata _newEntries) external;

    /**
     *
     * @param _proposalIndex Index of the proposal in the array of add material proposals
     *
     * @notice Allows board members to vote on adding a material to the database
     */
    function voteAddEntry(uint256 _proposalIndex) external;

    /**
     *
     * @param _arrayRangeStart The start of the range of proposals to vote on
     * @param _arrayRangeEnd The end of the range of proposals to vote on
     * @param _exclusionsInRange Any proposals in the range to exclude from voting
     *
     * @notice Allows board members to vote on adding a range of materials to the database
     */
    function voteBulkAddEntries(
        uint256 _arrayRangeStart,
        uint256 _arrayRangeEnd,
        uint256[] calldata _exclusionsInRange
    ) external;

    /**
     *
     * @param _reason The reason for the money being spent
     * @param _to Who the money is going to be sent to
     * @param _value How much money is being sent
     *
     * @notice Allows board members to propose spending money
     */
    function spendMoneyProposal(
        string calldata _reason,
        address _to,
        uint _value
    ) external;

    /**
     *
     * @param _arrayIndex Index of the proposal in the array of spend money proposals
     *
     * @notice Allows board members to vote on spending money
     */
    function voteMoneySpend(uint256 _arrayIndex) external;

    /**
     *
     * @param _newMember Address of the new board member
     *
     * @notice Allows board members to vote on adding a new board member
     */
    function addBoardMember(address _newMember) external;

    /**
     * @notice Returns the current entry proposals
     */
    function getEntryProposals() external view returns (DAOEntry[] memory);

    /**
     * @notice Returns the current spend money proposals
     */
    function getSpendMoneyProposals() external view returns (SpendMoney[] memory);

    /**
     * @notice Returns the executed entry proposals
     */
    function getExecutedEntryProposals() external view returns (DAOEntry[] memory);

    /**
     * @notice Returns the executed spend money proposals
     */
    function getExecutedSpendMoneyProposals() external view returns (SpendMoney[] memory);
}