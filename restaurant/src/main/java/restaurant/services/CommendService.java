package restaurant.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import restaurant.repositories.CommendRepository;
import restaurant.tables.Command;

import java.util.List;

@Service
public class CommendService {

    private final CommendRepository commendRepository;

    @Autowired
    public CommendService(CommendRepository commendRepository) {
        this.commendRepository = commendRepository;
    }

    public List<Command> getAll() {
        return commendRepository.findAll();
    }

    public Command getById(long id) {
        return commendRepository.findById(id).orElse(null);
    }

    public Command add(Command commend) {
        return commendRepository.save(commend);
    }

    public Command update(Command commend) {
        return commendRepository.save(commend);
    }

    public void delete(long id) {
        commendRepository.deleteById(id);
    }
}
