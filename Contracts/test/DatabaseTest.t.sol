pragma solidity ^0.8.0;

import "contracts/lib/forge-std/src/Test.sol";
import "../src/database/database.sol";

contract DatabaseTest is Test {
    Database private database;

    function setUp() public {
        database = new Database();
    }


    function testSearch() public {
        // Add sample entries to the database
        Database.Entry memory entry1 = Database.Entry("Book1", "Author1", "Medium1", 2021, "Language1", "CID1");
        Database.Entry memory entry2 = Database.Entry("Book2", "Author2", "Medium2", 2022, "Language2", "CID2");
        Database.Entry memory entry3 = Database.Entry("Book3", "Author1", "Medium3", 2023, "Language3", "CID3");

        database.setDao(address(this)); // Set the DAO address to the test contract address
        
        database.addEntry(entry1);
        database.addEntry(entry2);
        database.addEntry(entry3);

        // Test searching by name
        Database.Entry[] memory result1 = database.search("Book1");
        assertEq(result1.length, 1);
        assertEq(result1[0].name, "Book1");
        assertEq(result1[0].author, "Author1");

        // Test searching by author
        Database.Entry[] memory result2 = database.search("Author1");
        assertEq(result2.length, 2);
        assertEq(result2[0].name, "Book1");
        assertEq(result2[1].name, "Book3");

        // Test searching for a non-existent entry
        Database.Entry[] memory result3 = database.search("NonExistent");
        assertEq(result3.length, 0);
    }
}