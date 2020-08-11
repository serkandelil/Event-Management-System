package yte.intern.core.mapper;

import org.mapstruct.Mapper;
import yte.intern.core.dto.ReservationDTO;
import yte.intern.core.entity.Reservation;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    ReservationDTO mapToDto(Reservation reservation);

    Reservation mapToEntity(ReservationDTO reservationDTO);

    List<ReservationDTO> mapToDto(List<Reservation> reservationList);

    List<Reservation> mapToEntity(List<ReservationDTO> reservationDTOList);
}