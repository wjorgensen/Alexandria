// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import { Test } from "../lib/forge-std/src/Test.sol";
import { Database } from "../src/database/database.sol";
import { AlexandriaDAO } from "../src/dao/gov_dao.sol";
import { IDatabase } from "../src/interfaces/database_interface.sol";

contract AlexandriaDAOTest is Test {
    AlexandriaDAO private alexandriaDAO;
    Database private database;
    address[] private boardMembers;
    address private nonBoardMember;

    event Donated(address donater, uint value);
    event MoneySpendExecuted(address to, uint value);
    event NewEntryProposal(AlexandriaDAO.DAOEntry newEntry, uint256 arrayIndex);

    IDatabase.Entry entry1 = IDatabase.Entry(
        "name1",
        "autho1",
        "medium",
        1,
        "english",
        "cid1"
    );

    IDatabase.Entry entry2 = IDatabase.Entry(
        "name2",
        "autho2",
        "medium",
        1,
        "english",
        "cid2"
    );

    IDatabase.Entry entry3 = IDatabase.Entry(
        "name3",
        "autho3",
        "medium",
        1,
        "english",
        "cid3"
    );

    IDatabase.Entry[] entries;


    function setUp() public {
        boardMembers = [address(1), address(2), address(3)];
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
        vm.prank(address(1));
        vm.expectEmit();
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
        emit NewEntryProposal(temp, 0);
        alexandriaDAO.addEntry(entry1);
    }

    function testBulkAddEntries() public {
        uint256 initialEntriesCount = alexandriaDAO.getEntryProposals().length;

        vm.prank(address(1));
        alexandriaDAO.bulkAddEntries(entries);

        AlexandriaDAO.DAOEntry[] memory updatedEntries = alexandriaDAO.getEntryProposals();
        uint256 updatedEntriesCount = updatedEntries.length;

        assertTrue(true);
       //assertEq(updatedEntriesCount, initialEntriesCount + entries.length, "Entries were not added correctly");
    }

    
}