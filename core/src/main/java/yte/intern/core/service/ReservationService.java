package yte.intern.core.service;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.entity.Reservation;
import yte.intern.core.repository.EventRepository;
import yte.intern.core.repository.GeneralUserRepository;
import yte.intern.core.repository.ReservationARepository;
import yte.intern.core.repository.ReservationRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationARepository reservationARepository;
    private final GeneralUserRepository generalUserRepository;
    private final EventRepository eventRepository;


    public Reservation addReservation(Reservation reservation, String eventName, Long tcNo) {
        reservation.setReservationAS(Set.of());
        reservation.setEventsR(eventRepository.findByEventName(eventName).get());
        reservation.setGeneralusers(generalUserRepository.findGeneralUserByTcNo(tcNo).get());
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByEventName(String eventName)
    {
        Event eventsq = getEventByEventName(eventName);
        return reservationRepository.findAllByEventsR(eventsq);
    }

    public List<Reservation> getReservationsByTcNo(Long tcNo)
    {
        GeneralUser gu = generalUserRepository.findGeneralUserByTcNo(tcNo).orElseThrow(EntityNotFoundException::new);
        return reservationRepository.findAllByGeneralusers(gu);
    }

    public Event getEventByEventName(String eventName) {
        return eventRepository.findByEventName(eventName).orElseThrow(EntityNotFoundException::new);
    }

    public void deleteReservation(String eventName) {
        Event eventsR = getEventByEventName(eventName);
        List<Reservation>  reservations = getReservationsByEventName(eventName);
        for (int i = 0;i<reservations.size();i++){
            reservationARepository.deleteAllByReservations(reservations.get(i));
        }
        reservationRepository.deleteByEventsR(eventsR);
    }

    public Map<LocalDate, Long> getDataByEventName(String eventName) {
        Map<LocalDate, Long> results = new HashMap<LocalDate, Long>();
        Optional<Event> e = eventRepository.findByEventName(eventName);
        List<Object[]> resultList = reservationRepository.findDataByEventsR(e.get());
        for (Object[] borderTypes: resultList) {
            results.put((LocalDate)borderTypes[0], (Long) borderTypes[1]);
        }
        return results;
    }
    public Map<String, Long> getData() {
        Map<String, Long> results = new HashMap<String, Long>();
        List<Object[]> resultList = reservationRepository.findData();
        for (Object[] borderTypes: resultList) {
            results.put((String)borderTypes[0], (Long) borderTypes[1]);
        }
        return results;
    }
}