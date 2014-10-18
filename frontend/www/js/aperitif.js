
function on_load() {
    set_user_name("Nical");

    // init the apero list div and style
    apero_list = document.createElement("div");
    apero_list.id = "apero-list";

    refresh_apero_list();

    go_to_panel(apero_list);
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
        document.querySelector("#apero-label").innerHTML = "Apéro!";
        selected_item = null;
    } else {
        select_apero_item(this);
        document.querySelector("#apero-label").innerHTML = "Join!";
        selected_item = this;
    }
}

function select_apero_item(apero) {
    apero.innerHTML = apero.details.name + " - " + apero.details.place +
                    "<br>" + apero.details.time +
                    "<br>" + apero.details.msg;
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
    div.innerHTML = apero.username + " - " + apero.location;
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
        list.removeChild(list.firstChild);
    }
}

var selected_item =  null;
var current_edit_panel = null;
var apero_list = null;
var apero_wizard = null;
var start_page = null;

function go_to_panel(new_panel) {
    if (current_edit_panel == new_panel) {
        return;
    }

    if (current_edit_panel && current_edit_panel.on_hide) {
        current_edit_panel.on_hide();
    }

    var container = document.querySelector("#edit-panel");
    if (current_edit_panel) {
        container.removeChild(current_edit_panel);
    }
    container.appendChild(new_panel);
    current_edit_panel = new_panel;
}

function refresh_apero_list() {
  remove_all_aperos();

  function insert_no_apero_label() {
    // TODO
  }

  listSemaphore(function on_success(apero_array) {
    var i;
        append_apero(apero_list, {username:"papa delta", location:"caves pop"});

    if(apero_array.length === 0) {
      insert_no_apero_label();
    } else {
      for(i = 0; i < apero_array.length; ++i) {
        //append_apero(apero_list, apero_array[i]);
        append_apero(apero_list, {username:"papa delta", location:"caves pop"});
      }
    }
  },
  function on_error(e) {
    console.log(e);
    insert_no_apero_label();
  });
}
