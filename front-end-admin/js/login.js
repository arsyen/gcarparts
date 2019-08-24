function login() {
    let username = $("#txtUsername").val();
    let password = $("#txtPassword").val();

    $.post("/api/admin/auth/login",
    
        { username,password },
        function (data) {
            $.cookie('xt', data.token, { expires: 200, path: '/' });
            console.log(data.token);
            location = './admin';
        }, "json");
}
