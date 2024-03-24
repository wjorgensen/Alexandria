// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {Test, console2} from "../lib/forge-std/src/Test.sol";
import {Database} from "../src/database.sol";
import {AlexandriaDAO} from "../src/gov_dao.sol";
import {IDatabase} from "../src/interfaces/database_interface.sol";

contract AlexandriaDAOTest is Test {
    AlexandriaDAO private alexandriaDAO;
    Database private database;
    address[] private boardMembers;
    address private nonBoardMember;

    event Donated(address donater, uint value);
    event MoneySpendExecuted(address to, uint value);
    event NewEntryProposal(AlexandriaDAO.DAOEntry newEntry, uint256 arrayIndex);
    event NewSpendingProposal(
        AlexandriaDAO.SpendMoney newSpendMoneyProposal,
        uint256 arrayIndex
    );

    IDatabase.Entry entry1 =
        IDatabase.Entry("name1", "autho1", "medium", 1, "english", "cid1");

    IDatabase.Entry entry2 =
        IDatabase.Entry("name2", "autho2", "medium", 1, "english", "cid2");

    IDatabase.Entry entry3 =
        IDatabase.Entry("name3", "autho3", "medium", 1, "english", "cid3");

    IDatabase.Entry[] entries;

    function setUp() public {
        boardMembers = [address(1), address(2), address(3), address(5)];
        database = new Database();
        alexandriaDAO = new AlexandriaDAO(boardMembers, address(database));
        database.setDao(address(alexandriaDAO));
        nonBoardMember = address(4);
        entries.push(entry1);
        entries.push(entry2);
        entries.push(entry3);
    }

    function testDonate() public {
        uint256 value = 100;
        vm.deal(address(1), value);

        vm.prank(address(1));
        vm.expectEmit();
        emit Donated(address(1), value);
        alexandriaDAO.donate{value: value}();
    }

    function testAddEntry() public {
        AlexandriaDAO.DAOEntry memory temp = AlexandriaDAO.DAOEntry(
            entry1.name,
            entry1.author,
            entry1.medium,
            entry1.yearReleased,
            entry1.language,
            entry1.cid,
            address(1),
            1
        );

        vm.prank(address(1));
        vm.expectEmit();
        emit NewEntryProposal(temp, 0);
        alexandriaDAO.addEntry(entry1);
    }

    function testBulkAddEntries() public {
        uint256 initialEntriesCount = alexandriaDAO.getEntryProposals().length;

        vm.prank(address(1));
        alexandriaDAO.bulkAddEntries(entries);

        AlexandriaDAO.DAOEntry[] memory updatedEntries = alexandriaDAO
            .getEntryProposals();
        uint256 updatedEntriesCount = updatedEntries.length;

        assertEq(
            updatedEntriesCount,
            initialEntriesCount + entries.length,
            "Entries were not added correctly"
        );
    }

    function testVoteAddEntry() public {
        testAddEntry();
        vm.prank(address(2));
        alexandriaDAO.voteAddEntry(0);

        Database.Entry[] memory temp = database.dump();

        assertEq(temp.length, 2);
    }

    function testVoteAddEntryAlreadyExecuted() public {
        testVoteAddEntry();

        vm.prank(address(5));
        vm.expectRevert(AlexandriaDAO.AlreadyExecuted.selector);
        alexandriaDAO.voteAddEntry(0);
    }

    function testVoteAddEntryAlreadyVoted() public {
        testAddEntry();

        vm.prank(address(1));
        vm.expectRevert(AlexandriaDAO.AlreadyVoted.selector);
        alexandriaDAO.voteAddEntry(0);
    }


    function testVoteAddEntryNotAbleToAddMaterial() public{
        testVoteAddEntry();

        vm.prank(address(1));
        alexandriaDAO.addEntry(entry1);
        
        vm.prank(address(2));
        vm.expectRevert(AlexandriaDAO.NotAbleToAddMaterial.selector);
        alexandriaDAO.voteAddEntry(1);
    }


    function testVoteAddEntryNotBoardMember() public {
        testAddEntry();
        vm.prank(nonBoardMember);
        vm.expectRevert(AlexandriaDAO.NotBoardMember.selector);
        alexandriaDAO.voteAddEntry(0);
    }

    function testSpendMoneyProposal() public {
        testDonate();
        vm.prank(address(1));
        vm.expectEmit();
        emit NewSpendingProposal(
            AlexandriaDAO.SpendMoney("reason", address(1), 10, address(1), 1),
            0
        );
        alexandriaDAO.spendMoneyProposal("reason", address(1), 10);
    }

    function testSpendMoneyProposalNotEnoughFunds() public {
        testDonate();
        vm.prank(address(1));
        vm.expectRevert(AlexandriaDAO.NotEnoughFunds.selector);
        alexandriaDAO.spendMoneyProposal("reason", address(1), 110);
    }

    function testSpendMoneyProposalNoBurn() public {
        testDonate();
        vm.prank(address(1));
        vm.expectRevert(AlexandriaDAO.NoBurn.selector);
        alexandriaDAO.spendMoneyProposal("reason", address(0), 10);
    }

    function testVoteMoneySpend() public {
        testSpendMoneyProposal();
        uint256 initialBalance = address(1).balance;

        vm.prank(address(2));
        alexandriaDAO.voteMoneySpend(0);

        vm.prank(address(3));
        alexandriaDAO.voteMoneySpend(0);

        assertEq(address(1).balance, initialBalance + 10);
    }

    function testVoteMoneySpendAlreadyExecuted() public {
        testVoteMoneySpend();

        vm.prank(address(5));
        vm.expectRevert(AlexandriaDAO.AlreadyExecuted.selector);
        alexandriaDAO.voteMoneySpend(0);
    }

    function testVoteMoneySpendAlreadyVoted() public {
        testSpendMoneyProposal();
        

        vm.prank(address(2));
        alexandriaDAO.voteMoneySpend(0);

        vm.prank(address(2));
        vm.expectRevert(AlexandriaDAO.AlreadyVoted.selector);
        alexandriaDAO.voteMoneySpend(0);
    }



}
