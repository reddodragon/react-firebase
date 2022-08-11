export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
          return 'usuario ya registrado'
        case "auth/invalid-email":
          return "Formado email no válido"
        case "auth/user-not-found":
            return "Usuario No registrado"
        case "auth/wrong-password":
            return "Contraseña incorrecta"
            
        default:
          return 'Ocurrio un error en el servidor'
      }
}