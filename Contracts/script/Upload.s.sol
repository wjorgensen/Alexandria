// import { Script } from "../lib/forge-std/src/Script.sol";
// import { AlexandriaDAO } from "../src/dao/gov_dao.sol";
// import { stdJson } from "../lib/forge-std/src/stdJson.sol"; 

// contract Upload is Script{
//     AlexandriaDAO private alexandriaDAO;
//     AlexandriaDAO.Entry[] private entries;

//     function run() public {
//         string memory jsonData = vm.readFile("upload.json");
//         entries = abi.decode(vm.parseJson(jsonData), (AlexandriaDAO.Entry[]));

//         alexandriaDAO = AlexandriaDAO(0x6b8ce65bf1cc6ce6c09295615b6d239ab8f4ffc7);

//         alexandriaDAO.bulkAddEntries(entries);


//     }
// }