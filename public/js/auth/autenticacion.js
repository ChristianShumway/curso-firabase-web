class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result)
        if(result.user.emailVerified){
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
          Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
          $('.modal').modal('close')
        } else{
          firebase.auth().signOut()
          Materialize.toast(`Debes Verificar tu cuenta primero`, 5000)
        }
      })
      .catch( error => {
        console.log(error)
      })    
   
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( result => {
        result.user.updateProfile({
          displayName: nombres
        })

        //configuramos para que al momento de crear cuenta en la página nos habilite un boton para regresar a nuestro sitio
        const configuracion = {
          url: 'http://localhost:3000/'
        }

        // configuramos el envio de email de verificación para validar cuenta
        result.user.sendEmailVerification(configuracion).catch( error => {
          console.log(error)
          Materialize.toast(error.message, 4000)
        })
        // cerramos sesión para que no la habilite hasta que se verifique el correo 
        firebase.auth().signOut()

        Materialize.toast(
          `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
          4000
        )
    
        $('.modal').modal('close')
      })
      .catch( error =>{
        console.log('error')
        console.log(error)
        Materialize.toast(error.message, 4000)
      })
    
  }

  authCuentaGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
    
    firebase.auth().signInWithPopup(provider)
      .then( result => {
        console.log(result)
        $('#avatar').attr('src', result.user.photoURL)
        $('.modal').modal('close')
        Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
      })
      .catch( error => {
        console.error(error)
        Materialize.toast(`Error en la autenticación de google ${error}`, 5000)
      })

  }

  authCuentaFacebook () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }

  restPassword(email) {
    var auth = firebase.auth();
    var emailAddress = email;

    //configuramos para que al momento de crear cuenta en la página nos habilite un boton para regresar a nuestro sitio
    const configuracion = {
      url: 'http://localhost:3000/'
    }

    auth.sendPasswordResetEmail(emailAddress, configuracion)
      .then( result => {
        // Email sent.
        console.log(result)
        Materialize.toast(`Se ha enviado el link para restablecer password al correo ${emailAddress}`, 5000)
      }).catch( error => {
        // An error happened.
        Materialize.toast(`Error en el envio para restablecer correo ${error}`, 5000)
});
  }
}
