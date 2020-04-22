$(document).ready(function () {

    console.log("Start of jQuery");

    $('#userInfo').hide();
    $('.addNewInputs').hide();
    $("body").find("*").attr("disabled", "disabled");
    $("body").find("a").click(function (e) { e.preventDefault(); });

    // Call to fetch all users
    $.ajax({
        url: "http://localhost:8080/myapp/crud/users",
        type: "GET",
        beforeSend: () => {
            $("#loader").show();
        },
        complete: () => {
            $("#loader").hide();
            $("body").find("*").removeAttr("disabled");
            $("body").find("a").unbind("click");
        },
        success: (data) => {
            $('#userInfo').show();
            console.log(data);
            populateTableWithJQuery(data.users);
        },
        error: () => {

        }
    });


});

$('#btnRemove').click(() => {

        console.log("inside delete event");
    
        
    
    });

function populateTableWithJQuery(data) {


    var trHTML = '';
    $.each(data, function (i, item) {

        trHTML += '<tr><td>' + (item._id === undefined ? "" : item._id) + '</td><td>' +
            (item.name === undefined ? "" : item.name) + '</td><td>' +
            (item.email === undefined ? "" : item.email) + '</td><td>' +
            (item.mobile === undefined ? "" : item.mobile) + '</td><td>' +
            (item.address === undefined ? "" : item.address) + '</td><td>' +
            "<button id='btnEdit'>Edit</button>" + '</td><td>' +
            "<button id='btnRemove'>Delete</button>" + '</td></tr>';
        console.log(trHTML);
    });
    $('#myTable').append(trHTML);

}