//Se representan los distintos modelos que se generan en el Back-End

//Se exporta la clase para que se pueda importar en otro fichero.
export class Song{
  constructor(
    public _id: string,
    public number: number,
    public name: string,
    public duration: number,
    public file: string,
    public album: string
  ){}
}
