// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDatabase} from "../interfaces/database_interface.sol";

contract AlexandriaDAO {
    mapping(address => bool) internal s_boardMembers;
    uint256 private s_numOfBoardMembers;
    uint256 s_bankValue;
    EntryProposal[] private s_entryProposals;
    uint256 private s_numofDeletedEntryProposals;
    SpendMoney[] private s_spendMoneyProposals;
    uint256 private s_numOfDeletedMoneyProposals;
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

    event NewMaterialProposal(
        Entry newEntry,
        uint256 arrayIndex,
        address sender
    );

    event NewSpendingProposal(
        SpendMoney newSpendMoneyProposal,
        uint256 arrayIndex,
        address sender
    );

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
     * @param _name Name of the entry
     * @param _author Author of the entry
     * @param _medium Medium of the entry
     * @param _yearReleased The year the entry was released
     * @param _edition The edition number of the entry
     * @param _language The language the entry is in
     * @param _cid The IPFS cid of the entry
     * 
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
    ) external boardMember {
        Entry memory temp = Entry(
            _name,
            _author,
            _medium,
            _yearReleased,
            _edition,
            _language,
            _cid
        );
        s_entryProposals.push(EntryProposal(temp, msg.sender, 1));
        emit NewMaterialProposal(temp, s_entryProposals.length - 1, msg.sender);
    }

    /**
     * 
     * @param _newEntries Array of entries to be added to the database
     * 
     * @notice Adds an array of entries to the database. Only to be called by Board Members
     */
    function bulkAddMaterial(
        Entry[] calldata _newEntries
    ) external boardMember {
        for (uint i; i < _newEntries.length; ++i) {
            s_entryProposals.push(EntryProposal(_newEntries[i], msg.sender, 1));
            emit NewMaterialProposal(
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
    function voteAddMaterial(uint256 _arrayIndex) external boardMember {
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
    function voteBulkAddMaterial(
        uint256 _arrayRangeStart,
        uint256 _arrayRangeEnd,
        uint256[] memory _exclusionsInRange
    ) external boardMember {
        for (uint256 i = 0; i < _exclusionsInRange.length; i++) {
            s_exclusions[_exclusionsInRange[i]] = true;
        }

        // Vote on the range of proposals
        for (uint256 i = _arrayRangeStart; i < _arrayRangeEnd; i++) {
            if (!s_exclusions[i]) {
                internalVoteOnProposal(i);
            }
        }

        // Clear the exclusions mapping
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
        bool success = s_database.addEntry(
            s_entryProposals[_arrayIndex].newEntry.name,
            s_entryProposals[_arrayIndex].newEntry.author,
            s_entryProposals[_arrayIndex].newEntry.medium,
            s_entryProposals[_arrayIndex].newEntry.yearReleased,
            s_entryProposals[_arrayIndex].newEntry.edition,
            s_entryProposals[_arrayIndex].newEntry.language,
            s_entryProposals[_arrayIndex].newEntry.cid
        );

        if (success) {
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
            emit MoneySpendExecuted( s_spendMoneyProposals[_arrayIndex].to, s_spendMoneyProposals[_arrayIndex].value);
            delete s_spendMoneyProposals[_arrayIndex];
        }
        else{
            revert TransactionFailed(data);
        }
    }

    //add board members by vote 
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
}
