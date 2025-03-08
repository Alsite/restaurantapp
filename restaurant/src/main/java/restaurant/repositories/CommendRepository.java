package restaurant.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import restaurant.tables.Command;

public interface CommendRepository extends JpaRepository<Command, Long> {
}

