package org.zerock.ch3_cookie.controller;

import lombok.extern.log4j.Log4j2;
import org.zerock.ch3_cookie.dto.TodoDTO;
import org.zerock.ch3_cookie.service.TodoService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "todoReadController",value = "/todo/read")
@Log4j2
public class TodoReadController extends HttpServlet {
    private TodoService todoService = TodoService.INSTANCE;

    @Override
    protected void doGet(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
        try{
            Long tno = Long.parseLong(req.getParameter("tno"));
            TodoDTO todoDTO = todoService.get(tno);
            //모델 담기
            req.setAttribute("dto",todoDTO);
            //쿠키 찾기
            Cookie viewTodoCookie = findCookie(req.getCookies(),"viewTodos");
            String todoListStr = viewTodoCookie.getValue();
            boolean exist = false;
            if(todoListStr != null && todoListStr.indexOf(tno+"-")>=0){
                exist = true;
            }
            log.info("exist: "+ exist);
            if(!exist){
                todoListStr += tno+"-";
                viewTodoCookie.setValue(todoListStr);
                viewTodoCookie.setMaxAge(60*60*24);
                viewTodoCookie.setPath("/");
                resp.addCookie(viewTodoCookie);
            }
            //데이터 담기
            //req.setAttribute("dto",todoDTO);//이걸 빼먹었네;;
            req.getRequestDispatcher("WEB-INF/todo/read.jsp").forward(req,resp);
        }catch(Exception e){
            e.printStackTrace();
            log.error(e.getMessage());
            throw new ServletException("read error");
        }
    }
    private Cookie findCookie(Cookie[] cookies,String cookieName){
        Cookie targetCookie = null;
        if(cookies != null&& cookies.length >0){
            for(Cookie ck:cookies){
                if(ck.getName().equals(cookieName)){
                    targetCookie = ck;
                    break;
                }
            }
        }
        if (targetCookie == null) {
            targetCookie = new Cookie(cookieName,"");
            targetCookie.setPath("/");
            targetCookie.setMaxAge(60*60*24);
        }
        return targetCookie;
    }

}
