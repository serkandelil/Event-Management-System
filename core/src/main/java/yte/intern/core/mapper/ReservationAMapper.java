package yte.intern.core.mapper;

import org.mapstruct.Mapper;
import yte.intern.core.dto.GeneralUserDTO;
import yte.intern.core.dto.ReservationADTO;
import yte.intern.core.entity.GeneralUser;
import yte.intern.core.entity.ReservationA;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationAMapper {

    ReservationADTO mapToDto(ReservationA reservationA);

    ReservationA mapToEntity(ReservationADTO reservationADTO);

    List<ReservationADTO> mapToDto(List<ReservationA> reservationAList);

    List<ReservationA> mapToEntity(List<ReservationADTO> reservationADTOList);
}