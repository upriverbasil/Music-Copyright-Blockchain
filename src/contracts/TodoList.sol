pragma solidity ^0.5.0;

contract TodoList{
	uint public taskCount = 0;
	struct Task{
		uint id;
		string content;
		bool completed;
	}
	event TaskCreated(uint taskCount, string content, bool completed);
	mapping(uint=>Task) public tasks;
	constructor() public{
		createTask("This is the first task created by the constructor");
	}
	function createTask(string memory _content) public{
		taskCount++;
		tasks[taskCount] = Task(taskCount,_content,false);
		emit TaskCreated(taskCount,_content,false);
	}
	
}