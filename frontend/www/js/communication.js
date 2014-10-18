/**

Example #1 - list aperitifs

listAperitif(function(data) {
  console.log(data);
}, function(e) {
  console.log(e);
});



Example #2 - create a aperitif

createAperitif(
  'papa delta',
  'caves pop',
  function(data) {
    console.log(data);
  },
  function(e) {
    console.log(e);
  }
);

Example #3 - update a aperitif

updateAperitif(
  '8vf79ww49z',
  'dgii89ziy7',
  'dtc',
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

function createAperitif(username, location, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/aperitif.json";

  var formData = new FormData();
  formData.append("username", username);
  formData.append("location", location);

  XHR(url, "POST", formData, function(data) {
    onsuccess(JSON.parse(data));
  },
  function(e) {
    onfailure(e);
  });
}

function updateAperitif(publicId, privateId, location, onsuccess, onfailure) {
  var req = new XMLHttpRequest();
  var url = "http://aperitif.feston.me/v1/aperitif/" + publicId + ".json";

  var formData = new FormData();
  formData.append("privateId", privateId);
  formData.append("location", location);

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