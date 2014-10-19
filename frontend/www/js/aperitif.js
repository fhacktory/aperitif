// localstorage
var storage = window.localStorage;

// in the apero_list, currently selected apero
var selected_item =  null;
// the different panels
var apero_list = null;
var apero_wizard = null;
var start_page = null;
// one of the above (currently active)
var current_edit_panel = null;

var apero_button;

// needed to
var user = {
    id: null,
    name: "",
};

current_apero_id = null;

// used during user setup
var valid_input = true;

function on_load() {
    apero_list = document.querySelector("#apero-list");
    apero_wizard = document.querySelector("#apero-wizard");
    user_setup = document.querySelector("#user-setup");

    apero_button = document.querySelector("#apero-button");

    apero_list.on_show = update_apero_button_state;
    apero_wizard.on_show = update_apero_button_state;

    refresh_apero_list();

    typing_user_name();

    // remove all panels from the dom...
    var container = document.querySelector("#edit-panel");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // ...and add back the one we want
    // depends if we already setup the app
    if (storage.getItem('user-id') === null) {
        go_to_panel(user_setup);
    } else {
        user.id = storage.getItem('user-id');
        user.name = storage.getItem('user-name');
        set_user_name(user.name);
        document.querySelector("#apero-button").classList.remove("hidden");
        document.querySelector("#edit-panel").classList.add("color-dead");
        getAperitifForUser(user.id, function(success) {
          console.log(success);
          go_to_panel(apero_list);
          refresh_apero_list();
        },
        function(failure) {
          console.log(failure);
          go_to_panel(apero_list);
          refresh_apero_list();
        });
    }


    if (navigator.userAgent.match(/Android/)) {
      document.addEventListener("deviceready", onDeviceReady, false);
    } else {
      document.addEventListener("visibilitychange", function() {
        if(document.hidden) {
          onPause();
        } else {
          onResume();
        }
      });
      onResume();
    }

    apero_list.classList.remove("hidden");
    apero_wizard.classList.remove("hidden");
    user_setup.classList.remove("hidden");

}

function fxos_install() {
    console.log("install!!");
    if (navigator.mozApps) {
        var installRequest = navigator.mozApps.install("manifest.webapp");
    }
}

function is_valid_name(name) {
    return name.length > 0 && !!name.match(/^[a-zA-Z0-9_]*$/);
}

function typing_user_name() {
    var name = document.querySelector("#user-name-input").value;
    var button = document.querySelector("#create-user-button");
    if (is_valid_name(name)) {
        if (!valid_input) {
            button.classList.remove("grey-button");
            button.classList.add("green-button");
        }
        valid_input = true;
    } else {
        console.log("invalid name " + name);
        if (valid_input) {
            button.classList.remove("green-button");
            button.classList.add("grey-button");
        }
        valid_input = false;
    }
}

function create_user_click() {
    var name = "" + document.querySelector("#user-name-input").value;
    if (is_valid_name(name)) {
        createUser(name,
            function(answer) {
                console.log("created user " + answer.id);
                user.id = answer.id;
                user.name = name;
                storage.setItem('user-id', answer.id);
                storage.setItem('user-name', name);
                set_user_name(name);
                apero_button.classList.remove("hidden");
                document.querySelector("#edit-panel").classList.add("color-dead");
                go_to_panel(apero_list);
            },
            function(error) {
                console.log("failed to create user " + name + " " + error);
            }
        );
    } else {
        console.log("invalid name '"+name+"'");
    }
}

function set_user_name(name) {
    document.querySelector("#top").innerHTML = name;
}

function apero_click() {
    if (current_edit_panel == apero_wizard) {
        return;
    }
    console.log("Apéro!!");
    if (current_apero_id) {
        console.log("leaving the apero "+current_apero_id);
        manageAttendee(current_apero_id, user.id, user.name, 'remove',
            function(success) {refresh_apero_list();},
            function(fail) {console.log(fail);});
        current_apero_id = null;
        unselect_apero_item();
        selected_item = null;
        update_apero_button_state();
    } else if (current_edit_panel == apero_list) {
        if (!selected_item) {
            go_to_panel(apero_wizard);
        } else {
            manageAttendee(selected_item.details.id, user.id, user.name, 'add',
                function(answer) {
                    console.log("answer: ");
                    console.log(answer);
                    if (answer.newUserId != null) {
                        user.id = answer.newUserId;
                        storage.setItem('user-id', answer.newUserId);
                    }
                    current_apero_id = selected_item.details.id;
                    update_apero_button_state();
                    refresh_apero_list();
                },
                function(fail) {console.log(fail);}
            );
        }
    }
}

