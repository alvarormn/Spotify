//Se representan los distintos modelos que se generan en el Back-End

//Se exporta la clase para que se pueda importar en otro fichero.
export class Album{
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public year: number,
    public image: string,
    public artist: string
  ){}
}
