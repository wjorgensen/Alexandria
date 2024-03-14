// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import { Script } from "../lib/forge-std/src/Script.sol";
import { AlexandriaDAO } from "../src/dao/gov_dao.sol";
import { Database } from "../src/database/database.sol";

contract Deploy is Script {
    address[] private boardMembers = new address[](1);
    AlexandriaDAO private alexandriaDAO;
    Database private database;

    function run() public {
        //boardMembers.push();
        database = new Database();
        alexandriaDAO = new AlexandriaDAO(boardMembers, address(database));
        database.setDao(address(alexandriaDAO));
    }
}