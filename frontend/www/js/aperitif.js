
function on_load() {
    var fake_aperitifs = [
        { name: "cgg",  place: "Penty",    time: "18:00", msg: "on y va en vélo!"},
        { name: "papadelta", place: "Caves pop", time: "18:00", msg: "I am thirsty!"},
        { name: "padenot", place: "Non.",  time: "18:00", msg: "Non."},
        { name: "bsb",   place: "k-fêt",   time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
        { name: "dummy", place: "nowhere", time: "18:00", msg: "I am thirsty!"},
    ];

    var list_view = document.querySelector("#apero-list");
    for (var item in fake_aperitifs) {
        append_apero(list_view, fake_aperitifs[item]);
    }
    set_user_name("Nical");
}

function set_user_name(name) {
    document.querySelector("#top").innerHTML = name;
}

function apero_click() {
    console.log("Apéro!!");
}


function apero_item_click() {
    if (selected_item && selected_item != this) {
        unselect_apero_item(selected_item);
    }
    if (this.classList.contains("selected")) {
        unselect_apero_item(this);
        document.querySelector("#apero-label").innerHTML = "Apéro!"
        selected_item = null;
    } else {
        select_apero_item(this);
        document.querySelector("#apero-label").innerHTML = "Join!"
        selected_item = this;
    }
}

function select_apero_item(apero) {
    apero.innerHTML = apero.details.name + " - " + apero.details.place +
                    "<br>" + apero.details.time +
                    "<br>" + apero.details.msg
    if (!apero.classList.contains("selected")) {
        apero.classList.add("selected");
    }
}

function unselect_apero_item(apero) {
    apero.innerHTML = apero.details.name + " - " + apero.details.place;
    if (apero.classList.contains("selected")) {
        apero.classList.remove("selected");
    }
}

function append_apero(list_view, apero) {
    var div = document.createElement("div");
    div.setAttribute("class", "apero-item");
    div.addEventListener("click", apero_item_click);
    div.innerHTML = apero.name + " - " + apero.place;
    div.details = apero;
    list_view.appendChild(div);
}

function remove_apero(apero) {
    var list = document.querySelector("#apero-list");
    if (!list) { return; }
    list.removeChild(apero);
}

function remove_all_aperos() {
    var list = document.querySelector("#apero-list");
    if (!list) { return; }
    while (list.firstChild) {
        list.removeChild(apero);
    }
}

var selected_item =  null;
var current_edit_panel = null;
var apero_list = null;
var apero_wizard = null;

function go_to_main_panel() {
    if (current_edit_panel && current_edit_panel == apero_list) {
        return;
    }

    if (current_edit_panel.on_hide) {
        current_edit_panel.on_hide();
    }

    current_edit_panel = apero_list;
    var container = document.querySelector("#edit-panel");
    container.removeChild(current_edit_panel);
    container.addChild(apero_list);
}

function go_to_apero_wizard() {
    // TODO;
}
