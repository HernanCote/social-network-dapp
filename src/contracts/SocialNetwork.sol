pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "Descentralized Social Network";
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content should not be empty");
        postCount++;
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint256 _id) public payable {
        require(_id > 0 && _id <= postCount, "id not found");
        // fetch the post
        Post memory _post = posts[_id];
        // fetch the author
        address payable _author = _post.author;
        // pay the author by sending ether
        address(_author).transfer(msg.value);
        // Increment tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // update the post
        posts[_id] = _post;
        // trigger event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}
