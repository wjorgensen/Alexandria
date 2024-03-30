import { Script } from "../lib/forge-std/src/Script.sol";
import { AlexandriaDAO } from "../src/gov_dao.sol";
import { IDatabase } from "../src/interfaces/database_interface.sol";
import { stdJson } from "../lib/forge-std/src/stdJson.sol"; 

contract Upload is Script{
    AlexandriaDAO private alexandriaDAO;
    IDatabase.Entry[] private entries;
    address payable daoAddress;

    function run() public {
        string memory jsonData = vm.readFile("upload.json");
        //entries = abi.decode(vm.parseJson(jsonData), (IDatabase.Entry[]));

        alexandriaDAO = AlexandriaDAO(daoAddress);

        alexandriaDAO.bulkAddEntries(entries);


    }
}