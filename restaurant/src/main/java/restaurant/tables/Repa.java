package restaurant.tables;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Repa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @NotBlank(message = "name cannot be empty or null")
    @Size(min = 3, message = "length cannot be low than 3 character")
    @Column(name = "nom", nullable = false)
    private String name;
    @NotNull(message = "name cannot be empty or null")
    @Column(name = "price", nullable = false)
    private double price;
    @ManyToOne
    private Restaurant restaurant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "name cannot be empty or null") @Size(min = 3, message = "length cannot be low than 3 character") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "name cannot be empty or null") @Size(min = 3, message = "length cannot be low than 3 character") String name) {
        this.name = name;
    }

    @NotNull(message = "name cannot be empty or null")
    public double getPrice() {
        return price;
    }

    public void setPrice(@NotNull(message = "name cannot be empty or null") double price) {
        this.price = price;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
