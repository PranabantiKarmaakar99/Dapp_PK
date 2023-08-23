//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

pragma experimental ABIEncoderV2;


 

contract Chai{


    struct List{
      
      string Name;
      string Message;
      uint256 Timestamp;
      address Sender;



    }


    List[] lists;
    address payable owner;


    constructor() {

     owner = payable(msg.sender);


    }

    uint256 public transactionCount;



     //balance --> give you the balance of the address

     //transfer --> used to transfer to any address

    //function Deposit () public payable{
       



    //} 

     

 

     //fallback() external payable{}

 
  function TransferMoney (string memory name, string memory message ) public payable {
    transactionCount += 1;
    //payable(Aankhi).transfer( address(this).balance);
    owner.transfer(msg.value);

  
     lists.push(List(name, message, block.timestamp,msg.sender));

     }

 function GetTransaction( ) public view returns (List[] memory) {

 return lists;


 }

 function TransactionCount() public view returns (uint256) {

 return transactionCount;

 }

}