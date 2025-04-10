// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract NCommerce{
    address public owner;

    struct Product{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 price;
        uint256 review;
        uint256 stock;
    }

    struct Order{
        uint256 orderTime;
        Product product;
    }

    mapping(uint256 => Product) public products;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public ordersCount;

    event Purchase(address buyer, uint256 orderId, uint256 productId);
    event List(string name, uint256 price, uint256 quantity);

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _price,
        uint256 _review,
        uint256 _stock

    ) public onlyOwner{
        Product memory product = Product(
            _id, _name, _category, _image, _price, _review, _stock
        );

        products[_id] = product;

        emit List(_name, _price, _stock);
    }

    function buy(uint256 _id) public payable {
        Product memory product = products[_id];

        require(msg.value >= product.price);

        require(product.stock > 0, "Sorry the product is currently not available");

        Order memory order = Order(block.timestamp, product);

        ordersCount[msg.sender]++;
        orders[msg.sender][ordersCount[msg.sender]] = order;

        products[_id].stock = product.stock - 1;

        emit Purchase(msg.sender, ordersCount[msg.sender], product.id);
    }

    function withdraw() public onlyOwner{
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }


}