pragma solidity ^0.4.21;

contract Node{
    byte[500] public image;
    Node next;
    
    function Node(byte[] res){
        setImage(res);
    }
    
    function getNext()public returns(Node){
        return next;
    }
    
    function setNext(Node _next)public{
        next = _next;
    }
    
    function getImage() public constant returns(byte[500] res){
        return image;
    }
    
    function setImage(byte[] res) public{
        for(uint c1=0;c1<res.length;c1++){
            image[c1]=res[c1];
        }
    }
    
    function attachToHead(address addr)public returns(bool){
        bytes4 methodId = bytes4(keccak256("attach()"));
        return addr.call(methodId);
    }
}

contract manager{
    // address master;
    uint count;
    Node public head;
    
    function manager(byte[] img) public{
        head = new Node(img);
        // master = sender;
        count = 0;
    }
    
    function getImage(uint index)public constant returns(byte[500] res){
        Node temp = head;
        index = count - index;
        for(uint c1=0;c1<index;c1++)
            temp = temp.getNext();
        return temp.getImage();
    }
    
    function attach()public {
        Node temp = Node(msg.sender);
        temp.setNext(head);
        head = temp;
        count+=1;
    }
}






