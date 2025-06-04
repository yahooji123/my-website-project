// Step 1: HTML से Elements को पकड़ना
const taskInput = document.getElementById("taskInput"); // जहां user task लिखेगा
const addTaskBtn = document.getElementById("addTaskBtn"); // Add Task बटन
const taskList = document.getElementById("taskList"); // UL जहाँ सभी tasks आएंगे

// Step 2: Add Task बटन पर click होने पर function चलेगा
addTaskBtn.addEventListener("click", function () {

  // Step 3: input field से जो text आया उसे लो और trim करो (extra space हटाओ)
  const taskText = taskInput.value.trim();

  // Step 4: अगर user ने कुछ भी नहीं लिखा है तो alert दिखाओ और return कर दो
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Step 5: नया <li> बनाओ और उसमें task का text डालो
  const li = document.createElement("li");
  li.innerText = taskText;

  // Step 6: delete button बनाओ ताकि task delete किया जा सके
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌"; // delete का icon
  delBtn.className = "delete-btn"; // CSS class

  // Step 7: delete button पर click करने पर वह task list से हट जाए
  delBtn.addEventListener("click", function () {
    taskList.removeChild(li); // उस task (li) को list से हटा दो
  });

  // Step 8: li के अंदर delete button जोड़ो
  li.appendChild(delBtn);

  // Step 9: पूरी li को task list (ul) में जोड़ दो
  taskList.appendChild(li);

  // Step 10: Input field को खाली कर दो ताकि नया task लिखा जा सके
  taskInput.value = "";
});
