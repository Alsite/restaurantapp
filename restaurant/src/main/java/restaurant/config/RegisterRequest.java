package restaurant.config;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Name cannot be empty or null")
    @Size(min = 3, message = "Name must be at least 3 characters long")
    private String name;

    @NotBlank(message = "Email cannot be empty or null")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty or null")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "Role cannot be empty or null")
    @Pattern(regexp = "admin|restaurant|client", message = "Invalid role. Must be 'admin', 'restaurant', or 'client'")
    private String role;

    public @NotBlank(message = "Name cannot be empty or null") @Size(min = 3, message = "Name must be at least 3 characters long") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name cannot be empty or null") @Size(min = 3, message = "Name must be at least 3 characters long") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Email cannot be empty or null") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email cannot be empty or null") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password cannot be empty or null") @Size(min = 8, message = "Password must be at least 8 characters long") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be empty or null") @Size(min = 8, message = "Password must be at least 8 characters long") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Role cannot be empty or null") @Pattern(regexp = "admin|restaurant|client", message = "Invalid role. Must be 'admin', 'restaurant', or 'client'") String getRole() {
        return role;
    }

    public void setRole(@NotBlank(message = "Role cannot be empty or null") @Pattern(regexp = "admin|restaurant|client", message = "Invalid role. Must be 'admin', 'restaurant', or 'client'") String role) {
        this.role = role;
    }
}
