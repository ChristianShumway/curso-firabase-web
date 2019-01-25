$(() => {    

    //$("#authFB").click(() => );
    const objAuth = new Autenticacion()

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        // TODO : LLamar crear cuenta con email
        const auth = new Autenticacion()
        auth.crearCuentaEmailPass(email, password, nombres)
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        // TODO : LLamar auth cuenta con email
        const auth = new Autenticacion()
        auth.autEmailPass(email, password)
    });

    $('#btnRestablecerPassword').click(() => {
        const email = $('#emailPasswordRestablecer').val();
        //alert(email);
        const auth = new Autenticacion()
        auth.restPassword(email)
    })

    $("#authGoogle").click(() => objAuth.authCuentaGoogle() )

    //$("#authTwitter").click(() => //AUTH con Twitter);

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
        $('#modalPassword').modal('close');
    });

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
        $('#modalPassword').modal('close');
    });

    $('#restaurarPasswordSesion').click(() => {
        $('#modalPassword').modal('open');
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('close');
    })

});