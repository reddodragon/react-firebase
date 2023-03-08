export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
          return {
            code: "email",
            message:'usuario ya registrado',
          }
        case "auth/invalid-email":
          return {
            code: "email",
            message:"Formado email no válido",
          }
        case "auth/user-not-found":
            return {
              code: "email",
              message:"Usuario No registrado",
            }
        case "auth/wrong-password":
            return {
              code: "password",
              message:"Contraseña incorrecta",
            }
            
        default:
          return 'Ocurrio un error en el servidor'
      }
}