let url = "http://18.222.131.148/api/auth";

function verify() {
    var thisAlert = $('#username').parent();
    $(thisAlert).removeClass('alert-validate');
    var thisAlert = $('#password').parent();
    $(thisAlert).removeClass('alert-validate1');
    let username = $('#username').val().trim();
    let password = $('#password').val().trim();
    if (username === "") {
        var thisAlert = $('#username').parent();
        $(thisAlert).addClass('alert-validate');
        return;
    }
    console.log(username);
    console.log(password);




    $("#btnSubmit").attr("disabled", true);
    $('.rotator').addClass('spinner');
    $.ajax({
        url: url + "/login",
        method: "POST",

        data: {
            username: username,
            password: password



        },

        crossDomain: true,
        success: function (res) {
            console.log(res.status);
            $('.rotator').removeClass('spinner');
            if (res.status !== 200) {
                $("#btnSubmit").attr("disabled", false);
                $("#errMsg").css({
                    "color": "red"
                });
                $("#errMsg").text(res.message);
            } else if (res.status === 200) {
                $("#errMsg").css({
                    "color": "green"
                });
                $("#errMsg").text(res.message);
                $("#btnSubmit").attr("disabled", false);
                localStorage.setItem("token", res.token);
                window.location = "dashboard.html";

            }
        },
        error: function (err) {
            $("#btnSubmit").attr("disabled", false);
            $("#errMsg").text(err);
        }
    });

}