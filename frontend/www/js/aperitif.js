
function on_load() {
    console.log("Apéro!");

    var fake_aperitifs = [
        { name: "cgg", place: "Penty" },
        { name: "papadelta", place: "Caves pop" },
        { name: "padenot", place: "Non." },
        { name: "bsb", place: "k-fêt" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
        { name: "dummy", place: "nowhere" },
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
    console.log("clicked item " + this.apero_id);

    if (selected_item && selected_item.dom != this) {
        selected_item.dom.classList.remove("selected")
    }
    if (this.classList.contains("selected")) {
        this.classList.remove("selected")
        selected_item = null;
    } else {
        this.classList.add("selected");
        selected_item = { dom: this };
    }
}

function append_apero(list_view, apero) {
    var div = document.createElement("div");
    div.setAttribute("class", "apero-item");
    div.addEventListener("click", apero_item_click);
    div.innerHTML = apero.name + " - " + apero.place;
    div.apero_id = apero.name;
    list_view.appendChild(div);
}

