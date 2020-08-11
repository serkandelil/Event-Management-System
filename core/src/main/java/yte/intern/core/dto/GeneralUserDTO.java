package yte.intern.core.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import yte.intern.core.validation.TcKimlikNo;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Getter
@Builder
public class GeneralUserDTO {

    @Size(min = 11, max = 11, message = "TC Kimlik no must be 11 characters long!")
    @TcKimlikNo(message = "TC Kimlik No must be valid!")
    public final String tcNo;

    @Size(max = 255, message = "Name can't be longer than 255!")
    public final String firstname;

    @Size(max = 255, message = "Surname can't be longer than 255!")
    public final String surname;

    @Email(message = "Please enter a valid e-mail address!")
    @Size(max = 255, message = "E-mail can't be longer than 255!")
    public final String email;

    @JsonCreator
    public GeneralUserDTO(@JsonProperty("tcno") String tcNo,
                    @JsonProperty("firstname") String firstname,
                      @JsonProperty("surname") String surname,
                      @JsonProperty("email") String email) {
        this.tcNo = tcNo;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;

    }
}