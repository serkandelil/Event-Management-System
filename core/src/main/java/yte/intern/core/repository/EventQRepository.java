package yte.intern.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;

import javax.transaction.Transactional;
import java.util.List;

public interface EventQRepository extends JpaRepository<EventQ, Long> {

    List<EventQ> findAllByEventsq(Event eventsq);

    @Transactional
    void deleteByEventsq(Event eventsq);
}