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

    event AddedEntry(
        string name,
        string author,
        string medium,
        uint256 yearReleased,
        uint256 edition,
        string language,
        string cid
    );

    struct Entry{
        string name;
        string author;
        string medium;
        uint256 yearReleased;
        uint256 edition;
        string language;
        string cid;
    }

    /**
     * @dev Constructor sets the owner of the contract
     */
    constructor(){
        s_owner = msg.sender;
    }

    /**
     * 
     * @param _name The name or title of the entry
     * @param _author The author of the entry
     * @param _medium The medium of the entry, ex. book, paper, etc.
     * @param _yearReleased The year the entry was released
     * @param _edition The edition number of the entry
     * @param _language The language the entry is in
     * @param _cid The IPFS cid of the entry
     * 
     * @return bool
     * 
     * @notice Adds an entry to the database. Only to be called by the DAO
     */
    function addEntry(
        string calldata _name,
        string calldata _author,
        string calldata _medium,
        uint256 _yearReleased,
        uint256 _edition,
        string calldata _language,
        string calldata _cid
    ) public returns(bool){
        if(msg.sender != s_dao){
            revert NotDAO();
        }

        if(s_entryByCID[_cid] != 0){
            return false;
        }

        Entry memory entry = Entry(_name, _author, _medium, _yearReleased, _edition, _language,  _cid);
        s_entries.push(entry);

        s_entryByCID[_cid] = s_entries.length - 1;
        s_entryByAuthor[_author].push(_cid);
        s_entryByName[_name].push(_cid);

        emit AddedEntry(_name, _author, _medium, _yearReleased, _edition, _language,  _cid);

        return true;
    }

    //Searches by Name or Author and returns an array of Entry structs
    //Search terms must be in lower case with no spaces and if there are numbers in 
    //the original title leave them as numbers, for example "Farenheit 451" would 
    //be converted to farenheit451
    //Note: Will always return Name matches before Author matches

    /**
     * 
     * @param _search The search term
     * 
     * @return Entry[] An array of Entry structs
     * 
     * @notice Searches the database for entries that match the search term and returns an array of Entry structs.
     * Only needs to be used if you cannot access https://library-of-alexandria.xyz/
     */
    function search(string calldata _search) external view returns(Entry[] memory){
        Entry[] memory end;

        if(s_entryByName[_search].length > 0){
            string[] memory temp = s_entryByName[_search];
            for(uint i; i < temp.length; i++){
                end[end.length] = (s_entries[s_entryByCID[temp[i]]]);
            }
        }

        if(s_entryByAuthor[_search].length > 0){
            string[] memory temp = s_entryByAuthor[_search];
            for(uint i; i < temp.length; i++){
                end[end.length] = (s_entries[s_entryByCID[temp[i]]]);
            }
        }

        return end;
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
