import "./styles.css";
import * as data from "./data.js";

//tests
localStorage.clear();
data.createProject("p1");
data.createTask({title: "t1", forProject: "p1"});
data.createTask({title: "t2", forProject: "p1"});
data.removeTask("p1", "t1");
console.log(data.projects);