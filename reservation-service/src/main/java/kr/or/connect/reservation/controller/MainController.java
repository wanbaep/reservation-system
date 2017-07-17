package kr.or.connect.reservation.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.connect.reservation.domain.User;
import kr.or.connect.reservation.service.UserService;

@Controller
@RequestMapping("/")
public class MainController {
	private final UserService service;
	
	@Autowired
	public MainController(UserService service){
		this.service = service;
	}
		
	@GetMapping
	public String mainPage(){
		return "mainpage";
	}
	
	@GetMapping("/myreservation")
	public String myreservationPage(HttpServletRequest request, HttpServletResponse response){
		
		HttpSession session = request.getSession();
		
		User user = (User)session.getAttribute("wanbaeSession");
		if(user != null){
			return "myreservation";
		} else{
			return "loginForm";
		}
		
		
	}
	
	@GetMapping("/login")
	public String loginPage(){
		return "loginForm";
	}
	
	@PostMapping("/login/confirm")
	public String loginConfirm(HttpServletRequest request, HttpServletResponse response){
		Integer id = Integer.parseInt(request.getParameter("id"));
		String name = request.getParameter("name");
		HttpSession session = request.getSession();
		
		User user = new User();
		user = service.getUserById(id);
		
		if(user != null && user.getUsername().equals(name)){
			session.setAttribute("wanbaeSession", user);
			System.out.println(request.getContextPath());
			System.out.println(request.getPathInfo());
			return "myreservation";
		} else{
			return "redirect:/";
		}
	}
	
	@GetMapping("/detail/{id}")
	public String detailPage(@PathVariable("id") int categoryId){
		return "detail";
	}
	
	//just register controller for every page
	@GetMapping("/reserve")
	public String reservePage(){
		return "reserve";
	}
	
	@GetMapping("/review")
	public String reviewPage(){
		return "review";
	}
	
	@GetMapping("/reviewWrite")
	public String reviewWritePage(){
		return "reviewWrite";
	}
}
