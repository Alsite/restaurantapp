package restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restaurant.services.RepaService;
import restaurant.tables.Repa;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/repas")
public class RepaController {

    private final RepaService repaService;

    @Autowired
    public RepaController(RepaService repaService) {
        this.repaService = repaService;
    }

    @GetMapping
    public List<Repa> getAllRepas() {
        return repaService.getAllRepas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Repa> getRepaById(@PathVariable Long id) {
        return repaService.getRepaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Repa> addRepa(@RequestBody Repa repa) {
        return ResponseEntity.ok(repaService.addRepa(repa));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Repa> updateRepa(@PathVariable Long id, @RequestBody Repa repa) {
        try {
            return ResponseEntity.ok(repaService.updateRepa(id, repa));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepa(@PathVariable Long id) {
        repaService.deleteRepa(id);
        return ResponseEntity.noContent().build();
    }
}
