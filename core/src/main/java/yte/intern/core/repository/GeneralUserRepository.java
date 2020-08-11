package yte.intern.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.entity.Reservation;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public interface GeneralUserRepository extends JpaRepository<GeneralUser, Long> {
    Optional<GeneralUser> findGeneralUserByTcNo(Long tcNo);

    @Transactional
    void deleteByTcNo(Long tcNo);

    @Query("SELECT g FROM  GeneralUser g INNER JOIN Reservation r ON r.generalusers.tcNo = g.tcNo " +
            "WHERE r.eventsR.eventName = ?1 ")
    List<GeneralUser> findGeneralUserByEventName(String eventname);

}