import React, { Component } from 'react';
import Web3 from 'web3';

import SocialNetwork from './abis/SocialNetwork.json';
import Navbar, { createIdenticonSrc } from './components/Navbar';

import { toEther } from './utils';

import './App.css';

class App extends Component {

  state = {
    account: '',
    socialNetwork: {},
    postCount: 0,
    posts: [],
  };

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected, consider using MetaMask.');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];

    if (networkId) {
      try {
        const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address);
        this.setState({ socialNetwork });
        const postCount = await socialNetwork.methods.postCount().call();
        this.setState({ postCount });

        // load post
        for (let i = 0; i <= postCount; i++) {
          const post = await socialNetwork.methods.posts(i).call();
          this.setState({ posts: [...this.state.posts, post] })
        }
        console.log(this.state.posts);
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      window.alert('Contract not deployed to the blockchain');
    }
    // Address
    // ABI

  }

  render() {
    const { account, posts } = this.state;
    return (
      <div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '32rem' }}>
              <div className="content mr-auto ml-auto">
                {posts.map((post, idx) => (
                  <div className="card mb-4" key={idx}>
                    <div className="card-header">
                      <img
                        alt="user"
                        className="mr-2"
                        width="30"
                        height="30"
                        src={createIdenticonSrc(account)}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">TIPS: {toEther(post.tipAmount)} ETH</small>
                        <button className="btn btn-link btn-sm float-right pt-0"><span>TIP 0.1 ETH</span></button>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
