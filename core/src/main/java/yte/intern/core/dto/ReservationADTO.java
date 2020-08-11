package yte.intern.core.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import yte.intern.core.entity.Reservation;
import javax.validation.constraints.Size;

@Getter
@Builder
public class ReservationADTO {

    @Size(max = 255, message = "Title can be at most 255 characters!")
    private final String answers;


    @JsonCreator
    public ReservationADTO(@JsonProperty("answers") String answers) {
        this.answers = answers;
    }
    /*
    private final Reservation reservations;

    @JsonCreator
    public ReservationADTO(@JsonProperty("answers") String answers,
                     @JsonProperty("reservation") Reservation reservations) {
        this.answers = answers;
        this.reservations = reservations;
    }*/
}