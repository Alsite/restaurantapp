package restaurant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import restaurant.tables.Repa;

@Repository
public interface RepaRepository extends JpaRepository<Repa, Long> {
}

