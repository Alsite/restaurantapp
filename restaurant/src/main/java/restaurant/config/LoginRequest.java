package restaurant.config;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "Email cannot be empty or null")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty or null")
    private String password;

    public @NotBlank(message = "Email cannot be empty or null") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email cannot be empty or null") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password cannot be empty or null") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be empty or null") String password) {
        this.password = password;
    }
}

