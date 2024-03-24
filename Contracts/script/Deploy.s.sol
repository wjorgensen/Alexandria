// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Script } from "../lib/forge-std/src/Script.sol";
import { AlexandriaDAO } from "../src/gov_dao.sol";
import { Database } from "../src/database.sol";

contract Deploy is Script {
    address[] private boardMembers = new address[](1);
    AlexandriaDAO private alexandriaDAO;
    Database private database;

    function run() public {
        boardMembers.push(address(0));
        database = new Database();
        alexandriaDAO = new AlexandriaDAO(boardMembers, address(database));
        database.setDao(address(alexandriaDAO));
    }
}