package com.tecsup.demo15.controlador;

import com.tecsup.demo15.excepciones.ResourceNotFoundException;
import com.tecsup.demo15.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tecsup.demo15.modelo.Categoria;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaControlador {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    @GetMapping("/categorias")
    public List<Categoria> listarTodasLasCategorias() {
        return categoriaRepositorio.findAll();
    }

    @PostMapping("/categorias")
    public Categoria guardarCategoria(@RequestBody Categoria categoria) {
        return categoriaRepositorio.save(categoria);
    }

    @GetMapping("/categorias/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Long id) {
        Categoria categoria = categoriaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la categoría con el ID: " + id));
        return ResponseEntity.ok(categoria);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria detallesCategoria) {
        Categoria categoria = categoriaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la categoría con el ID: " + id));

        categoria.setNombre(detallesCategoria.getNombre());

        Categoria categoriaActualizada = categoriaRepositorio.save(categoria);
        return ResponseEntity.ok(categoriaActualizada);
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCategoria(@PathVariable Long id) {
        Categoria categoria = categoriaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la categoría con el ID: " + id));

        categoriaRepositorio.delete(categoria);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
