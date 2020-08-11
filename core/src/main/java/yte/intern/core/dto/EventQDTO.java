package yte.intern.core.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import yte.intern.core.entity.Event;

import javax.validation.constraints.Size;

@Getter
@Builder
public class EventQDTO {

    @Size(max = 255, message = "Title can be at most 255 characters!")
    private final String questions;

    @JsonCreator
    public EventQDTO(@JsonProperty("questions") String questions
                     ) {
        this.questions = questions;
    }
}