import abi from "./abi/abi.json" assert {type: "json"};

//SC:0x958A782C88bEB109B623CC372ACA19AB988be4B7

const blockchain = new Promise((res, rej) => {
    //if mettamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("YOU SHOULD INSTALL METAMASK");
        console.log("INSTALL")
    }

    //For Connecting your wallet to metamask.!
    //NOTE THIS IS VERY IMPORTANT STEP 
    // const accounts = window.ethereum.request({ method: 'eth_requestAccounts' });



    // Web3 instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x747615239fde97551096EA97635B11328f9Ce51F") //passing the abi and the address of smart contract

    // Get metamask Address
    web3.eth.getAccounts().then((accounts) => {
        console.log("-> MY ACCOUNT IS: ", accounts[0]);
    })
    

    // Get the current supply of NFT Tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            console.log("-> Current Supply of NFT Tokens IS: ", supply);
        });
    })


    // Get the maximum supply of NFT Tokens
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.maxSupply().call({ from: accounts[0] }).then((maxsupply) => {
            console.log("-> Maximum Supply of NFT Tokens IS: ", maxsupply);
        });
    })
    
    // Get your buildings made in the metaverse
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.getOwnerBuildings().call().then((buildings) => {           
            console.log("-> Your Buildings", buildings);
        })
    })

    // Get ALl buildings made in the metaverse
    web3.eth.getAccounts().then((accounts) => {
        contract.methods.totalSupply().call({ from: accounts[0] }).then((supply) => {
            contract.methods.getBuildings().call({ from: accounts[0] }).then((data) => {
                res({ supply: supply, building: data })
            });
        });
    })


    //Get all the buildings made in the metaverse

});


export default blockchain;