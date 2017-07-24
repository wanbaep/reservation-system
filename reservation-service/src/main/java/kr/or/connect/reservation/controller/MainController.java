package kr.or.connect.reservation.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.connect.reservation.domain.Category;
import kr.or.connect.reservation.domain.User;
import kr.or.connect.reservation.service.CategoryService;
import kr.or.connect.reservation.service.UserService;

@Controller
@RequestMapping("/")
public class MainController {
	@Value("${naver.openapi.client-id}")
	String clientId;// 애플리케이션 클라이언트 아이디값";
	
	@Value("${naver.openapi.client-secret}")
	String clientSecret;// 애플리케이션 클라이언트 시크릿값";
	
	private final CategoryService categoryService;
	private final UserService service;
	
	@Autowired
	public MainController(UserService service, CategoryService categoryService) {
		this.service = service;
		this.categoryService = categoryService;
	}

	@GetMapping
	public ModelAndView mainPage(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView view = new ModelAndView("mainpage");
		HttpSession session = request.getSession();
		System.out.println("Session : " + session);
		System.out.println("Session.wanbaepServer : " + session.getAttribute("wanbaepServer"));
		System.out.println("client-id : " + clientId + "client-secret : " + clientSecret);
		String apiURL = null;

		String redirectURI = null;
		try {
			redirectURI = URLEncoder.encode("http://127.0.0.1:8080/loginconfirm", "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		SecureRandom random = new SecureRandom();
		String state = new BigInteger(130, random).toString();
		apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
		apiURL += "&client_id=" + clientId;
		apiURL += "&redirect_uri=" + redirectURI;
		apiURL += "&state=" + state;
		session.setAttribute("state", state);

		view.addObject("apiURL", apiURL);

		return view;
	}

	@GetMapping("/loginconfirm")
	public String loginCallback(HttpServletRequest request) {
		String code = request.getParameter("code");
		String state = request.getParameter("state");
		HttpSession session = request.getSession();
		
		//right callback case
		if (session.getAttribute("state").equals(state)){

			String redirectURI = null;
			try {
				redirectURI = URLEncoder.encode("http://127.0.0.1:8080/myreservation", "UTF-8");
			} catch (UnsupportedEncodingException e1) {
				e1.printStackTrace();
			}
			String apiURL;
			apiURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&";
			apiURL += "client_id=" + clientId;
			apiURL += "&client_secret=" + clientSecret;
			apiURL += "&redirect_uri=" + redirectURI;
			apiURL += "&code=" + code;
			apiURL += "&state=" + state;
			try {
				URL url = new URL(apiURL);
				HttpURLConnection con = (HttpURLConnection) url.openConnection();
				con.setRequestMethod("GET");
				int responseCode = con.getResponseCode();
				BufferedReader br;
				if (responseCode == 200) { // 정상 호출
					br = new BufferedReader(new InputStreamReader(con.getInputStream()));
				} else { // 에러 발생
					br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
				}
				String inputLine;
				StringBuffer res = new StringBuffer();
				while ((inputLine = br.readLine()) != null) {
					res.append(inputLine);
				}
				br.close();
				if (responseCode == 200) {
					Map<String, String> map = new HashMap<String, String>();
					map = convertJsonStringToStringMap(res.toString());

					// session을 저장
					session.setAttribute("access_token", map.get("access_token"));
					session.setAttribute("refresh_token", map.get("refresh_token"));
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			requireNaverUserInfo(session);
			return "redirect:/myreservation";
		} else {
			return "redirect:/";
		}
	}

	public void requireNaverUserInfo(HttpSession session) {
		String token = (String)session.getAttribute("access_token");
		String header = "Bearer " + token; // Bearer 다음에 공백 추가
		User validUser = null;
		
		try {
			String apiurl = "https://openapi.naver.com/v1/nid/me";
			URL url = new URL(apiurl);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", header);
			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) { // 정상 호출
				br = new BufferedReader(new InputStreamReader(con.getInputStream()));
			} else { // 에러 발생
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = br.readLine()) != null) {
				response.append(inputLine);
			}
			br.close();
			Map<String, Object> map = new HashMap<String, Object>();
			map = convertJsonStringToObjectMap(response.toString());
			
			@SuppressWarnings("unchecked")
			HashMap<String, Object> innerMap = (HashMap<String, Object>)map.get("response");
			
			String email = (String)innerMap.get("email");
			validUser = service.getUserByEmail(email);
			
			if(validUser == null){
				User user = makeUserByNaverUserInfo(innerMap);
				service.insertUser(user);
				validUser = user;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		session.setAttribute("wanbaepServer", validUser);	//save session infomation with session name
	}
	
	@GetMapping("/myreservation")
	public String myreservationPage(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		if(session.getAttribute("wanbaepServer") != null){
			return "myreservation";
		} else{
			return "mainpage";
		}
	}

	@GetMapping("/detail/{id}")
	public String detailPage(@PathVariable("id") int productId) {
		return "detail";
	}

	// just register controller for every page
	@GetMapping("/reserve/{id}")
	public ModelAndView reservePage(@PathVariable("id") int productId) {
		ModelAndView view = new ModelAndView("reserve");
		
		return view;
	}

	@GetMapping("/review")
	public String reviewPage() {
		return "review";
	}

	@GetMapping("/reviewWrite")
	public String reviewWritePage() {
		return "reviewWrite";
	}
	
	@GetMapping("/categories")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws Exception{
		List<Category> categoryList = categoryService.getAll();
		ModelAndView view = new ModelAndView("index");
		view.addObject("category", categoryList);
		
		return view;
	}
	
	public User makeUserByNaverUserInfo(HashMap<String, Object> naverUserMap){
		User user = new User();
		user.setUsername((String)naverUserMap.get("name"));
		user.setEmail((String)naverUserMap.get("email"));
		user.setTel(null);
		user.setNickname((String)naverUserMap.get("nickname"));
		user.setSnsId((String)naverUserMap.get("id"));
		user.setSnsType("naver");
		user.setSnsProfile((String)naverUserMap.get("profile_image"));
		user.setAdminFlag(0);
		user.setCreateDate(new Date());
		user.setModifyDate(new Date());
		
		return user;
	}

	public Map<String, String> convertJsonStringToStringMap(String input) {
		Map<String, String> map = new HashMap<String, String>();
		ObjectMapper mapper = new ObjectMapper();

		try {
			map = mapper.readValue(input, new TypeReference<Map<String, String>>() {
			});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return map;
	}

	public Map<String, Object> convertJsonStringToObjectMap(String input) {
		Map<String, Object> map = new HashMap<String, Object>();
		ObjectMapper mapper = new ObjectMapper();

		try {
			map = mapper.readValue(input, new TypeReference<Map<String, Object>>() {
			});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return map;
	}
}
