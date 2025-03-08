package restaurant.tables;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Utilisateur", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email", name = "uniqueEmailConstraint")
})
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Column(name = "id")
    private Long id;

    @NotBlank(message = "name cannot be empty or null")
    @Size(min = 3, message = "length cannot be low than 3 character")
    @Column(name = "nom", nullable = false)
    private String name;

    @NotBlank(message = "email cannot be empty or null")
    @Email(message = "this isn't like email")
    @Column(name = "email", nullable = false)
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotBlank(message = "password cannot be empty or null")
    @Size(min = 8, message = "length cannot be low than 8 character")
    @Column(name = "password", nullable = false)
    private String password;

    @Pattern(regexp = "ROLE_admin|ROLE_restaurant|ROLE_client", message = "Invalid role. Must be one of 'ROLE_admin', 'ROLE_restaurant', or 'ROLE_client'")
    @Column(name = "Role", nullable = false)
    private String role;



    public @NotBlank(message = "name cannot be empty or null") @Size(min = 3, message = "length cannot be low than 3 character") String getName() {
        return name;
    }

    public @NotBlank(message = "email cannot be empty or null") @Email(message = "this isn't like email") String getEmail() {
        return email;
    }

    public @NotBlank(message = "password cannot be empty or null") @Size(min = 8, message = "length cannot be low than 8 character") String getPassword() {
        return password;
    }




    public void setEmail(@NotBlank(message = "email cannot be empty or null") @Email(message = "this isn't like email") String email) {
        this.email = email;
    }

    public void setName(@NotBlank(message = "name cannot be empty or null") @Size(min = 3, message = "length cannot be low than 3 character") String name) {
        this.name = name;
    }

    public void setPassword(@NotBlank(message = "password cannot be empty or null") @Size(min = 8, message = "length cannot be low than 8 character") String password) {
        this.password = password;
    }

    public @Pattern(regexp = "ROLE_admin|ROLE_restaurant|ROLE_client", message = "Invalid role. Must be one of 'admin', 'restaurant', or 'client'") String getRole() {
        return role;
    }

    public void setRole(@Pattern(regexp = "ROLE_admin|ROLE_restaurant|ROLE_client", message = "Invalid role. Must be one of 'admin', 'restaurant', or 'client'") String role) {
        this.role = role;
    }
}

