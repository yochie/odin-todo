//will overwrite with sent value if it already exists
function create(id, obj) {
    localStorage.setItem(id, JSON.stringify(obj));
}

function read(id) {
    return JSON.parse(localStorage.getItem(id));
}

function update(id, obj) {
    let stored = JSON.parse(localStorage.getItem(id));
    if (typeof stored === "object") {
        for (let key in obj) {
            stored[key] = obj[key];
        }
    } else {
        //this should be some literal value (functions cant be stored here)
        //should be safe to just overwrite
        stored = obj;
    }
    localStorage.setItem(id, JSON.stringify(stored));
}

function del(id) {
    localStorage.removeItem(id);
}

export {
    create,
    read,
    update,
    del,
};