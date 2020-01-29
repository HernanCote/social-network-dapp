import Web3 from 'web3';

const web3 = new Web3();

const toEther = (amount) => {
    return web3.utils.fromWei(amount.toString(), 'Ether');
}

export {
    toEther,
};