package restaurant.tables;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Restaurant", uniqueConstraints = {
        @UniqueConstraint(columnNames = "nom", name = "uniqueNameConstraint")
})
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @NotBlank(message = "name cannot be empty or null")
    @Size(min = 3, message = "length cannot be low than 3 character")
    @Column(name = "nom", nullable = false)
    private String name;
    @NotBlank(message = "moughataa cannot be empty or null")
    @Column(name = "moughataa", nullable = false)
    private String moughataa;

    @NotBlank(message = "commune cannot be empty or null")
    @Column(name = "commune", nullable = false)
    private String commune;

    @NotNull(message = "latitude cannot be empty or null")
    @Column(name = "latitude", nullable = false)
    private double latitude;

    @NotNull(message = "longitude cannot be empty or null")
    @Column(name = "longitude", nullable = false)
    private double longitude;

    @ManyToOne
    private Utilisateur utilisateur;

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

    public @NotBlank(message = "moughataa cannot be empty or null") String getMoughataa() {
        return moughataa;
    }

    public void setMoughataa(@NotBlank(message = "moughataa cannot be empty or null") String moughataa) {
        this.moughataa = moughataa;
    }

    public @NotBlank(message = "commune cannot be empty or null") String getCommune() {
        return commune;
    }

    public void setCommune(@NotBlank(message = "commune cannot be empty or null") String commune) {
        this.commune = commune;
    }

    @NotNull(message = "latitude cannot be empty or null")
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(@NotNull(message = "latitude cannot be empty or null") double latitude) {
        this.latitude = latitude;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    @NotNull(message = "longitude cannot be empty or null")
    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(@NotNull(message = "longitude cannot be empty or null") double longitude) {
        this.longitude = longitude;
    }
}