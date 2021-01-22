const hostVar = "localhost:8000";
const endpointHello = "/";
const endpointPosts = "/posts";

$(document).ready(function(){

    $("#try_connect_btn").click(function(){
        $.ajax({
            type: "GET",
            url: hostVar + endpointHello,
            success: function(data) {
                $("#connection_status").text("connection successful");
            },
            failure: function(data) {
                $("#connection_status").text("connection failed");
            }
          }, "json");
    });

    $("#load_posts_btn").click(function(){
        $.ajax({
            type: "GET",
            url: hostVar + endpointPosts,
            success: function(data) {
                data.forEach(function(dt) {
                    $("#table_blogposts_body").prepend(
                        "<tr>" +
                        "<td>" + dt.author + "</td>" +
                        "<td>" + dt.date + "</td>" +
                        "<td>" + dt.text + "</td>" +
                        "</tr>"
                    );
                });
            },
            failure: function(data) {
                console.log("Request failed.");
            }
          }, "json");
    });


});

