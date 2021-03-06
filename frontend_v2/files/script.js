const http = "https://";
const port = "";
const hostVar = http + "my-blog.api.com" + port;
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
                $("#table_blogposts_body").empty();
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

    $("#reset_posts_btn").click(function(){
        $.ajax({
            type: "DELETE",
            url: hostVar + endpointPosts,
            success: function(data) {
                $("#load_posts_btn").click();
            },
            failure: function(data) {
                console.log("Request failed.");
            }
          }, "json");
    });

    $("#post_form").submit(function (event) {
        event.preventDefault();

        var entry = {
          author: $("input[name=author]").val(),
          date: $("input[name=date]").val(),
          text: $("textarea[name=text]").val()
        };

        $.ajax({
            url: hostVar + endpointPosts,
            contentType: 'application/json',
            data: JSON.stringify(entry),
            type: 'POST',
            success: function(data) {
              $("#load_posts_btn").click();
                // $("#table_blogposts_body").prepend(
                //     "<tr>" +
                //     "<td>" + $("input[name=author]").val() + "</td>" +
                //     "<td>" + data.date + "</td>" +
                //     "<td>" + data.text + "</td>" +
                //     "</tr>"
                // );
            }
        });
    });


});
