const PROJECTS_KEY = "projects";

function save(projects){
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

//returns raw objects that need to be parsed into classes
function load(){
    return JSON.parse(localStorage.getItem(PROJECTS_KEY));
}

export {
    save, load
};