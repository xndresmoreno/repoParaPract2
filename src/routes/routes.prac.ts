import { Router } from "express";
import { 
    getLibros, 
    getPrestamos, 
    postLibro, 
    putLibros, 
    patchLibros, 
    deleteLibro,
    postPrestar,
    postDevolver
} from "../controllers/cnt.prac.js";

const router = Router();

router.get("/libros", getLibros);
router.get("/prestamos", getPrestamos);
router.post("/libros", postLibro);

router.put("/libros/:id", putLibros);
router.patch("/libros/:id", patchLibros);
router.delete("/libros/:id", deleteLibro);

router.post("/libros/:id/prestar", postPrestar);
router.post("/libros/:id/devolver", postDevolver);

export default router;