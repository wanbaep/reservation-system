1. 톰캣설치
- https://tomcat.apache.org/download-80.cgi 에서 다운로드
- 압출풀기
- 톰캣디렉토리 아래 conf 디렉토리에 있는 server.xml 을 편집으로 열어주세요.  

```
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```
 필요에 따라 port 번호를 바꾸거나  URIEncoding 속성을 추가할 수 있습니다.  
 ```
 <Connector port="80" protocol="HTTP/1.1"
            connectionTimeout="20000"
            redirectPort="8443" URIEncoding="tuf-8"/>
 ```

2. 이클립스 설정
-  Window - Preferences 메뉴에서 Server - Runtime Environment를 선택 -> Add -> 1 에서 설치한 아파치 톰캣 서버 선택  - > Next -> 톰캣 서버가 설치된 폴더를 지정 -> Finish

- Dynamic Web Project  -> Project name 에 firstWeb -> target runtime 확인 -> Dynamic web module version 을 2.5 선택

3. Hello.html

4. Hello.jsp

5. HelloServlet.java 
