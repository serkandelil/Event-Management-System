package yte.intern.core.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.repository.EventQRepository;
import yte.intern.core.repository.EventRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EventQService {
    private final EventQRepository eventQRepository;
    private final EventRepository eventRepository;

    public EventQ addEventQ(EventQ eventq, String eventName) {
        eventq.setEventsq(eventRepository.findByEventName(eventName).get());
        return eventQRepository.save(eventq);
    }

    public List<EventQ> getEventQByEventName(String eventName)
    {
        Event eventsq = getEventByEventName(eventName);
        return eventQRepository.findAllByEventsq(eventsq);
    }

    public Event getEventByEventName(String eventName) {
        return eventRepository.findByEventName(eventName).orElseThrow(EntityNotFoundException::new);
    }

    public void deleteEventQ(String eventName) {
        Event eventsq = getEventByEventName(eventName);
        eventQRepository.deleteByEventsq(eventsq);
    }
}
