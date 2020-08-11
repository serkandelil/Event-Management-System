package yte.intern.core.dto;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class ReservationDTO {

    private final LocalDate reserveDate;

    @JsonCreator
    public ReservationDTO(@JsonProperty("reservedate") LocalDate reserveDate) {
        this.reserveDate = reserveDate;
    }
}