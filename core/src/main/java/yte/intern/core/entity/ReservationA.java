package yte.intern.core.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationA {
    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;
    @Column(name = "ANSWERS")
    private String answers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="reservation_id")
    private Reservation reservations;
}
