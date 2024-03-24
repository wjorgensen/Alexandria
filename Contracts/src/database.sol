// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Database {

    Entry[] private s_entries;
    mapping(string => string[]) private s_entryByAuthor;
    mapping(string => string[]) private s_entryByName;
    mapping(string => uint256) private s_entryByCID;

    address s_dao;
    address s_owner;

    error NotOwner();
    error NotDAO();

    event AddedEntry(Entry newEntry);

    struct Entry{
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        string language;
        string cid;
    }

    /**
     * @dev Constructor sets the owner of the contract
     */
    constructor(){
        s_owner = msg.sender;

        //Instert first entry so checking for already instered CID's works
        s_entries.push(
            Entry(
                "Genesis",
                "Wes Jorgensen",
                "Bits",
                2024,
                "English",
                "library-of-alexandria.xyz"
            )
        );
    }

    /**
     * 
     * @param _entry The Entry struct
     * 
     * @return bool
     * 
     * @notice Adds an entry to the database. Only to be called by the DAO
     */
    function addEntry(
        Entry calldata _entry
    ) public returns(bool){
        if(msg.sender != s_dao){
            revert NotDAO();
        }

        if(s_entryByCID[_entry.cid] != 0){
            return false;
        }

        s_entries.push(_entry);

        internalAddEntryToSearchMappings(_entry);

        emit AddedEntry(_entry);

        return true;
    }

    function internalAddEntryToSearchMappings(Entry calldata _entry) internal {
        s_entryByCID[_entry.cid] = s_entries.length - 1;
        s_entryByAuthor[_entry.author].push(_entry.cid);
        s_entryByName[_entry.name].push(_entry.cid);
    }


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
    function search(string calldata _search) external view returns (Entry[] memory) {
        Entry[] memory result = new Entry[](0);

        string[] memory nameMatches = s_entryByName[_search];
        for (uint i = 0; i < nameMatches.length; i++) {
            result = appendEntry(result, s_entries[s_entryByCID[nameMatches[i]]]);
        }

        string[] memory authorMatches = s_entryByAuthor[_search];
        for (uint i = 0; i < authorMatches.length; i++) {
            result = appendEntry(result, s_entries[s_entryByCID[authorMatches[i]]]);
        }

        return result;
    }

    function appendEntry(Entry[] memory array, Entry memory entry) private pure returns (Entry[] memory) {
        Entry[] memory newArray = new Entry[](array.length + 1);
        for (uint i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        newArray[array.length] = entry;
        return newArray;
    }

    /**
     * 
     * @return Entry[] An array of Entry structs
     * 
     * @notice Dumps the entire database and returns an array of Entry structs.
     * Primarily used for setup of the website or if you would like to fork the database and add it to another chain. 
     */
    function dump() external view returns(Entry[] memory){
        return s_entries;
    }

    /**
     * 
     * @param _dao The address of the DAO
     * 
     * @notice Sets the DAO address. Only to be called once.
     */
    function setDao(address _dao) external {
        if(msg.sender != s_owner){
            revert NotOwner();
        }
        s_dao = _dao;
        s_owner = address(0);
    }
}
