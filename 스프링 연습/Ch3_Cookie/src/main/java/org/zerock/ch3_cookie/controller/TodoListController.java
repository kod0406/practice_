package org.zerock.ch3_cookie.controller;

import lombok.extern.log4j.Log4j2;
import org.zerock.ch3_cookie.service.TodoService;
import org.zerock.ch3_cookie.dto.TodoDTO;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.io.IOException;

@WebServlet(name="todoListController",value = "/todo/list")
@Log4j2
public class TodoListController extends HttpServlet {
    private TodoService todoService = TodoService.INSTANCE;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException,IOException {
        log.info("todo list.........");
        ServletContext servletContext = req.getServletContext();
        log.info("appName: " + servletContext.getAttribute("appName"));
        try {
            List<TodoDTO> dtoList = todoService.listAll();
            req.setAttribute("dtoList",dtoList);
            req.getRequestDispatcher("WEB-INF/todo/list.jsp").forward(req,resp);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new ServletException("list error");
        }
    }
}
