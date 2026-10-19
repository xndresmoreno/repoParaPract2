import type { Response,Request } from "express";
import { cambiarLibros, changePrestamos, libros, prestamos } from "../data/data.prac.js";
import type { librosT, prestamosT } from "../models/mod.prac.js";
export type {librosT} from "../models/mod.prac.js"
export type {prestamosT} from "../models/mod.prac.js"


export const getLibros = ( //get de "Lista todos los libros"
    req: Request, 
    res: Response ) => {
        
        return res.json(libros);

}


export const getPrestamos = (  //get de "Lista todos los préstamos"
    req: Request, 
    res: Response ) => {
        
        return res.json(prestamos);

}


export const buscarLibro = ( id: number , res:Response)=>{  //get de "Lista de libro por ID"
    const libroB = libros.find(x=>x.id===id);

    if(!libroB){
        res.status(404).json({
            message: "Libro no encontrado, busque de nuevo."

        }) 
        return
    }
    return libroB;
}


export const buscarPrestamo = ( id: number , res:Response)=>{  //get de "Lista de prestamos por LibroId"
    const prestamoI = prestamos.find(x=>x.libroId===id);

    if(!prestamoI){
        res.status(404).json({
            message: "Libro prestado no encontrado, busque de nuevo."

        }) 
        return
    }
    return prestamoI;
}


export const postLibro = ( //post de "Crea un libro nuevo"
    req: Request, 
    res: Response ) =>{
    
    
    if(!req.body){
        res.status(400).json({message:"Me tienes que pasar algo"})
        return
    }

    if(!req.body.titulo){
        res.status(400).json({message:"Me tienes que pasar un titulo"})
        return 
    }

    if(!req.body.autor){
        res.status(400).json({message:"Me tienes que pasar un autor"})
        return
    }

    if(!req.body.año){
        res.status(400).json({message:"Me tienes que pasar un año"})
        return
    }

    const nuevoLibro: librosT ={
        id: Math.random(),
        titulo: req.body.titulo,
        autor: req.body.autor,
        año: req.body.año,
        disponible: true   
    }

    libros.push(nuevoLibro);

    res.status(201).json(nuevoLibro);

}


export const putLibros = ( //put de "Reemplaza todos los datos de un libro"
    req: Request, 
    res: Response ) =>{
    const id= Number(req.params.id);

    const libroAcambiar = libros.find((x)=>x.id === id);

    if(!libroAcambiar){
        res.status(404).json({
            message: "El libro no existe"
    
        })
        return
    }
    
    if (!req.body){
        res.status(400).json({
            message:"me tienes que pasar algo"
        }) 
        return
    }

    if (!req.body.titulo || !req.body.año || !req.body.autor){
        res.status(400).json({
            message:"me falta alguno de estos campos(titulo, año o autor)"
        })
        return
    }

    const libroActualizado: librosT={
        id, 
        titulo: req.body.name,
        autor: req.body.autor,
        año: req.body.año,
        disponible: true
    }

    //con changefilmsm podemos asignar libros a los cambios
    cambiarLibros (libros.map(x=>x.id === id ? libroActualizado:x));

    res.json ({
        message:"libro actualizado correctamente",
        newfilm : libroActualizado
    })

}


export const patchLibros = ( //patch de "Modifica solo los campos enviados"
    req: Request, 
    res: Response ) =>{
    const id= Number(req.params.id);

    const libroAmod = libros.find((x)=>x.id === id);

    if(!libroAmod){
        res.status(404).json({
            message: "El libro no existe"
    
        })
        return
    }
    
    if (!req.body){
        res.status(400).json({
            message:"me tienes que pasar algo"
        }) 
        return
    }

    if (!req.body.name || !req.body.runtime){
        res.status(400).json({
            message:"me tienes que pasar algo, aunque sea una cosa"
        })
        return
    }

    const libroActualizado:librosT={
        id,
        titulo: req.body.titulo ? req.body.titulo : libroAmod.titulo,
        autor: req.body.autor ? req.body.autor : libroAmod.autor,
        año: req.body.año ? req.body.año : libroAmod.año,
        disponible: true
    }

    cambiarLibros(libros.map(x=>x.id===id?libroActualizado:x));

    res.json({
        message:"cambia o medias o como tu quieras"
    })}


export const deleteLibro = (
    req: Request, 
    res: Response ) =>{
        const id = Number (req.params.id);
        const Libro = buscarLibro(id,res);

        if(libros){
            cambiarLibros(libros.filter(x=>x.id!==id));
            res.json({
                message:"libro fuera"
            })
        }else {
            res.json({
                message:"libro no eliminada"
            })
        }

    }


export const postPrestar = ( //post de "Presta un libro a un usuario"
    req: Request, 
    res: Response ) =>{
    const id= Number(req.params.id);

    const libroAprestar = libros.find((x)=>x.id === id);

    if(!libroAprestar){
        res.status(404).json({
            message: "El libro no existe"
        })
        return
    }

    if(!libroAprestar.disponible){
        res.status(400).json({
            message: "El libro ya esta prestado"
        })
        return
    }
    
    if(!req.body){
        res.status(400).json({message:"Me tienes que pasar algo"})
        return
    }

    if(!req.body.usuario){
        res.status(400).json({message:"Me tienes que pasar un usuario"})
        return 
    }

    const libroActualizado: librosT={
        id: libroAprestar.id, 
        titulo: libroAprestar.titulo,
        autor: libroAprestar.autor,
        año: libroAprestar.año,
        disponible: false
    }

    cambiarLibros (libros.map(x=>x.id === id ? libroActualizado:x));

    const nuevoPrestamo: prestamosT ={
        id: Math.random(),
        libroId: id,
        usuario: req.body.usuario,
        fechaPrestamo: "hoy",
        fechaDevolucion: null
    }

    prestamos.push(nuevoPrestamo);

    res.status(201).json(nuevoPrestamo);
}


export const postDevolver = ( //post de "Registra la devolución de un libro"
    req: Request, 
    res: Response ) =>{
    const id= Number(req.params.id);

    const libroAdevolver = libros.find((x)=>x.id === id);

    if(!libroAdevolver){
        res.status(404).json({
            message: "El libro no existe"
        })
        return
    }

    if(libroAdevolver.disponible){
        res.status(400).json({
            message: "El libro no esta prestado"
        })
        return
    }

    const libroActualizado: librosT={
        id: libroAdevolver.id, 
        titulo: libroAdevolver.titulo,
        autor: libroAdevolver.autor,
        año: libroAdevolver.año,
        disponible: true
    }

    cambiarLibros (libros.map(x=>x.id === id ? libroActualizado:x));

    const prestamosAct = prestamos.map(x=>{
        if(x.libroId === id && x.fechaDevolucion === null){
            const prestamoActualizado: prestamosT={
                id: x.id,
                libroId: x.libroId,
                usuario: x.usuario,
                fechaPrestamo: x.fechaPrestamo,
                fechaDevolucion: "devuelto"
            }
            return prestamoActualizado;
        }
        return x;
    });

    changePrestamos (prestamosAct);

    res.json ({
        message:"libro devuelto correctamente",
        libroDevuelto : libroActualizado
    })
}