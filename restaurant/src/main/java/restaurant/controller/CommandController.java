package restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restaurant.services.CommendService;
import restaurant.tables.Command;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/commend")
public class CommandController {

    private final CommendService commendService;

    @Autowired
    public CommandController(CommendService commendService) {
        this.commendService = commendService;
    }

    @GetMapping
    public List<Command> getAll() {
        return commendService.getAll();
    }

    @GetMapping("/{id}")
    public Command getById(@PathVariable long id) {
        return commendService.getById(id);
    }

    @PostMapping
    public Command add(@RequestBody Command commend) {
        return commendService.add(commend);
    }

    @PutMapping("/{id}")
    public Command update(@PathVariable Long id, @RequestBody Command commend) {
        commend.setId(id); // Ensure the ID is set in the entity
        return commendService.update(commend);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        commendService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

