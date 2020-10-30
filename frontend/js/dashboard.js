let url= "http://localhost:5000/api/todo";
let url1="http://localhost:5000/api/auth";
let data=[];
$.ajax({
    url: url + "/todo-stats-left",
    method: "GET",
    headers: {
        'x-access-token': localStorage.getItem("token")
    },
    crossDomain: true,
    success: function (res) {
        if (res.status === 200) {
            console.log(res);
           data=res.c1;
           for(let i=0;i<data.length;i++)
{
    console.log(i);
    $('#todo-wrapper').append(`<div class="task">
    <div class="task-link">
        <a href="">${data[i].Message}</a>
    </div>
    <a href="#" class="btn btn-lg btn-delete btn-general" onclick=del("${data[i]._id}") role="button">Delete</a>
    <a href="#" class="btn btn-lg btn-edit btn-general" onclick=com("${data[i]._id}") role="button">Complete</a>
</div>`);
}
        }
        console.log(data);
    },
    error: function (err) {
    }
});
function logout()
{

    $.ajax({
        url: url1 + "/logout",
        method: "POST",
        crossDomain: true,
        success: function (res) {
            if (res.status === 200) {
                localStorage.setItem("token", res.token);
                window.location = "signin.html";
               
        }
    },
        
    
        error: function (err) {
            console.log(err);
        }
    });



}
function del(id)
{
    $.ajax({
        url: url + "/list-deleted",
        method: "POST",
        data: {
            id:id
        },
        crossDomain: true,
        success: function (res) {
            if (res.status === 200) {
                window.location = "dashboard.html";
               
        }
    },
        
    
        error: function (err) {
            console.log(err);
        }
    });
}

function com(id)
{
    $.ajax({
        url: url + "/list-completed",
        method: "POST",
        data: {
            id:id
        },
        crossDomain: true,
        success: function (res) {
            if (res.status === 200) {
                window.location = "dashboard.html";
               
        }
    },
        
    
        error: function (err) {
            console.log(err);
        }
    });
}
