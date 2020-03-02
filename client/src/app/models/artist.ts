//Se representan los distintos modelos que se generan en el Back-End

//Se exporta la clase para que se pueda importar en otro fichero.
export class Artist{
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public image: string
  ){}
}
