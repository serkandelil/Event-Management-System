package yte.intern.core.mapper;

import org.mapstruct.Mapper;
import yte.intern.core.dto.GeneralUserDTO;
import yte.intern.core.entity.GeneralUser;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GeneralUserMapper {

    GeneralUserDTO mapToDto(GeneralUser generalUser);

    GeneralUser mapToEntity(GeneralUserDTO generalUserDTO);

    List<GeneralUserDTO> mapToDto(List<GeneralUser> generalUserList);

    List<GeneralUser> mapToEntity(List<GeneralUserDTO> generalUserDTOList);
}