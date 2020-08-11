package yte.intern.core.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailParseException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.core.dto.*;
import yte.intern.core.entity.*;
import yte.intern.core.mapper.*;
import yte.intern.core.repository.EventRepository;
import yte.intern.core.repository.ReservationRepository;
import yte.intern.core.service.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@Validated
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final EventService eventService;
    private final EventMapper eventMapper;
    private final EventRepository eventRepository;
    private final EventQService eventQService;
    private final EventQMapper eventQMapper;
    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;
    private final ReservationRepository reservationRepository;
    private final GeneralUserService generalUserService;
    private final GeneralUserMapper generalUserMapper;
    private final ReservationAService reservationAService;
    private final ReservationAMapper reservationAMapper;
    @Autowired
    private JavaMailSender mailSender;
    LocalDate now = LocalDate.now();
    private static String QR_CODE_IMAGE_PATH = "./MyQRCode.png";

    @GetMapping
    public ResponseEntity<List<EventDTO>> getNextEvents(){
        List<Event> event = eventService.getNextEvents(now);
        return new ResponseEntity<>(eventMapper.mapToDto(event), HttpStatus.OK);
    }

    @GetMapping("/{eventName}")
    public ResponseEntity<EventDTO> getEventByEventName(@PathVariable String eventName) {
        Event event = eventService.getEventByEventName(eventName);
        return new ResponseEntity<>(eventMapper.mapToDto(event), HttpStatus.OK);
    }

    @GetMapping("/{eventName}/eventq")
    public ResponseEntity<List<EventQDTO>> getEventQByEventName(@PathVariable String eventName) {
        List<EventQ> eventq = eventQService.getEventQByEventName(eventName);
        return new ResponseEntity<>(eventQMapper.mapToDto(eventq), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GeneralUserDTO> addGeneralUser(@Valid @RequestBody GeneralUserDTO generalUserDTO) {
        GeneralUser generalUser = generalUserMapper.mapToEntity(generalUserDTO);
        GeneralUser addedGU = generalUserService.addUser(generalUser);
        return new ResponseEntity<>(generalUserMapper.mapToDto(addedGU), HttpStatus.OK);
    }

    @GetMapping("/tc/{tcNo}")
    public ResponseEntity<GeneralUserDTO> getUserByTcNo(@PathVariable Long tcNo) {
        GeneralUser gu = generalUserService.getUserByTcNo(tcNo);
        return new ResponseEntity<>(generalUserMapper.mapToDto(gu), HttpStatus.OK);
    }

    @PostMapping("/{eventName}/{tcNo}")
    public ResponseEntity<ReservationDTO> addReservation(@Valid @RequestBody ReservationDTO reservationDTO,
                                                         @PathVariable String eventName,@PathVariable Long tcNo ) throws IOException, WriterException {
        Optional<Event> e = eventRepository.findByEventName(eventName);
        List<Reservation> reservations = reservationRepository.findAllByEventsR(e.get());
        for(int i=0;i<reservations.size();i++){
            if(reservations.get(i).getGeneralusers().getTcNo().equals(tcNo)){
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }
        if(reservations.size() < e.get().getCapacity()) {
            Reservation reservation = reservationMapper.mapToEntity(reservationDTO);
            reservation.setReserveDate(now);
            Reservation addedReservation = reservationService.addReservation(reservation,eventName,tcNo);
            sendSimpleMessage(addedReservation);
            return new ResponseEntity<>(reservationMapper.mapToDto(addedReservation), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/reservationA/{eventName}/{tcNo}")
    public ResponseEntity<ReservationADTO> addReservationA(@Valid @RequestBody ReservationADTO reservationADTO,@PathVariable String eventName,@PathVariable Long tcNo ) {
        ReservationA reservationA = reservationAMapper.mapToEntity(reservationADTO);
        GeneralUser gu=generalUserService.getUserByTcNo(tcNo);
        Event e= eventService.getEventByEventName(eventName);
        Reservation r=reservationRepository.findAllByGeneralusersAndEventsR(gu,e);
        ReservationA addedResA = reservationAService.addReservationA(reservationA,r.getId());
        return new ResponseEntity<>(reservationAMapper.mapToDto(addedResA), HttpStatus.OK);
    }

    private static void generateQRCodeImage(String text, int width, int height, String filePath)
            throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = FileSystems.getDefault().getPath(filePath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }

    public void sendSimpleMessage(Reservation reservation) throws IOException, WriterException {
        QR_CODE_IMAGE_PATH = "C:\\Users\\serkan\\Desktop\\core\\core\\src\\main\\webapp\\reactjs\\src\\images\\" + reservation.getGeneralusers().getTcNo().toString() +
                reservation.getEventsR().getEventName() + ".png";

        System.out.println(reservation.getGeneralusers().getTcNo().toString());
        System.out.println(reservation.getEventsR().getEventName());
        generateQRCodeImage(" firstname : " +reservation.getGeneralusers().getFirstname() +
                "\n surname: " +reservation.getGeneralusers().getSurname()+
                "\n tcno: " +reservation.getGeneralusers().getTcNo().toString() +
                "\n event date: " +reservation.getEventsR().getStartDate() +
                "\n event name: " +reservation.getEventsR().getEventName(), 350, 350, QR_CODE_IMAGE_PATH);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Reservation QR");
        message.setText("Do not lose this qr code");
        message.setTo(reservation.getGeneralusers().getEmail());

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(message.getTo());
            helper.setSubject(message.getSubject());
            helper.setText(message.getText());
            FileSystemResource file = new FileSystemResource(QR_CODE_IMAGE_PATH);
            helper.addAttachment(file.getFilename(), file);

        } catch (MessagingException e) {
            throw new MailParseException(e);
        }

        mailSender.send(mimeMessage);
    }
}

