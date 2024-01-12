const contractABI = [...];
const contractAddress = '0xYourContractAddress';  

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); 
} else {
    console.error('Web3 not detected. Please install MetaMask or use an Ethereum browser.');
}

web3.eth.getAccounts().then(accounts => {
    web3.eth.defaultAccount = accounts[0];
});

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getUserAccount() {
    try {
        const accounts = await web3.eth.requestAccounts();
        console.log('Connected account:', accounts[0]);
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
    }
}

async function interactWithContract() {
    try {

        const result = await contract.methods.yourFunction().call();
        document.getElementById('result').innerText = `Result: ${result}`;
    } catch (error) {
        console.error('Error interacting with the contract:', error);
        document.getElementById('result').innerText = 'Error interacting with the contract.';
    }
}
