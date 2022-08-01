const contractAddress = "0x8e5EbF85A9B5bC961BBaFE20E665250aC4a1DA2b";
import ABI from "./abi/abi.json" assert {type: "json"};

export const blockchain = new Promise((res) => {
    //if metamask
    if (typeof window.ethereum === 'undefined') {
        console.log('install metamask!!!')
        alert('install metamask!!!')
    }

    const web3 = new Web3(window.ethereum)
    const contract = new web3.eth.Contract(ABI, contractAddress)

    web3.eth.getAccounts().then((accounts) => {
        const account = accounts[0]
        console.log(accounts[0], ' ---- account')

        //current supply of NFT Token
        contract.methods
            .totalSupply()
            .call()
            .then((supply) => {
                console.log(supply, ' ---- cuurent supply')
            })

        //maxsupply
        contract.methods
            .maxSupply()
            .call({ from: account })
            .then((maxsupply) => {
                console.log(maxsupply, ' ---- cuurent max supply')
            })

        //get owner building
        contract.methods
            .getOwnerBuildings()
            .call({ from: account })
            .then((building) => {
                console.log(building, ' ---- your building')
            })

        //get all building
        contract.methods
            .totalSupply()
            .call({ from: account })
            .then((supply) => {
                console.log(supply, ' ---- total nft supply')

                contract.methods
                    .getBuilding()
                    .call({ from: account })
                    .then((data) => {
                        res({ supply: supply, building: data })
                    })
            })
    })
})