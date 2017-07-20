package kr.or.connect.reservation.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;

@RestController
@RequestMapping("/api/map")
public class NaverMapApiController {
	/*
	 * 1. naver Map 에 대한 ajax 요청을 받을 controller 작성
	 * 2. controller에서 장소값을 parsing해서 naver api에 좌표를 얻기위해 전송할 request 작성
	 * 3. 장소에 대한 정보를 받는다. response
	 * 4. response의 좌표 정보를 받고 naver api에 좌표값을 request에 넣어서 전송
	 * 5. naver에서 받아온 지도 image정보를 client의 response에 write
	 */
	//Client ID : AiZisW993TeCGaS7Wq87
	//Client secret : 3oLOkvQf_Q
	
	@SuppressWarnings("null")
	@GetMapping("/{location}")
	public Map<String,Object> getCoordinateByLocation(@PathVariable("location") String location){
		String encodedUrl = null;
		try {
			encodedUrl = URLEncoder.encode(location,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String url = "https://openapi.naver.com/v1/map/geocode?encoding=utf-8&corrdType=latlng&query=" + encodedUrl;
		String clientId = "0SU9kz8vk5Px8rf1NS4C";
		String clientSecret = "qlPPE8k9Ls";
		String registeredUrl = "http://localhost:8080";
		
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet request = new HttpGet(url);
		request.setHeader("Content-Type", "application/json; utf-8");
		request.addHeader("X-Naver-Client-Id",clientId);
		request.addHeader("X-Naver-Client-Secret",clientSecret);
		JSONObject json = null;
		try {
			HttpResponse response1 = client.execute(request);
			response1.setHeader("Content-Type","application/json");
			@SuppressWarnings("deprecation")
			JSONParser parser = new JSONParser();
			json = (JSONObject) parser.parse(response1.getEntity().getContent());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("location", json.get("result"));
		
		return result;
		
/*		url = "https://openapi.naver.com/v1/map/staticmap.bin?clientId="+clientId
				+ "&url="+registeredUrl
				+ "&crs=EPSG:4326"
				+ "&center=127.0285843,37.4970645"
				+ "&level=12"
				+ "&w=300&h=300"
				+ "&baselayer=default"
				+ "&markers=127.0285843,37.4970645";
		
		HttpClient client2 = HttpClientBuilder.create().build();
		
		HttpGet request2 = new HttpGet(url);
		request2.setHeader("Content-Type", "image/png");
		InputStream input = null;
		try {
			HttpResponse response2 = client2.execute(request2);
			input = response2.getEntity().getContent();
						
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("image/png"));
		headers.add("Content-Transfer-Encoding", "base64");
		headers.add("Accept-Ranges", "bytes");
		
		ResponseEntity<InputStreamResource> response = new ResponseEntity<InputStreamResource>(
			    new InputStreamResource(input), headers, HttpStatus.OK);
		return response;
		*/
	}
	
	
}
