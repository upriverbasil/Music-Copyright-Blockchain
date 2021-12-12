pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;
contract Musicians{
    struct Album{
			string title;
		    string album_name;
			uint year;
	}
	int public num_musicians;
	mapping(string=>mapping(string=>Album)) public musician;
	mapping(string=>bool) public musician_exists;
	mapping(string=>mapping(string=>string[])) public recepients;
	mapping(string=>mapping(string=>uint[])) public payments;
	mapping(string=>mapping(string=>uint)) public recepients_length;
	mapping(string=>mapping(string=>uint)) public payments_length;
	function addAlbum(string memory _publickey, string memory _ipfs, string memory _title, string memory _album_name,
	                   uint _year, string[] memory _recepients, uint[] memory _payments) public {
	    if(!musician_exists[_publickey]){
	        //musician doesn't exists
	       num_musicians++;  
	       musician_exists[_publickey] = true;
	    }
	    musician[_publickey][_ipfs] = Album(_title,_album_name,_year);
		recepients[_publickey][_ipfs] = new string[](0);
		for(uint i=0;i<_recepients.length;i++){
			recepients[_publickey][_ipfs].push(_recepients[i]);
		}
		recepients_length[_publickey][_ipfs] = _recepients.length;
		payments[_publickey][_ipfs] = new uint[](0);
		for(uint i=0;i<_payments.length;i++){
			payments[_publickey][_ipfs].push(_payments[i]);
		}
		payments_length[_publickey][_ipfs] = _payments.length;
	}
}