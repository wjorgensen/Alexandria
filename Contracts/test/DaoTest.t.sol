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

   

    function setUp() public {
        boardMembers = [address(1), address(2), address(3)];
        database = new Database();
        alexandriaDAO = new AlexandriaDAO(boardMembers, address(database));
        database.setDao(address(alexandriaDAO));
        nonBoardMember = address(4);
    }

    
}