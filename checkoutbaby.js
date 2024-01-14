// app.js
const contractAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B"; // Replace with your deployed contract address
const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getBalance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

$(document).ready(async function () {
    try {
        // Check if Web3 is already injected (e.g., MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use the provider from the injected Web3 object
            window.web3 = new Web3(web3.currentProvider);
        } else {
            // Fallback to a local Ethereum node (you might want to handle this differently in production)
            window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }

        // Prompt user to connect MetaMask
        await window.ethereum.enable();

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get the current account
        const accounts = await web3.eth.getAccounts();
        const currentAccount = accounts[0];

        // Get and display the wallet balance
        const balance = await contract.methods.getBalance().call({ from: currentAccount });
        $("#balance").text(`Wallet Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    } catch (error) {
        console.error("Error:", error);
    }
});