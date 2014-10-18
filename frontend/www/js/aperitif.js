
function on_load() {
    apero_list = document.querySelector("#apero-list");
    apero_wizard = document.querySelector("#apero-wizard");
    user_setup = document.querySelector("#user-setup");

    refresh_apero_list();

    // remove all panels from the dom...
    var container = document.querySelector("#edit-panel");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // ...and add back the one we want
    go_to_panel(user_setup);

    //if (navigator.mozApps) {
    //    var installRequest = navigator.mozApps.install("manifest.webapp");
    //}

    apero_list.classList.remove("hidden");
    apero_wizard.classList.remove("hidden");
    user_setup.classList.remove("hidden");
}

function is_valid_name(name) {
    return !name.match(/^[a-zA-Z0-9_]*$/);
}

var valid_name;
function typing_user_name() {
    var name = document.querySelector("#user-name-input").value;
    console.log(name);
    var button = document.querySelector("#create-user-button");
    if (is_valid_name(name)) {
        if (!valid_name) {
            button.classList.remove("green-button");
            button.classList.add("grey-button");
        }
        valid_name = true;
    } else {
        if (valid_name) {
            button.classList.remove("grey-button");
            button.classList.add("green-button");
        }
        valid_name = false;
    }
}

function create_user_click() {
    var name = "" + document.getElementById("user-name-input").value;
    if (name.length > 0) {
        set_user_name(name);
        document.querySelector("#apero-button").classList.remove("hidden");
        document.querySelector("#edit-panel").classList.add("color-dead");
        go_to_panel(apero_list);
    }
}

function set_user_name(name) {
    document.querySelector("#top").innerHTML = name;
}

function apero_click() {
    console.log("Apéro!!");
    if (current_edit_panel == apero_list) {
        if (!selected_item) {
            go_to_panel(apero_wizard);
        } else {

        }
    }
}

function wizard_cancel() {
    go_to_panel(apero_list);
}

function apero_item_click() {
    if (selected_item && selected_item != this) {
        unselect_apero_item(selected_item);
    }
    if (this.classList.contains("selected")) {
        unselect_apero_item(this);
        document.querySelector("#apero-button").innerHTML = "Apéro!";
        selected_item = null;
    } else {
        select_apero_item(this);
        document.querySelector("#apero-button").innerHTML = "Join!";
        selected_item = this;
    }
}

function select_apero_item(apero) {
    var date = new Date(apero.details.created);
    apero.innerHTML = apero.details.username + " - " + apero.details.location +
                    "<br>" + date.getHours() + "h" + date.getMinutes() +
                    "<br>" + apero.details.msg;
    if (!apero.classList.contains("selected")) {
        apero.classList.add("selected");
    }
}

function unselect_apero_item(apero) {
    apero.innerHTML = apero.details.username + " - " + apero.details.location;
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

// in the apero_list, currently selected apero
var selected_item =  null;
// the different panels
var apero_list = null;
var apero_wizard = null;
var start_page = null;
// one of the above (currently active)
var current_edit_panel = null;

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

  function show_no_apero_label(show) {
    var noAperoDiv = document.createElement("div");
    noAperoDiv.setAttribute("class", "no-apero-item");
    noAperoDiv.innerHTML = "No apéritif found :(";

    if(show) {
      apero_list.appendChild(noAperoDiv);
    } else {
      try {apero_list.removeChild(noAperoDiv);}
      catch(e) {}
    }
  }

  listAperitif(function on_success(apero_array) {
    var i;

    if(apero_array.length === 0) {
      show_no_apero_label(true);
    } else {
      show_no_apero_label(false);
      for(i = 0; i < apero_array.length; ++i) {
        append_apero(apero_list, apero_array[i]);
      }
    }
  },
  function on_error(e) {
    console.log(e);
    show_no_apero_label(true);
  });
}
