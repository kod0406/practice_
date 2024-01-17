package org.zerock.ch3_cookie.service;

import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.zerock.ch3_cookie.dao.MemberDAO;
import org.zerock.ch3_cookie.domain.MemberVO;
import org.zerock.ch3_cookie.dto.MemberDTO;
import org.zerock.ch3_cookie.util.MapperUtil;

@Log4j2

public enum MemberService {
    INSTANCE;
    private MemberDAO dao;
    private ModelMapper modelMapper;
    MemberService(){
        dao = new MemberDAO();
        modelMapper = MapperUtil.INSTANCE.get();
    }
    public MemberDTO login(String mid,String mpw)throws Exception{
        MemberVO vo = dao.getWithPassword(mid,mpw);
        MemberDTO memberDTO = modelMapper.map(vo,MemberDTO.class);
        return memberDTO;
    }
}
