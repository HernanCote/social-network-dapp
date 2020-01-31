import Web3 from 'web3';
import Identicon from 'identicon.js';

const web3 = new Web3();

const createIdenticonSrc = (account) => {
    return `data:image/png;base64,${new Identicon(account, 30).toString()}`;
}
const toEther = (amount) => {
    return web3.utils.fromWei(amount.toString(), 'Ether');
}

export {
    toEther,
    createIdenticonSrc,
};