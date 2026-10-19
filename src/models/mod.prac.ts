

export type librosT={
    id: number,
    titulo:string,
    autor: string,
    año: number,
    disponible: boolean

}

export type prestamosT={
    id:number,
    libroId: number,
    usuario: string,
    fechaPrestamo: string,
    fechaDevolucion: string | null

}
