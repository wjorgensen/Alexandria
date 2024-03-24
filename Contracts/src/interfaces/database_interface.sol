// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDatabase {
    struct Entry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        string language;
        string cid;
    }

    /**
     * 
     * @param _entry The Entry struct
     * 
     * @return bool
     * 
     * @notice Adds an entry to the database. Only to be called by the DAO
     */
    function addEntry(Entry calldata _entry) external returns (bool);

    /**
     * 
     * @param _search The search term
     * 
     * @return Entry[] An array of Entry structs
     * 
     * @notice Searches by Name or Author and returns an array of Entry structs
     * Search terms must be in lower case with no spaces and if there are numbers in 
     * the original title leave them as numbers, for example "Farenheit 451" would be
     * converted to farenheit451
     * 
     * @dev Will always return Name matches before Author matches
     * 
     * @notice Only needs to be used if you cannot access https://library-of-alexandria.xyz/
     */
    function search(string calldata _search) external view returns (Entry[] memory);

    /**
     * 
     * @return Entry[] An array of Entry structs
     * 
     * @notice Dumps the entire database and returns an array of Entry structs.
     * Primarily used for setup of the website or if you would like to fork the database and add it to another chain. 
     */
    function dump() external view returns (Entry[] memory);

    /**
     * 
     * @param _dao The address of the DAO
     * 
     * @notice Sets the DAO address. Only to be called once.
     */
    function setDao(address _dao) external;

    /**
     * @dev Event emitted when a new entry is added to the database
     */
    event AddedEntry(Entry newEntry);
}