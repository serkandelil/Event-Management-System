package yte.intern.core.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class GeneralUser {
    @Id
    @Column(name = "TC_NO",unique = true)
    private Long tcNo;
    @Column(name = "FIRSTNAME")
    private String firstname;
    @Column(name = "SURNAME")
    private String surname;
    @Column(name = "EMAIL",unique = true)
    private String email;

    @OneToMany(mappedBy = "generalusers",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Reservation> reservations;
}