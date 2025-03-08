package restaurant.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import restaurant.tables.Restaurant;
import restaurant.tables.Utilisateur;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Trouver restaurants avec a specific user
    @Query("SELECT r FROM Restaurant r WHERE r.utilisateur = :user")
    List<Restaurant> findByUtilisateur(@Param("user") Utilisateur user);


    //Trouver restaurants avec commune
    @Query("SELECT r FROM Restaurant r WHERE r.commune LIKE %:commune%")
    List<Restaurant> findByCommune(@Param("commune") String commune);

    // Trouver restaurants avec moughataa
    @Query("SELECT r FROM Restaurant r WHERE r.moughataa LIKE %:moughataa%")
    List<Restaurant> findByMoughataa(@Param("moughataa") String moughataa);
}
