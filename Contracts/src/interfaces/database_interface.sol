// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDatabase {
    // Event declaration
    event AddedEntry(
        string name,
        string author,
        string medium,
        uint256 yearReleased,
        uint256 edition,
        string language,
        string cid
    );

    // Struct declaration
    struct Entry {
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        uint256 edition;
        string language;
        string cid;
    }

    /**
     * @notice Adds an entry to the database. Only to be called by the DAO.
     */
    function addEntry(
        string calldata _name,
        string calldata _author,
        string calldata _medium,
        uint256 _yearReleased,
        uint256 _edition,
        string calldata _language,
        string calldata _cid
    ) external returns (bool);

    /**
     * @notice Searches the database for entries that match the search term and returns an array of Entry structs.
     */
    function search(string calldata _search) external view returns (Entry[] memory);

    /**
     * @notice Dumps the entire database and returns an array of Entry structs.
     */
    function dump() external view returns (Entry[] memory);

    /**
     * @notice Sets the DAO address. Only to be called once.
     */
    function setDao(address _dao) external;
}
