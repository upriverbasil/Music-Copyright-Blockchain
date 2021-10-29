pragma solidity ^0.5.0;

contract TodoList{
	uint public taskCount = 0;
	struct Task{
		uint id;
		string content;
		bool completed;
	}
	event TaskCreated(uint taskCount, string content, bool completed);
	event completed(uint id);
	mapping(uint=>Task) public tasks;
	mapping(uint=>bool) public iscompleted;
	constructor() public{
		createTask("This is the first task created by the constructor");
	}
	function createTask(string memory _content) public{
		taskCount++;
		tasks[taskCount] = Task(taskCount,_content,false);
		iscompleted[taskCount] = true;
		emit TaskCreated(taskCount,_content,false);
	}
	function makeComplete(uint idx) public{
		
		Task memory _task = tasks[idx];
		_task.completed = true;
		tasks[idx] = _task;
		

	}
	
}