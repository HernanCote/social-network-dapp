import React, { Component } from 'react';
import Web3 from 'web3';

import SocialNetwork from './abis/SocialNetwork.json';
import Navbar from './components/Navbar';
import Main from './components/Main';

import './App.css';

class App extends Component {

  state = {
    account: '',
    socialNetwork: {},
    postCount: 0,
    posts: [],
    isLoading: true,
  };

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  loadWeb3 = async () => {
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

  loadBlockchainData = async () => {
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

        this.setState({
          posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount),
        })
      }
      catch (err) {
        console.log(err);
      }
      finally {
        this.setState({ isLoading: false });
      }
    }
    else {
      window.alert('Contract not deployed to the blockchain');
    }
  }

  createPost = (content) => {
    this.setState({ isLoading: true })
    const { socialNetwork, account } = this.state;
    socialNetwork.methods.createPost(content)
      .send({ from: account })
      .on('receipt', receipt =>
        this.setState({ isLoading: false })
      );
  }

  tipPost = (id, tipAmount) => {
    const { socialNetwork, account } = this.state;
    this.setState({ isLoading: true });
    socialNetwork.methods.tipPost(id)
      .send({ from: account, value: tipAmount })
      .on('receipt', receipt =>
        this.setState({ isLoading: false })
      );
  }

  render() {
    const { account, posts, isLoading } = this.state;
    return (
      <>
        <Navbar account={account} />
        {isLoading && (
          <div className="text-center mt-5">
            <p>Loading data</p>
          </div>
        )}
        {!isLoading && (
          <Main
            posts={posts}
            createPost={this.createPost}
            tipPost={this.tipPost}
          />
        )}
      </>
    );
  }
}

export default App;
