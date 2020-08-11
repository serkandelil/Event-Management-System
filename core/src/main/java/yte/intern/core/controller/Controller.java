package yte.intern.core.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.core.dto.EventDTO;
import yte.intern.core.dto.EventQDTO;
import yte.intern.core.dto.GeneralUserDTO;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.EventQ;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.entity.Reservation;
import yte.intern.core.mapper.*;
import yte.intern.core.repository.EventRepository;
import yte.intern.core.repository.GeneralUserRepository;
import yte.intern.core.repository.ReservationRepository;
import yte.intern.core.service.EventQService;
import yte.intern.core.service.EventService;
import yte.intern.core.service.ReservationAService;
import yte.intern.core.service.ReservationService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@Validated
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    private final EventService eventService;
    private final EventMapper eventMapper;
    private final EventQService eventQService;
    private final EventQMapper eventQMapper;
    private final ReservationService reservationService;
    private final ReservationAService reservationAService;
    private final GeneralUserMapper generalUserMapper;
    private final GeneralUserRepository generalUserRepository;
    LocalDate now = LocalDate.now();

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<Event> event = eventService.getAllEvents();
        return new ResponseEntity<>(eventMapper.mapToDto(event), HttpStatus.OK);
    }

    @GetMapping("/{eventName}")
    public ResponseEntity<EventDTO> getEventByEventName(@PathVariable String eventName) {
        Event event = eventService.getEventByEventName(eventName);
        return new ResponseEntity<>(eventMapper.mapToDto(event), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EventDTO> addEvent(@Valid @RequestBody EventDTO eventDTO) {
        Event event = eventMapper.mapToEntity(eventDTO);
        if(event.getStartDate().isBefore(event.getEndDate())){
            Event addedEvent = eventService.addEvent(event);
            return new ResponseEntity<>(eventMapper.mapToDto(addedEvent), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping("/{eventName}")
    ResponseEntity<String> deleteEvent(@PathVariable String eventName) {
        Event e = eventService.getEventByEventName(eventName);
        if(e.getStartDate().isBefore(now)){
            return new ResponseEntity<>("You can not delete an event after startdate",HttpStatus.NOT_ACCEPTABLE);
        }else {
            List<Reservation> r = reservationService.getReservationsByEventName(eventName);
            for (int i = 0; i < r.size(); i++) {
                reservationAService.deleteReservationA(r.get(i));
            }
            reservationService.deleteReservation(eventName);
            eventQService.deleteEventQ(eventName);
            eventService.deleteEvent(eventName);
            return new ResponseEntity<>(eventName+" is deleted",HttpStatus.OK);
        }
    }

    @PutMapping("/{eventName}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable String eventName, @Valid @RequestBody EventDTO eventDTO) {
        Event e = eventService.getEventByEventName(eventName);
        Event event = eventMapper.mapToEntity(eventDTO);
        if (e.getStartDate().isBefore(now)) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        } else {
            if(event.getStartDate().isBefore(event.getEndDate())) {
                Event updatedStudent = eventService.updateEvent(event);
                return new ResponseEntity<>(eventMapper.mapToDto(updatedStudent), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
    }

    @GetMapping("/{eventName}/eventq")
    public ResponseEntity<List<EventQDTO>> getEventQByEventName(@PathVariable String eventName) {
        List<EventQ> eventq = eventQService.getEventQByEventName(eventName);
        return new ResponseEntity<>(eventQMapper.mapToDto(eventq), HttpStatus.OK);
    }

    @GetMapping("/user/{eventName}")
    public ResponseEntity<List<GeneralUserDTO>> getUserByEventName(@PathVariable String eventName) {
        List<GeneralUser> gu=generalUserRepository.findGeneralUserByEventName(eventName);
        if(gu.size()==0){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(generalUserMapper.mapToDto(gu),HttpStatus.OK);
    }

    @PostMapping("/{eventName}")
    public ResponseEntity<EventQDTO> addEventQ(@Valid @RequestBody EventQDTO eventQDTO,@PathVariable String eventName ) {
        EventQ eventq = eventQMapper.mapToEntity(eventQDTO);
        EventQ addedEventQ = eventQService.addEventQ(eventq,eventName);
        return new ResponseEntity<>(eventQMapper.mapToDto(addedEventQ),HttpStatus.OK);
    }

    @GetMapping("/data/{eventName}")
    public ResponseEntity<Map<LocalDate,Long>> getDataByEventName(@PathVariable String eventName) {
        Map<LocalDate,Long> m = reservationService.getDataByEventName(eventName);
        return new ResponseEntity<>(m,HttpStatus.OK);
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String,Long>> getData() {
        Map<String,Long> m = reservationService.getData();
        return new ResponseEntity<>(m,HttpStatus.OK);
    }

}