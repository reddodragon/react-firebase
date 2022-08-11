export const formValidate = (getValues) => { 
    return{
        required: {
            value: true,
            message: "Campo obligatorio",
          },
          patternEmail:{
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de emal invalido"
          },
          minLength: {
            value: 6,
            message: "Mínimo 6 carácteres",
          },
          validateTrim: {
            trim: (v) => {
                if(!v.trim()) {
                    return "No seas payaso"
                }
                return true
            },
          },
          validateEquals(getValues) {
            return {
                equals: v => 
                    v === getValues('password') || //creo mi propia validacion y comparo el elemento actual "v" con el elemento anterior que lo selecciono con getValues()
                    "Las contraseñas deben ser iguales", //Si la condicion anterior no se cumple ejecuto este mensaje
            }
          }
          
    }
 }