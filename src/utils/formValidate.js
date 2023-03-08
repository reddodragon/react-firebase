export const formValidate = () => { 
    return{
        required: {
            value: true,
            message: "Campo obligatorio",
          },
          patternEmail:{
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de emal invalido"
          },
          patternURL:{
            value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: "Formato de URL incorrecto"
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
          validateEquals(value) {
            return {
                equals: v => 
                    v === value || //creo mi propia validacion y comparo el elemento actual "v" con el elemento anterior que lo selecciono con getValues()
                    "Las contraseñas deben ser iguales", //Si la condicion anterior no se cumple ejecuto este mensaje
            }
          }
          
    }
 }