package yte.intern.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.entity.Reservation;
import yte.intern.core.entity.ReservationA;

import javax.transaction.Transactional;
import java.util.List;

public interface ReservationARepository extends JpaRepository<ReservationA, Long> {

    List<ReservationA> findAllByReservations(Reservation reservation);
    @Transactional
    void deleteAllByReservations(Reservation reservation);
}