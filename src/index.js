import "./styles.css";
import * as data from "./data.js";
import * as view from "./projectView.js"

//tests
data.initFromStorage();
view.renderProject(data.readProject("p2"));
// localStorage.clear();
// data.updateTask("p1", "t2", {title: "t3", priority: "low", forProject: "p1"});
// data.updateTask("p1", "t3", {title: "t4", forProject: "p2"});
// data.createTask({title: "t2", forProject: "p1", dueDate: new Date()});
// data.removeTask("p1", "t1");
console.log(data.projects);