import "./styles.css";
import * as data from "./data.js";


//tests
localStorage.clear();
data.initFromStorage();
data.createProject("p1");
console.log(data.projects);