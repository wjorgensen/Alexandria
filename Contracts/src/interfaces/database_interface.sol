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

    event AddedEntry(Entry newEntry);

    /**
     * @notice Adds an entry to the database. Only to be called by the DAO.
     * @param _entry The Entry struct.
     * @return bool
     */
    function addEntry(Entry calldata _entry) external returns (bool);

    /**
     * @notice Searches by Name or Author and returns an array of Entry structs.
     * Search terms must be in lower case with no spaces and if there are numbers in
     * the original title leave them as numbers, for example "Farenheit 451" would be
     * converted to farenheit451.
     * @dev Will always return Name matches before Author matches.
     * @param _search The search term.
     * @return Entry[] An array of Entry structs.
     * @notice Only needs to be used if you cannot access https://library-of-alexandria.xyz/.
     */
    function search(string calldata _search) external view returns (Entry[] memory);

    /**
     * @notice Dumps the entire database and returns an array of Entry structs.
     * Primarily used for setup of the website or if you would like to fork the database and add it to another chain.
     * @return Entry[] An array of Entry structs.
     */
    function dump() external view returns (Entry[] memory);

    /**
     * @notice Sets the DAO address. Only to be called once.
     * @param _dao The address of the DAO.
     */
    function setDao(address _dao) external;
}