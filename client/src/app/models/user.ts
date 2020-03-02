//Se representan los distintos modelos que se generan en el Back-End

//Se exporta la clase para que se pueda importar en otro fichero.
export class User{
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public role: string,
    public image: string
  ){}
}
