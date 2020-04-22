var updateId = "";
var isUpdate = false;

function callAPIFromAjax() {

    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/myapp/crud/users/');
    request.send();
    request.onload = () => {
        console.log(request);
        console.log(request.response);
        if (request.status === 200) {
            users = JSON.parse(request.response);
            populateTable(users);
        }
    }
    request.onerror = function (e) {
        alert("Please check API service!");
    };

}

function addRecord() {

    const isValid = validateSaveOperation();

    if (isValid) {
        const userList = [];
        const user = {
            _id:"",
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            mobile: document.getElementById("mobile").value,
            address: document.getElementById("address").value
        }

        if (updateId) {
            user._id = updateId;
        }

        userList.push(user);

        var jsonBody = JSON.stringify(userList);

        if(isUpdate){

            var userJson = JSON.stringify(user);

            const request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:8080/myapp/crud/users/update', true);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send(userJson);
            request.onload = () => {
                console.log(request.response);
                if (request.status === 200 || request.status === 201) {
                    console.log("Entry Updated");
                    var table = document.getElementById("myTable");
                    while (table.rows.length > 2) {
                        table.deleteRow(1);
                    }
                    updateId = "";
                    isUpdate = "false";
                    clearAddInps();
                    callAPIFromAjax();
                }
            }

            request.onerror = function (e) {
                updateId = "";
                isUpdate = "false";
                alert("Failure in Update API!");
            };
        }else{
            const request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:8080/myapp/crud/users/insert', true);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send(jsonBody);
            request.onload = () => {
                console.log(request.response);
                if (request.status === 200 || request.status === 201) {
                    console.log("Entry added");
                    var table = document.getElementById("myTable");
                    while (table.rows.length > 2) {
                        table.deleteRow(1);
                    }
                    clearAddInps();
                    callAPIFromAjax();
                }
            }

            request.onerror = function (e) {
                alert("Failure in Add API!");
            };
        }

        

    }

}

function deleteEntry(td) {

    const parent = td.parentElement.parentElement;
    const selectedData = parent.cells[0].innerText;

    const request = new XMLHttpRequest();
    request.open('DELETE', 'http://localhost:8080/myapp/crud/users/delete/' + selectedData, true);
    request.send();
    request.onload = () => {
        console.log(request.response);
        if (request.status === 200) {
            document.getElementById("myTable").deleteRow(parent.rowIndex);
        }
    }

    request.onerror = function (e) {
        alert("Failure in delete API!");
    };

}

function validateSaveOperation() {
    let validationSuccess = true;

    if (document.getElementById("name").value === "") {
        document.getElementById("name").style.border = "thin solid red";
        validationSuccess = false;
    } else {
        document.getElementById("name").style.border = "thin solid grey";
    }

    const emailInp = document.getElementById("email").value;
    if (emailInp === "" || !validateEmail(emailInp)) {
        document.getElementById("email").style.border = "thin solid red";
        validationSuccess = false;
    } else {
        document.getElementById("email").style.border = "thin solid grey";
    }

    const mobInp = document.getElementById("mobile").value;
    if (mobInp === "" || isNaN(mobInp) || mobInp.length != 10) {
        document.getElementById("mobile").style.border = "thin solid red";
        validationSuccess = false;
    } else {
        document.getElementById("mobile").style.border = "thin solid grey";
    }

    if (document.getElementById("address").value === "") {
        document.getElementById("address").style.border = "thin solid red";
        validationSuccess = false;
    } else {
        document.getElementById("address").style.border = "thin solid grey";
    }

    return validationSuccess;
}

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

function clearAddInps() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
}

function updateEntry(td) {

    showAddDetails();

    const parent = td.parentElement.parentElement;
    updateId = parent.cells[0].innerText
    isUpdate = true;

    document.getElementById("name").value = parent.cells[1].innerText;
    document.getElementById("email").value = parent.cells[2].innerText;
    document.getElementById("mobile").value = parent.cells[3].innerText;
    document.getElementById("address").value = parent.cells[4].innerText;
}