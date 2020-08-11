package yte.intern.core.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.mapstruct.BeforeMapping;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Getter
@Builder
public class EventDTO {

    @NotEmpty(message = "Dont leave blank")
    private final String eventName;

    @NotEmpty(message = "Dont leave blank")
    private final Long longitude;

    @NotEmpty(message = "Dont leave blank")
    private final Long latitude;

    @NotEmpty(message = "Dont leave blank")
    private final Long capacity;

    @NotEmpty(message = "Dont leave blank")
    private final LocalDate startDate;

    @NotEmpty(message = "Dont leave blank")
    private final LocalDate endDate;


    @JsonCreator
    public EventDTO(@JsonProperty("eventname") String eventName,
                      @JsonProperty("longitude") Long longitude,
                      @JsonProperty("latitude") Long latitude,
                      @JsonProperty("capacity") Long capacity,
                      @JsonProperty("startdate") LocalDate startDate,
                      @JsonProperty("enddate") LocalDate endDate) {
        this.eventName = eventName;
        this.longitude = longitude;
        this.latitude = latitude;
        this.capacity = capacity;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}