package com.tecsup.demo15.controlador;

import com.tecsup.demo15.excepciones.ResourceNotFoundException;
import com.tecsup.demo15.modelo.Producto;
import com.tecsup.demo15.repositorio.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoControlador {

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @GetMapping("/productos")
    public List<Producto> listarTodosLosProductos() {
        return productoRepositorio.findAll();
    }

    @PostMapping("/productos")
    public Producto guardarProducto(@RequestBody Producto producto) {
        return productoRepositorio.save(producto);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Long id) {
        Producto producto = productoRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el producto con el ID: " + id));
        return ResponseEntity.ok(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long id, @RequestBody Producto detallesProducto) {
        Producto producto = productoRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el producto con el ID: " + id));

        producto.setNombre(detallesProducto.getNombre());
        producto.setPrecio(detallesProducto.getPrecio());
        producto.setCategoria(detallesProducto.getCategoria());

        Producto productoActualizado = productoRepositorio.save(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarProducto(@PathVariable Long id) {
        Producto producto = productoRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe el producto con el ID: " + id));

        productoRepositorio.delete(producto);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminar", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
