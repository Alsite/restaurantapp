package restaurant.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import restaurant.repositories.RepaRepository;
import restaurant.tables.Repa;

import java.util.List;
import java.util.Optional;

@Service
public class RepaService {

    private final RepaRepository repaRepository;

    @Autowired
    public RepaService(RepaRepository repaRepository) {
        this.repaRepository = repaRepository;
    }

    public List<Repa> getAllRepas() {
        return repaRepository.findAll();
    }

    public Optional<Repa> getRepaById(Long id) {
        return repaRepository.findById(id);
    }

    public Repa addRepa(Repa repa) {
        return repaRepository.save(repa);
    }

    public Repa updateRepa(Long id, Repa updatedRepa) {
        return repaRepository.findById(id)
                .map(existingRepa -> {
                    existingRepa.setName(updatedRepa.getName());
                    existingRepa.setPrice(updatedRepa.getPrice());
                    existingRepa.setRestaurant(updatedRepa.getRestaurant());
                    return repaRepository.save(existingRepa);
                }).orElseThrow(() -> new RuntimeException("Repa not found with ID: " + id));
    }

    public void deleteRepa(Long id) {
        repaRepository.deleteById(id);
    }
}
