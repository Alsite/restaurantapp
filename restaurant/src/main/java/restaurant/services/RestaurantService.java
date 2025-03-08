package restaurant.services;




import org.springframework.stereotype.Service;
import restaurant.repositories.RestaurantRepository;
import restaurant.tables.Restaurant;
import restaurant.tables.Utilisateur;

import java.util.List;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public List<Restaurant> getRestaurantsByUser(Utilisateur user) {
        return restaurantRepository.findByUtilisateur(user);
    }

    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, Restaurant restaurant) {
        if (restaurantRepository.existsById(id)) {
            restaurant.setId(id);
            return restaurantRepository.save(restaurant);
        }
        return null;
    }

    public void deleteRestaurant(Long id) {
        if (restaurantRepository.existsById(id)) {
            restaurantRepository.deleteById(id);
        }
    }

    public List<Restaurant> findByCommune(String commune) {
        return restaurantRepository.findByCommune(commune);
    }

    public List<Restaurant> findByMoughataa(String moughataa) {
        return restaurantRepository.findByMoughataa(moughataa);
    }
}

