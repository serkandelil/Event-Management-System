package yte.intern.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.entity.Reservation;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByEventsR(Event eventsR);

    Optional<Reservation> findById(Long id);

    @Transactional
    void deleteByEventsR(Event eventsR);

    List<Reservation> findAllByGeneralusers(GeneralUser gu);

    Reservation findAllByGeneralusersAndEventsR(GeneralUser gu,Event eventsR);

    @Query("SELECT r.eventsR.eventName, COUNT(r.generalusers.tcNo) from Reservation r  group by r.eventsR.eventName")
    List<Object[]> findData();

    @Query("SELECT r.reserveDate, COUNT(r.id) from Reservation r where r.eventsR = ?1 group by r.reserveDate")
    List<Object[]> findDataByEventsR(Event eventsR);
}