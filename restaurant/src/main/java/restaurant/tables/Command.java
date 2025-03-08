package restaurant.tables;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Commend")
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @NotBlank(message = "name cannot be empty or null")
    @Column(name = "nomdecmd", nullable = false)
    private String name;
    @NotNull(message = "name cannot be empty or null")
    @Column(name = "price", nullable = false)
    private double tprice;
    @ManyToOne
    private Restaurant restaurants;
    @ManyToOne
    private Utilisateur utilisateur;
    @ManyToMany
    private List<Repa> repa;

    public @NotBlank(message = "name cannot be empty or null") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "name cannot be empty or null") String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull(message = "name cannot be empty or null")
    public double getTprice() {
        return tprice;
    }

    public void setTprice(@NotNull(message = "name cannot be empty or null") double tprice) {
        this.tprice = tprice;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Restaurant getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Restaurant restaurants) {
        this.restaurants = restaurants;
    }

    public List<Repa> getRepa() {
        return repa;
    }

    public void setRepa(List<Repa> repa) {
        this.repa = repa;
    }
}