function update_apero_button_state() {
    if (current_apero_id) {
        apero_button.classList.add("red-button");
        apero_button.classList.remove("blue-button");
        apero_button.classList.remove("green-button");
        apero_button.innerHTML = "Leave apéro";
    } else if (current_edit_panel == apero_list) {
        apero_button.classList.remove("red-button");
        apero_button.classList.remove("blue-button");
        apero_button.classList.add("green-button");
        if (selected_item) {
            apero_button.innerHTML = "Join!";
        } else {
            apero_button.innerHTML = "Apéro!";
        }
    } else {
        apero_button.classList.remove("red-button");
        apero_button.classList.remove("green-button");
        apero_button.classList.add("blue-button");
        apero_button.innerHTML = "Apéro!";
    }
}

function wizard_cancel() {
    go_to_panel(apero_list);
}

function wizard_ok() {
    createAperitif(
        user.id,
        document.querySelector("#apero-name-input").value,
        document.querySelector("#apero-message-input").value,
        function(answer) {
          console.log(answer);
          current_apero_id = answer.id || null;
          go_to_panel(apero_list);
          refresh_apero_list();
        },
      function(error) {
        console.log(error);
      }
    );
}

function apero_item_click() {
    if (selected_item && selected_item != this) {
        unselect_apero_item();
    }
    if (this.classList.contains("selected")) {
        unselect_apero_item();
        if (!current_apero_id) {
            document.querySelector("#apero-button").innerHTML = "Apéro!";
        }
        selected_item = null;
    } else {
        select_apero_item(this);
        if (!current_apero_id) {
            document.querySelector("#apero-button").innerHTML = "Join!";
        }
        selected_item = this;
    }
}

function select_apero_item(apero) {
    //var date = new Date(apero.details.created);
    apero.innerHTML = " <b>"+ apero.details.location + "</b> - ";
    for (var i = 0; i < apero.details.attendees.length; ++i) {
        // XXX - should be apero.details.attendees[i].name but need to modify the server
        apero.innerHTML += apero.details.attendees[i] + "  ";
    }
    apero.innerHTML += "<br>" + apero.details.message;
    if (!apero.classList.contains("selected") && apero.details.id !== current_apero_id) {
        apero.classList.add("selected");
    }

    if (apero.details.id === current_apero_id) {
        apero.classList.add("current-apero-item");
    }

    selected_item = apero;
}

function unselect_apero_item() {
    if (!selected_item) {
        return;
    }
    if (selected_item.classList.contains("selected")) {
        selected_item.classList.remove("selected");
    }

    if (selected_item.details.id === current_apero_id) {
        selected_item.classList.add("current-apero-item");
    } else {
        selected_item.innerHTML = apero_header(selected_item.details);
    }

    selected_item = null;
}

function append_apero(list_view, apero, andSelect) {
    var div = document.createElement("div");
    div.setAttribute("class", "apero-item");
    div.addEventListener("click", apero_item_click);
    div.innerHTML = apero_header(apero);
    div.details = apero;
    list_view.appendChild(div);

    if (andSelect) { select_apero_item(div); }
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

    if (new_panel && new_panel.on_show) {
        new_panel.on_show();
    }
}

var noAperoDiv = document.createElement("div");
noAperoDiv.setAttribute("class", "no-apero-item");
noAperoDiv.innerHTML = "No apéritif found :(";
var noAperoDivVisible = false;

function show_no_apero_label(show) {
  if(show == noAperoDivVisible) return;

  if(show) {
    apero_list.appendChild(noAperoDiv);
  } else {
    try {apero_list.removeChild(noAperoDiv);}
    catch(e) {}
  }
}

function refresh_apero_list() {
  listAperitif(function on_success(apero_array) {
    remove_all_aperos();
    var i;

    var id_select;
    if(selected_item) id_select = selected_item.details.id;

    if(apero_array.length === 0) {
      show_no_apero_label(true);
    } else {
      show_no_apero_label(false);
      for(i = 0; i < apero_array.length; ++i) {
        var is_current = apero_array[i].id === current_apero_id;
        append_apero(apero_list, apero_array[i], apero_array[i].id === id_select);
        if (is_current) {
            apero_list.lastChild.classList.add("current-apero-item");
        }
      }
    }
  },
  function on_error(e) {
    console.log(e);
    show_no_apero_label(true);
  });
}


function onDeviceReady() {
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);

  onResume();
}

function onResume() {
  if(refresh_interval === 0) {
    refresh_interval = setInterval(refresh_aperos, 3000);
  }
}

function onPause() {
  clearInterval(refresh_interval);
  refresh_interval = 0;
}

var refresh_interval = 0;

function refresh_aperos() {
  if(current_edit_panel == apero_list) { refresh_apero_list(); }
}

function first_attendee_name(apero) {
  // XXX - should be apero.details.attendees[i].name but need to modify the server
  if(apero.attendees.length === 0) return "No attendee";
  else return apero.attendees[0];
}

function apero_header(apero) {
  return "<b>"+apero.location + "</b> - " + first_attendee_name(apero);
}
