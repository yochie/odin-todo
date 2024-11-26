import "./styles.css";
import * as data from "./data.js";
import * as projectView from "./projectView.js"
import * as projectList from "./projectList.js"

//tests
data.initFromStorage();
projectList.renderProjectList(data.getProjectNameList());
projectView.renderProject(data.readProject("p2"));

// localStorage.clear();
// data.updateTask("p1", "t2", {title: "t3", priority: "low", forProject: "p1"});
// data.updateTask("p1", "t3", {title: "t4", forProject: "p2"});
// data.createTask({title: "t2", forProject: "p1", dueDate: new Date()});
// data.removeTask("p1", "t1");