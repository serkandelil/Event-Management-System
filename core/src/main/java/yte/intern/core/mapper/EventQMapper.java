package yte.intern.core.mapper;

import org.mapstruct.Mapper;
import yte.intern.core.dto.EventQDTO;
import yte.intern.core.entity.EventQ;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EventQMapper {

    EventQDTO mapToDto(EventQ eventq);

    EventQ mapToEntity(EventQDTO eventqDTO);

    List<EventQDTO> mapToDto(List<EventQ> eventqList);

    List<EventQ> mapToEntity(List<EventQDTO> eventqDTOList);
}