package yte.intern.core.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventQ {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;
    @Column(name = "QUESTIONS")
    private String questions;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name ="EVENT_NAME", nullable = false)
    private Event eventsq;
}
