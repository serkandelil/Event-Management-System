package yte.intern.core.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "idgen", sequenceName = "RESERVATION_SEQ")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgen")
    @Column(name = "ID")
    private Long id;
    @Column(name = "RESERVE_DATE")
    private LocalDate reserveDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name ="TC_NO")
    private GeneralUser generalusers;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name ="EVENT_NAME")
    private Event eventsR;

    @OneToMany(mappedBy = "reservations",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<ReservationA> reservationAS;
}
