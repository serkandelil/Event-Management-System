package yte.intern.core.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.core.entity.Event;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.repository.GeneralUserRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GeneralUserService {
    private final GeneralUserRepository generalUserRepository;

    public GeneralUser addUser(GeneralUser generalUser) {
        generalUser.setReservations(Set.of());
        return generalUserRepository.save(generalUser);
    }

    public GeneralUser getUserByTcNo(Long tcNo) {
        return generalUserRepository.findGeneralUserByTcNo(tcNo).orElseThrow(EntityNotFoundException::new);
    }

    public void deleteUser(Long tcNo) {
        generalUserRepository.deleteByTcNo(tcNo);
    }

}