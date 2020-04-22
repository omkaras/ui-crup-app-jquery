function init() {

  const classes = document.getElementsByClassName("addNewInputs");

  for (i = 0; i < classes.length; i++) {
    classes[i].style.display = "none";
  }

  document.getElementById("saveBtn").style.display = "none";

  callAPIFromAjax();
}

function populateTable(users) {

  var table = document.getElementById("myTable");

  //var users = getUsers();

  document.getElementById("myTable").deleteRow(1);

  for (i = 1; i <= users.users.length; i++) {
    var row = table.insertRow(i);

    var cell0 = row.insertCell(0);
    cell0.innerHTML = users.users[i - 1]._id;

    var cell0 = row.insertCell(1);
    cell0.innerHTML = users.users[i - 1].name;

    var cell1 = row.insertCell(2);
    cell1.innerHTML = users.users[i - 1].email;

    var cell2 = row.insertCell(3);
    cell2.innerHTML = users.users[i - 1].mobile;

    var cell3 = row.insertCell(4);
    cell3.innerHTML = users.users[i - 1].address;

    var cell4 = row.insertCell(5);
    cell4.innerHTML = "<button id='btnEdit'onclick=updateEntry(this)>Edit</button>";

    var cell5 = row.insertCell(6);
    cell5.innerHTML = "<button id='btnRemove' onclick=deleteEntry(this)>Delete</button>";

  }

}

function showAddDetails() {

  const classes = document.getElementsByClassName("addNewInputs");

  for (i = 0; i < classes.length; i++) {
    classes[i].style.display = "initial";
  }

  document.getElementById("saveBtn").style.display = "initial";
}

function notReady() {
  window.alert("Coming soon...!");
}