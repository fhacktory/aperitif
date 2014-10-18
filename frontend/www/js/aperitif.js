
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
}

function apero_click() {
    console.log("Apéro!!");
}

var selected_item =  null;

function apero_item_click() {
    if (selected_item && selected_item != this) {
        unselect_apero_item(selected_item);
    }
    if (this.classList.contains("selected")) {
        unselect_apero_item(this);
        selected_item = null;
    } else {
        select_apero_item(this);
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

