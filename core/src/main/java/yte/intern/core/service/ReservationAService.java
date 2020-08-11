package yte.intern.core.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.entity.Reservation;
import yte.intern.core.entity.ReservationA;
import yte.intern.core.repository.ReservationARepository;
import yte.intern.core.repository.ReservationRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReservationAService {
    private final ReservationARepository reservationARepository;
    private final ReservationRepository reservationRepository;

    public ReservationA addReservationA(ReservationA reservationA, Long reservationId) {
        reservationA.setReservations(reservationRepository.findById(reservationId).get());
        return reservationARepository.save(reservationA);
    }

    public List<ReservationA> getReservationAByReservationId(Long reservationId)
    {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(EntityNotFoundException::new);
        return reservationARepository.findAllByReservations(reservation);
    }

    public void deleteReservationA(Reservation reservation) {
        reservationARepository.deleteAllByReservations(reservation);
    }
}