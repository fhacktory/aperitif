/**

Example #1 - list aperitifs

listAperitif(function(data) {
  console.log(data);
}, function(e) {
  console.log(e);
});

[
  {
    "id": "810a3392-5725-11e4-ad82-3c970eb345ba",
    "created": "2014-10-19T02:18:51+0200",
    "location": "Le Milord",
    "message": "Rendez-vous à 20h.",
    "attendees": [
      "Papa Delta"
    ]
  },
  {
    "id": "896151f7-5725-11e4-ad82-3c970eb345ba",
    "created": "2014-10-19T02:19:05+0200",
    "location": "Nimporte Quoi",
    "message": "Rendez-vous à 20h.",
    "attendees": []
  },
  {
    "id": "946140ab-5720-11e4-ad82-3c970eb345ba",
    "created": "2014-10-19T01:43:36+0200",
    "location": "Caves Pop",
    "message": "Rendez-vous à 20h.",
    "attendees": [
      "Papa Delta",
      "Raphael Lustin"
    ]
  }
]


Example #2 - create a aperitif

createAperitif(
  '8cdc972b-571a-11e4-ad82-3c970eb345ba',
  'Caves Pop',
  'Rendez-vous à 20h.',
  function(data) {
    console.log(data);
  },
  function(e) {
    console.log(e);
  }
);

Example #3 - create an user

createUser(
  'Papa Delta',
  function(data) {
    console.log(data);
  },
  function(e) {
    console.log(e);
  }
);

Example #4 - add an attendee to an aperitif

manageAttendee(
  aperitifId,
  userId,
  action, // 'add' or 'remove'
  onsuccess, // callback function on success
  onfailure // callback function on failure
);

manageAttendee(
  '946140ab-5720-11e4-ad82-3c970eb345ba',
  'f0417b2d-5720-11e4-ad82-3c970eb345ba',
  'add',
  function(data) {
    console.log(data);
  },
  function(e) {
    console.log(e);
  }
);

Example #5 - get aperitif for an user

getAperitifForUser(
  'e84bd8e4-5764-11e4-ba04-b6d714dd19e4',
  function(data) {
    console.log(data);
  },
  function(e) {
    console.log(e);
  }
);

**/

function listAperitif(onsuccess, onfailure) {
  var url = "http://aperitif.feston.me/v1/aperitif.json";
  XHR(url, "GET", null, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function createAperitif(userId, location, message, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/aperitif.json";

  var formData = new FormData();
  formData.append("userId", userId);
  formData.append("location", location);
  formData.append("message", message);

  XHR(url, "POST", formData, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function createUser(name, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/user.json";

  var formData = new FormData();
  formData.append("name", name);

  XHR(url, "POST", formData, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function getAperitifForUser(userId, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/user/" + userId + "/aperitif.json";

  XHR(url, "GET", null, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function manageAttendee(aperitifId, userId, userName, action, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/aperitif/" + aperitifId + ".json";

  var formData = new FormData();
  formData.append("userId", userId);
  formData.append("name", userName);
  formData.append("action", action);

  XHR(url, "POST", formData, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function XHR(url, method, data, onsuccess, onfailure, onprogress, onload, onabort) {
  var request = new XMLHttpRequest();
  // Ten seconds is ought to be enough for anybody.
  var xhrtimeout = setTimeout(onfailure, 10000);
  request.addEventListener("progress", onprogress, false);
  request.addEventListener("load", onprogress, false);
  request.addEventListener("error", onfailure, false);
  request.addEventListener("abort", onabort, false);
  request.addEventListener("readystatechange", function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        clearTimeout(xhrtimeout);
        onsuccess(request.responseText);
      } else {
        onfailure(e);
      }
    }
  });

  request.open(method, url, true);
  request.send(data);
}