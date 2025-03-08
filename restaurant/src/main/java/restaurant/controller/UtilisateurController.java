package restaurant.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import restaurant.services.UtilisateurService;
import restaurant.tables.Utilisateur;

import java.util.List;
import java.util.Optional;
//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")

public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @Autowired
    public UtilisateurController(UtilisateurService utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public List<Utilisateur> getAllUsers() {
        return utilisateurService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable long id) {
        Utilisateur user = utilisateurService.getById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Utilisateur> getUserByEmail(@PathVariable String email) {
        Optional<Utilisateur> user = utilisateurService.findByEmail(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Utilisateur createUser(@RequestBody Utilisateur user) {

        return utilisateurService.add(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable long id, @RequestBody Utilisateur user) {

        Utilisateur existingUser = utilisateurService.getById(id);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }


        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());

        Utilisateur updatedUser = utilisateurService.update(existingUser);

        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_admin')")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        utilisateurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

