let url= "https://priyanshu.co/api/todo";
function create()
{
    let message = $('#msg').val().trim();
    if(message.length<3)
    {
        $("#errMsg").text("Please enter correct work");
    }
    else{
    $.ajax({
        url: url + "/list-add",
        method: "POST",

        data: {
            message:message
        },
        headers: {
            'x-access-token': localStorage.getItem("token")
        },
        crossDomain: true,
        success: function (res) {
            console.log(res.status);
            if (res.status !== 200) {
                $("#errMsg").css({
                    "color": "red"
                });
                $("#errMsg").text(res.message);
            } else if (res.status === 200) {
                $("#errMsg").css({
                    "color": "green"
                });
                $("#errMsg").text(res.message);
                window.location = "dashboard.html";

            }
        },
        error: function (err) {
            // $("#btnSubmit").attr("disabled", false);
            $("#errMsg").text(err);
        }
    });
}
}