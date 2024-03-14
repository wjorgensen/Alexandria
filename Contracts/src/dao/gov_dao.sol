// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDatabase} from "../interfaces/database_interface.sol";

contract AlexandriaDAO {
    mapping(address => bool) internal s_boardMembers;
    uint256 private s_numOfBoardMembers;
    uint256 public s_bankValue;
    EntryProposal[] private s_entryProposals;
    SpendMoney[] private s_spendMoneyProposals;
    EntryProposal[] private s_deletedEntryProposals;
    SpendMoney[] private s_deletedSpendMoneyProposals;
    IDatabase private s_database;
    mapping(address => uint256) private s_votesForBoard;
    mapping(uint256 => bool) private s_exclusions;

    error NotBoardMember();
    error AlreadyExecuted();
    error NotAbleToAddMaterial();
    error NotEnoughFunds();
    error NoBurn();
    error TransactionFailed(bytes data);

    event Donated(address donater, uint value);
    event MoneySpendExecuted(address to, uint value);

    event NewEntryProposal(
        Entry newEntry,
        uint256 arrayIndex,
        address sender
    );

    event NewSpendingProposal(
        SpendMoney newSpendMoneyProposal,
        uint256 arrayIndex,
        address sender
    );


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
        string language;
        string cid;
    }

    struct EntryProposal {
        Entry newEntry;
        address maker;
        uint256 votes;
    }

    modifier boardMember() {
        if (!s_boardMembers[msg.sender]) {
            revert NotBoardMember();
        }
        _;
    }

    /**
     * 
     * @param _boardMembers First board members
     * @param _database Database address
     * 
     * @notice Constructor sets the board members and the database address
     */
    constructor(address[] memory _boardMembers, address _database) {
        for (uint256 i; i < _boardMembers.length; i++) {
            s_boardMembers[_boardMembers[i]] = true;
            s_database = IDatabase(_database);
        }
    }

    /**
     * @notice Allows anyone to donate to the DAO
     */
    function donate() public payable {
        s_bankValue += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    /**
     * @notice Allows anyone to donate to the DAO
     */
    receive() external payable {
        donate();
    }

    /**
     * @notice Fallback function to donate to the DAO
     */
    fallback() external payable {
        donate();
    }

    /**
     * 
     * @param _newEntry Entry to be added to the database
     * 
     * @notice Adds an entry to be voted on. Only to be called by Board Members
     */
    function addEntry(
        Entry calldata _newEntry
    ) external boardMember {
        s_entryProposals.push(EntryProposal(_newEntry, msg.sender, 1));
        emit NewEntryProposal(_newEntry, s_entryProposals.length - 1, msg.sender);
    }

    /**
     * 
     * @param _newEntries Array of entries to be added to the database
     * 
     * @notice Adds an array of entries to the database. Only to be called by Board Members
     */
    function bulkAddEntries(
        Entry[] calldata _newEntries
    ) external boardMember {
        for (uint i; i < _newEntries.length; ++i) {
            s_entryProposals.push(EntryProposal(_newEntries[i], msg.sender, 1));
            emit NewEntryProposal(
                _newEntries[i],
                s_entryProposals.length - 1,
                msg.sender
            );
        }
    }

    /**
     * 
     * @param _arrayIndex Index of the proposal in the array of add material proposals
     * 
     * @notice Allows board members to vote on adding a material to the database
     */
    function voteAddEntry(uint256 _arrayIndex) external boardMember {
        if (s_entryProposals[_arrayIndex].votes == 0) {
            revert AlreadyExecuted();
        }
        s_entryProposals[_arrayIndex].votes++;
        if (s_entryProposals[_arrayIndex].votes > s_numOfBoardMembers / 2) {
            internalExecuteEntryAdd(_arrayIndex);
        }
    }

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
        uint256[] memory _exclusionsInRange
    ) external boardMember {
        for (uint256 i = 0; i < _exclusionsInRange.length; i++) {
            s_exclusions[_exclusionsInRange[i]] = true;
        }

        for (uint256 i = _arrayRangeStart; i < _arrayRangeEnd; i++) {
            if (!s_exclusions[i]) {
                internalVoteOnProposal(i);
            }
        }

        for (uint256 i = 0; i < _exclusionsInRange.length; i++) {
            delete s_exclusions[_exclusionsInRange[i]];
        }
    }

    function internalVoteOnProposal(uint256 _proposalIndex) internal {

        if (s_entryProposals[_proposalIndex].votes == 0) {
            revert AlreadyExecuted();
        }

        s_entryProposals[_proposalIndex].votes++;

        if (s_entryProposals[_proposalIndex].votes > s_numOfBoardMembers / 2) {
            internalExecuteEntryAdd(_proposalIndex);
        }
    }

    /**
     * 
     * @param _arrayIndex Index of the proposal in the array of add material proposals
     * 
     * @notice Internal function to execute adding a material to the database
     */
    function internalExecuteEntryAdd(uint256 _arrayIndex) internal {

        IDatabase.Entry memory temp = IDatabase.Entry(
            s_entryProposals[_arrayIndex].newEntry.name,
            s_entryProposals[_arrayIndex].newEntry.author,
            s_entryProposals[_arrayIndex].newEntry.medium,
            s_entryProposals[_arrayIndex].newEntry.yearReleased,
            s_entryProposals[_arrayIndex].newEntry.language,
            s_entryProposals[_arrayIndex].newEntry.cid
        );

        bool success = s_database.addEntry(temp);

        if (success) {
            s_deletedEntryProposals.push(s_entryProposals[_arrayIndex]);
            delete s_entryProposals[_arrayIndex];
        } else {
            revert NotAbleToAddMaterial();
        }
    }

    /**
     * 
     * @param _reason Reason for the spending proposal
     * @param _to Who will receive the funds
     * @param _value How much will be sent
     * 
     * @notice Allows board members to propose spending money
     */
    function spendMoneyProposal(
        string calldata _reason,
        address _to,
        uint256 _value
    ) external boardMember {
        if (_value > s_bankValue) {
            revert NotEnoughFunds();
        }

        if (_to == address(0)) {
            revert NoBurn();
        }

        s_spendMoneyProposals.push(
            SpendMoney(_reason, _to, _value, msg.sender, 1)
        );

        emit NewSpendingProposal(
            s_spendMoneyProposals[s_spendMoneyProposals.length - 1],
            s_spendMoneyProposals.length - 1,
            msg.sender
        );
    }

    /**
     * 
     * @param _arrayIndex Index of the proposal in the array of spend money proposals
     * 
     * @notice Allows board members to vote on spending money
     */
    function voteMoneySpend(uint256 _arrayIndex) external boardMember {
        if (s_spendMoneyProposals[_arrayIndex].votes == 0) {
            revert AlreadyExecuted();
        }

        s_spendMoneyProposals[_arrayIndex].votes++;
        if (
            s_spendMoneyProposals[_arrayIndex].votes > s_numOfBoardMembers / 2
        ) {
            internalExecuteMoneySpend(_arrayIndex);
        }
    }

    /**
     * 
     * @param _arrayIndex Index of the proposal in the array of spend money proposals
     * 
     * @notice Internal function to execute spending money
     */
    function internalExecuteMoneySpend(uint256 _arrayIndex) internal {
        (bool success, bytes memory data) = s_spendMoneyProposals[_arrayIndex]
            .to
            .call{value: s_spendMoneyProposals[_arrayIndex].value}("");

        if (success) {
            s_bankValue -= s_spendMoneyProposals[_arrayIndex].value;
            s_deletedSpendMoneyProposals.push(s_spendMoneyProposals[_arrayIndex]);
            emit MoneySpendExecuted( s_spendMoneyProposals[_arrayIndex].to, s_spendMoneyProposals[_arrayIndex].value);
            delete s_spendMoneyProposals[_arrayIndex];
        }
        else{
            revert TransactionFailed(data);
        }
    }

    /**
     * 
     * @param _newMember Address of the new board member
     * 
     * @notice Allows board members to vote on adding a new board member
     */
    function addBoardMember(address _newMember) external boardMember {
        s_votesForBoard[_newMember]++;

        if (s_votesForBoard[_newMember] > s_numOfBoardMembers / 2) {
            s_boardMembers[_newMember] = true;
            s_numOfBoardMembers++;
        }
        
    }

    /**
     * @notice Returns the current entry proposals
     */
    function getEntryProposals() external view returns (EntryProposal[] memory) {
        return s_entryProposals;
    }

    /**
     * @notice Returns the current spend money proposals
     */
    function getSpendMoneyProposals() external view returns (SpendMoney[] memory) {
        return s_spendMoneyProposals;
    } 

    /**
     * @notice Returns the executed entry proposals
     */
    function getExecutedEntryProposals() external view returns (EntryProposal[] memory) {
        return s_deletedEntryProposals;
    }

    /**
     * @notice Returns the executed spend money proposals
     */
    function getExecutedSpendMoneyProposals() external view returns (SpendMoney[] memory) {
        return s_deletedSpendMoneyProposals;
    }
}
