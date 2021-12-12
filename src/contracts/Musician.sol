pragma solidity >=0.5.0;

contract Musicians{
    struct Album{
			string title;
		    string album_name;
			uint year;
			string recepients;
			uint payments;
	}
	int public num_musicians;
	mapping(string=>mapping(string=>Album)) public musician;
	mapping(string=>bool) public musician_exists;
	mapping(string=>mapping(string=>bool)) public album_exists;
	string[] public all_public_keys;
	string[] public all_ipfs_hash;
	// mapping(string=>mapping(string=>address[])) public recepients;
	// mapping(string=>mapping(string=>uint[])) public payments;
	// mapping(string=>mapping(string=>uint)) public recepients_length;
	// mapping(string=>mapping(string=>uint)) public payments_length;
	function addAlbum(string memory _publickey, string memory _ipfs, string memory _title, string memory _album_name,
	                   uint _year, string memory _recepients, uint _payments) public {
	    
	    if(!musician_exists[_publickey]){
	        //musician doesn't exists
	       num_musicians++;  
	       all_public_keys.push(_publickey);
	       musician_exists[_publickey] = true;
	    }
	    all_ipfs_hash.push(_ipfs);
	    musician[_publickey][_ipfs] = Album(_title,_album_name,_year,_recepients,_payments);
		
	    album_exists[_publickey][_ipfs] = true;
	    
	}
	    
}    
    
    
