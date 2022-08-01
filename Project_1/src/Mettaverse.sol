// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

//Openzeplin Imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Address: 0x958A782C88bEB109B623CC372ACA19AB988be4B7

// Address_ganache: 0xE5491933A6A5e553CE9ef4904A32A42f25DF5ded 
//Creation of the metaverse smart contract with NFT Tokens
contract Metaverse is ERC721,Ownable{

    // Constructor
    constructor() ERC721("META","MJG"){}



    //Counters to regulate the current amount of NFT Tokens minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    //Total number of NFT available for creation


    uint public maxSupply = 100;

    // Cost to be paid for each NFT Token 
    uint256 public cost = 0.001 ether;


    // Owner and its properties in the metaverse

    mapping(address=>Building []) NFTOwners;

    // Metaverse buildings
    struct Building{
        string name;
        int8 width;
        int8 height;
        int8 depth;
        int8 pos_x;
        int8 pos_y;
        int8 pos_z;
    }


    //List of Metaverse Buildings

    Building[] public buildings;

    //Obtaining the buildings made in metaverse

    function getBuildings() public view returns (Building[] memory){
        return buildings;
    }

    // Current supply of NFT Tokens
    function totalSupply() public view returns(uint256){
        return supply.current();
    }

    // Creation of the buildings as a NFT Token in the metaverse

    function mint(string memory _building_name, int8 _width,int8 _height,int8 _depth,int8 _pos_x,int8 _pos_y,int8 _pos_z,address sender) public payable{
        require(supply.current() <= maxSupply,"MAX Supply Exceeded.!");
        // require(msg.value >= cost,"Insufficient Funds!");
        supply.increment();
        _safeMint(sender,supply.current());
        Building memory _newBuild = Building(_building_name,_width,_height,_depth,_pos_x,_pos_y,_pos_z);
        buildings.push(_newBuild);
        NFTOwners[sender].push(_newBuild);
    }

    //Extraction of ethers from Smart Contract To The Owner
    function withdraw() external payable onlyOwner{
        address payable _ownner = payable(owner());
        _ownner.transfer(address(this).balance);
    }

    // Obtain a user's metaverse buildings
    function getOwnerBuildings(address sender) public view returns (Building[] memory){
        return NFTOwners[sender];
    }
}