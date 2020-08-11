package yte.intern.core.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import yte.intern.core.entity.Event;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findAll();

    Optional<Event> findByEventName(String eventName);

    @Transactional
    void deleteByEventName(String eventName);

    List<Event> findByStartDateAfter(LocalDate now);
}
