// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Test } from "lib/forge-std/src/Test.sol";
import { Database } from "../src/database/database.sol";
import { AlexandriaDAO } from "../src/dao/gov_dao.sol";

contract AlexandriaDAOTest is Test {
    AlexandriaDAO private alexandriaDAO;
    Database private database;
    address[] private boardMembers;
    address private nonBoardMember;

    struct Entry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        uint256 edition;
        string language;
        string cid;
    }

    function setUp() public {
        boardMembers = [address(1), address(2), address(3)];
        database = new Database();
        alexandriaDAO = new AlexandriaDAO(boardMembers, address(database));
        nonBoardMember = address(4);
    }

    // Test donate function
    function testDonate() public {
        uint256 initialBalance = address(alexandriaDAO).balance;
        uint256 donationAmount = 1 ether;
        alexandriaDAO.donate{value: donationAmount}();
        assertEq(address(alexandriaDAO).balance, initialBalance + donationAmount);
    }

    event NewMaterialProposal(
        Entry newEntry,
        uint256 arrayIndex,
        address sender
    );
    // Test addMaterial function
    function testAddMaterial() public {
        vm.prank(boardMembers[0]);
        vm.expectEmit();
        emit NewMaterialProposal(
            Entry("Name", "Author", "Medium", 2023, 1, "Language", "CID"),
            0,
            boardMembers[0]
        );
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");

    }

    // Test bulkAddMaterial function
    function testBulkAddMaterial() public {
        AlexandriaDAO.Entry[] memory entries = new AlexandriaDAO.Entry[](2);
        entries[0] = AlexandriaDAO.Entry("Name1", "Author1", "Medium1", 2023, 1, "Language1", "CID1");
        entries[1] = AlexandriaDAO.Entry("Name2", "Author2", "Medium2", 2023, 1, "Language2", "CID2");
        
        vm.prank(boardMembers[0]);
        alexandriaDAO.bulkAddMaterial(entries);
        // Add assertions to check the state after bulk adding materials
    }

    // Test voteAddMaterial function
    function testVoteAddMaterial() public {
        vm.prank(boardMembers[0]);
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");
        
        vm.prank(boardMembers[1]);
        alexandriaDAO.voteAddMaterial(0);
        // Add assertions to check the state after voting
    }

    // Test voteBulkAddMaterial function
    // function testVoteBulkAddMaterial() public {
    //     AlexandriaDAO.Entry[] memory entries = new AlexandriaDAO.Entry[](2);
    //     entries[0] = AlexandriaDAO.Entry("Name1", "Author1", "Medium1", 2023, 1, "Language1", "CID1");
    //     entries[1] = AlexandriaDAO.Entry("Name2", "Author2", "Medium2", 2023, 1, "Language2", "CID2");
        
    //     vm.prank(boardMembers[0]);
    //     alexandriaDAO.bulkAddMaterial(entries);

    //     uint256[] memory exclusions = new uint256[](0);
    //     vm.prank(boardMembers[1]);
    //     alexandriaDAO.voteBulkAddMaterial(0, 2, exclusions);
    //     // Add assertions to check the state after bulk voting
    // }

    // Test spendMoneyProposal function
    function testSpendMoneyProposal() public {
        uint256 proposalAmount = 1 ether;
        vm.deal(address(alexandriaDAO), proposalAmount);

        vm.prank(boardMembers[0]);
        alexandriaDAO.spendMoneyProposal("Reason", address(1), proposalAmount);
        // Add assertions to check the state after creating a spending proposal
    }

    // Test voteMoneySpend function
    function testVoteMoneySpend() public {
        uint256 proposalAmount = 1 ether;
        vm.deal(address(alexandriaDAO), proposalAmount);

        vm.prank(boardMembers[0]);
        alexandriaDAO.spendMoneyProposal("Reason", address(1), proposalAmount);

        vm.prank(boardMembers[1]);
        alexandriaDAO.voteMoneySpend(0);
        // Add assertions to check the state after voting on a spending proposal
    }

    // Test addBoardMember function
    function testAddBoardMember() public {
        vm.prank(boardMembers[0]);
        alexandriaDAO.addBoardMember(nonBoardMember);

        vm.prank(boardMembers[1]);
        alexandriaDAO.addBoardMember(nonBoardMember);

        // Add assertions to check if the new board member is added
    }

    // Test access control for board member only functions
    function testAccessControl() public {
        vm.expectRevert(AlexandriaDAO.NotBoardMember.selector);
        vm.prank(nonBoardMember);
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");

        // Add more tests for other board member only functions
    }

    // Test error when adding duplicate material
    function testRevert_DuplicateMaterial() public {
        vm.prank(boardMembers[0]);
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");

        vm.expectRevert(AlexandriaDAO.AlreadyExecuted.selector);
        vm.prank(boardMembers[0]);
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");
    }

    // Test error when voting on already executed proposal
    function testRevert_AlreadyExecutedProposal() public {
        vm.prank(boardMembers[0]);
        alexandriaDAO.addMaterial("Name", "Author", "Medium", 2023, 1, "Language", "CID");

        vm.prank(boardMembers[1]);
        alexandriaDAO.voteAddMaterial(0);

        vm.prank(boardMembers[1]);
        vm.expectRevert(AlexandriaDAO.AlreadyExecuted.selector);
        alexandriaDAO.voteAddMaterial(0);
    }

    // Test error when spending more than available funds
    function testRevert_InsufficientFunds() public {
        uint256 proposalAmount = 1 ether;

        vm.prank(boardMembers[0]);
        vm.expectRevert(AlexandriaDAO.NotEnoughFunds.selector);
        alexandriaDAO.spendMoneyProposal("Reason", address(1), proposalAmount);
    }

    // Test error when trying to burn funds
    function testRevert_BurnFunds() public {
        uint256 proposalAmount = 1 ether;
        vm.deal(address(alexandriaDAO), proposalAmount);

        vm.expectRevert(AlexandriaDAO.NoBurn.selector);
        vm.prank(boardMembers[0]);
        alexandriaDAO.spendMoneyProposal("Reason", address(0), proposalAmount);
    }

    // Add more test functions for other scenarios and edge cases
}