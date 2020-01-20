const SocialNetwork = artifacts.require('../src/contracts/SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork;

    before(async () => {
        socialNetwork = await SocialNetwork.deployed();
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await socialNetwork.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await socialNetwork.name();
            assert.equal(name, 'Descentralized Social Network');
        });
    });

    describe('post', async () => {
        let result, postCount;

        before(async () => {
            result = await socialNetwork.createPost('First post created', { from: author })
            postCount = await socialNetwork.postCount();
        });

        it('should create posts', async () => {
            // SUCCESS
            assert.equal(postCount, 1);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(event.content, 'First post created', 'content is correct');
            assert.equal(event.tipAmount.toNumber(), 0, 'tip amount is correct');
            assert.equal(event.author, author, 'author is corect');

            // FAILURE
            await socialNetwork.createPost('', { from: author }).should.be.rejected;
        });

        it('should list posts', async () => {
            const post = await socialNetwork.posts(postCount);

            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(post.content, 'First post created', 'content is correct');
            assert.equal(post.tipAmount.toNumber(), 0, 'tip amount is correct');
            assert.equal(post.author, author, 'author is corect');
        });

        it('Should allow users to tip post', async () => {
            // Track the author balance before the tip
            let oldAuthorBalance;
            oldAuthorBalance = await web3.eth.getBalance(author);
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);

            // Call tip
            result = await socialNetwork.tipPost(
                postCount,
                {
                    from: tipper,
                    value: web3.utils.toWei('1', 'Ether')
                });

            // SUCCESS
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(event.content, 'First post created', 'content is correct');
            assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct');
            assert.equal(event.author, author, 'author is corect');

            // Check that author received funds
            let newAuthorBalance;
            newAuthorBalance = await web3.eth.getBalance(author);
            newAuthorBalance = new web3.utils.BN(newAuthorBalance);

            let tipAmount;
            tipAmount = web3.utils.toWei('1', 'Ether');
            tipAmount = new web3.utils.BN(tipAmount);

            const expectedBalance = oldAuthorBalance.add(tipAmount);

            assert.equal(newAuthorBalance.toString(), expectedBalance.toString());

            // ON FAILURE: tries to tip a post that does not exists

            await socialNetwork.tipPost(99,
                {
                    from: tipper,
                    value: web3.utils.toWei('1', 'Ether')
                }
            ).should.be.rejected;
        });
    });
});