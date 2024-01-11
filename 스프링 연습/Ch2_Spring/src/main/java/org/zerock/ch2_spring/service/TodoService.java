package org.zerock.ch2_spring.service;

import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.zerock.ch2_spring.dao.TodoDAO;
import org.zerock.ch2_spring.domain.TodoVO;
import org.zerock.ch2_spring.dto.TodoDTO;
import org.zerock.ch2_spring.util.MapperUtil;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
public enum TodoService {
    INSTANCE;

    private TodoDAO dao;
    private ModelMapper modelMapper;

    TodoService() {
        dao = new TodoDAO();
        modelMapper = MapperUtil.INSTANCE.get();
    }

    public void register(TodoDTO todoDTO)throws Exception {

        TodoVO todoVO = modelMapper.map(todoDTO, TodoVO.class);

       //System.out.println("todoVO: " + todoVO);
        log.info(todoVO);

        dao.insert(todoVO); //int 를 반환하므로 이를 이용해서 예외처리도 가능
    }
    }