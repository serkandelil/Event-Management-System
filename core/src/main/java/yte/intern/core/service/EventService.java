package yte.intern.core.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.core.entity.Event;
import yte.intern.core.repository.EventRepository;

import javax.persistence.Column;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public Event addEvent(Event event) {
        event.setReservations(Set.of());
        event.setEventQS(Set.of());
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getNextEvents(LocalDate now) {
        return eventRepository.findByStartDateAfter(now);
    }


    public Event getEventByEventName(String eventName) {
        return eventRepository.findByEventName(eventName).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public Event updateEvent(Event event) {

        Optional<Event> eventOptional = eventRepository.findByEventName(event.getEventName());
        if (eventOptional.isPresent()) {
            updateEventFromDB(event, eventOptional.get());
            return eventRepository.save(event);
        } else {
            throw new EntityNotFoundException();
        }

    }
    private void updateEventFromDB(Event event, Event eventFromDB) {
        eventFromDB.setLongitude(event.getLongitude());
        eventFromDB.setLatitude(event.getLatitude());
        eventFromDB.setCapacity(event.getCapacity());
        eventFromDB.setStartDate(event.getStartDate());
        eventFromDB.setEndDate(event.getEndDate());
    }

    public void deleteEvent(String eventName) {
        eventRepository.deleteByEventName(eventName);
    }
}