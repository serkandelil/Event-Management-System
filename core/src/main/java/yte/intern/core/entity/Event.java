package yte.intern.core.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @Column(name = "EVENT_NAME",unique = true)
    private String eventName;
    @Column(name = "LONGITUDE")
    private Long longitude;
    @Column(name = "LATITUDE")
    private Long latitude;
    @Column(name = "CAPACITY")
    private Long capacity;
    @Column(name = "START_DATE")
    private LocalDate startDate;
    @Column(name = "END_DATE")
    private LocalDate endDate;

    @OneToMany(mappedBy = "eventsR",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Reservation> reservations;

    @OneToMany(mappedBy = "eventsq", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<EventQ> eventQS;

}
