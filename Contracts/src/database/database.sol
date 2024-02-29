// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Database {

    struct Entry {
        // Identifiers
        address author;
        string title;
        uint256 edition;

        // Content
        string content;
    }

    Entry[] private entries;
    mapping(address => Entry[]) private entryByAuthor;
    mapping(string => Entry[]) private entryByTitle;

    // Prevents duplicate entries
    mapping(bytes32 => bool) private entryExists;

    function addEntry(
        string memory title,
        uint256 edition,
        string memory content
    ) public {
        // Prevent duplicates
        bytes32 entryKey = keccak256(abi.encodePacked(title, edition, msg.sender));
        require(!entryExists[entryKey], "Entry already exists.");

        Entry memory entry = Entry(title, msg.sender, edition, content);
        entries.push(entry);

        // Different ways to search
        entryByAuthor[msg.sender].push(entry);
        entryByTitle[title].push(entry);

        // Mark this entry as exists
        entryExists[entryKey] = true;
    }

    function listByAuthor(address author) public view returns (Entry[] memory) {
        return entryByAuthor[author];
    }

    function listByTitle(string memory title) public view returns (Entry[] memory) {
        return entryByTitle[title];
    }

    function listAll() public view returns (Entry[] memory) {
        return entries;
    }
}
