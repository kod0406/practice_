package org.zerock.ch3_cookie.controller;

import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/login")
@Log
public class LoginController extends HttpServlet{
    protected void doGet(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
        log.info("login get...........");
        req.getRequestDispatcher("/todo/login.jsp").forward(req,resp);
    }
    @Override
    protected void doPost(HttpServletRequest req,HttpServletResponse resp) throws ServletException,IOException{
        log.info("login post.....");
        String mid = req.getParameter("mid");
        String mpw = req.getParameter("mpw");
        String str = mid+mpw;
        HttpSession session = req.getSession();
        session.setAttribute("loginInfo",str);
        resp.sendRedirect("/todo/list");
    }
}
