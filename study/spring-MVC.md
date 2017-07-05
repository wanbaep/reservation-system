1. maven 프로젝트 생성

1) new - project -> maven - maven project -> next 버튼 클릭
   -> Create a simple project 선택, use default workspace location 선택 -> next 버튼 클릭
   -> goal id : carami (보통 도메인 이름을 거꾸로 적음)
      Artifact id : todo (프로젝트 이름을 보통 소문자로 씀)
      packaging : war (웹 어플리케이션 프로젝트니깐) -> finish 버튼 클릭
2) 처음 프로젝트를 생성하면 프로젝트에 오류표시가 납니다.
   웹 어플리케이션인데 필요한 파일이 존재하지 않기 때문입니다.
   참고로 maven은 기본설정이 jdk 1.5 로 되어 있습니다.
   problems 부분에서 maven - update project를 하라는 메시지가 있다면, 이클립스에서 프로젝트를 선택 후에 우측버튼을 클릭하고 maven - udpate project를 선택합니다.
   maven 프로젝트의 설정파일은 pom.xml 입니다. 해당 파일을 다음과 같이 수정합니다.


Spring mvc 를 사용하기 위한 pom.xml

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>carami</groupId>
	<artifactId>todo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>

	<properties>
		<jdk-version>1.8</jdk-version>
		<source-encoding>UTF-8</source-encoding>
		<resource-encoding>UTF-8</resource-encoding>
		<deploy-path>deploy</deploy-path>

		<!-- spring framework -->
		<spring-framework.version>4.3.5.RELEASE</spring-framework.version>

		<logback.version>1.1.3</logback.version>
		<jcl.slf4j.version>1.7.12</jcl.slf4j.version>

	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring-framework.version}</version>
		</dependency>

		<!--Servlet -->
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>
		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>3.1.0</version>
			<scope>provided</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.3</version>
				<configuration>
					<source>${jdk-version}</source>
					<target>${jdk-version}</target>
					<encoding>${source-encoding}</encoding>
					<useIncrementalCompilation>false</useIncrementalCompilation>
				</configuration>
			</plugin>

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-clean-plugin</artifactId>
				<version>2.6.1</version>
			</plugin>

			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<version>2.2</version>
				<configuration>
					<port>8080</port>
					<path>/</path>
				</configuration>
			</plugin>

		</plugins>
	</build>

</project>
```

src/main/java 아래에 carami.todo.config 패키지를 생성합니다.

```
package carami.todo.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RootApplicationContextConfig {
}
```
```
public class WebInitializer implements WebApplicationInitializer {
    private static final String CONFIG_LOCATION = "carami.todo.config";
    private static final String MAPPING_URL = "/";

    public WebInitializer(){

    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        WebApplicationContext context = getContext();


        // encoding filter 설정
        EnumSet<DispatcherType> dispatcherTypes = EnumSet.of(DispatcherType.REQUEST, DispatcherType.FORWARD);

        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);

        FilterRegistration.Dynamic characterEncoding = servletContext.addFilter("characterEncoding", characterEncodingFilter);
        characterEncoding.addMappingForUrlPatterns(dispatcherTypes, true, "/*");

        // dispatchder servlet 설정
        servletContext.addListener(new ContextLoaderListener(context));
        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("DispatcherServlet", new DispatcherServlet(context));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping(MAPPING_URL);
    }
    private AnnotationConfigWebApplicationContext getContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.setConfigLocation(CONFIG_LOCATION);
        return context;
    }
}
```
```
package carami.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"carami.todo.controller"})
public class ServletContextConfig extends WebMvcConfigurerAdapter {
    @Bean
    public ViewResolver viewResolver() {
         InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }
}
```

carami.todo.controller 패키지를 생성합니다.

```
package carami.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by 강경미 on 2017. 6. 3..
 */
@Controller
public class HelloController {
    @GetMapping(path = "/")
    public String hello(Model model){
        return "hello";
    }

}
```

src/main/webapp/WEB-INF/views 폴더를 생성한다. 해당 폴더 안에 hello.jsp 를 작성한다.

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>hello</title>
</head>
<body>
<h1>Hello World</h1>
</body>
</html>
```

터미널을 실행한 후 해당 프로젝트 폴더로 이동한다. maven path설정을 하기 전에 연 터미널이라면 mvn이 실행이 안될 수 있다.
이때는 터미널을 닫았다가 다시 연다.

mvn clean install
mvn tomcat7:run

위와 같이 실행한 후 http://localhost:8080/ 을 브라우저로 연다. Hello가 출력되면 성공

아래는 mvn tomcat7:run을 했을때 나오는 화면. tomcat을 설치하지 않고 maven에 내장된 방식으로 실행할 수 있다.
어떤 값이 로그로 출력되었는지 살펴보도록 하자.
```
477 urstory:todo $ mvn tomcat7:run
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building todo 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] >>> tomcat7-maven-plugin:2.2:run (default-cli) > process-classes @ todo >>>
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ todo ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] Copying 0 resource
[INFO]
[INFO] --- maven-compiler-plugin:3.3:compile (default-compile) @ todo ---
[INFO] Nothing to compile - all classes are up to date
[INFO]
[INFO] <<< tomcat7-maven-plugin:2.2:run (default-cli) < process-classes @ todo <<<
[INFO]
[INFO] --- tomcat7-maven-plugin:2.2:run (default-cli) @ todo ---
[INFO] Running war on http://localhost:8080/
[INFO] Creating Tomcat server configuration at /DEVEL/eclipse_workspace/todo/target/tomcat
[INFO] create webapp with contextPath:
Jun 24, 2017 3:04:02 PM org.apache.coyote.AbstractProtocol init
정보: Initializing ProtocolHandler ["http-bio-8080"]
Jun 24, 2017 3:04:02 PM org.apache.catalina.core.StandardService startInternal
정보: Starting service Tomcat
Jun 24, 2017 3:04:02 PM org.apache.catalina.core.StandardEngine startInternal
정보: Starting Servlet Engine: Apache Tomcat/7.0.47
Jun 24, 2017 3:04:04 PM org.apache.catalina.core.ApplicationContext log
정보: No Spring WebApplicationInitializer types detected on classpath
Jun 24, 2017 3:04:04 PM org.apache.catalina.core.ApplicationContext log
정보: Initializing Spring root WebApplicationContext
Jun 24, 2017 3:04:04 PM org.springframework.web.context.ContextLoader initWebApplicationContext
정보: Root WebApplicationContext: initialization started
Jun 24, 2017 3:04:04 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext prepareRefresh
정보: Refreshing Root WebApplicationContext: startup date [Sat Jun 24 15:04:04 KST 2017]; root of context hierarchy
Jun 24, 2017 3:04:04 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext loadBeanDefinitions
정보: Successfully resolved class for [carami.todo.config.RootApplicationContextConfig]
Jun 24, 2017 3:04:04 PM org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor <init>
정보: JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
Jun 24, 2017 3:04:04 PM org.springframework.web.context.ContextLoader initWebApplicationContext
정보: Root WebApplicationContext: initialization completed in 376 ms
Jun 24, 2017 3:04:04 PM org.apache.catalina.core.ApplicationContext log
정보: Initializing Spring FrameworkServlet 'dispatcher'
Jun 24, 2017 3:04:04 PM org.springframework.web.servlet.DispatcherServlet initServletBean
정보: FrameworkServlet 'dispatcher': initialization started
Jun 24, 2017 3:04:04 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext prepareRefresh
정보: Refreshing WebApplicationContext for namespace 'dispatcher-servlet': startup date [Sat Jun 24 15:04:04 KST 2017]; parent: Root WebApplicationContext
Jun 24, 2017 3:04:04 PM org.springframework.web.context.support.AnnotationConfigWebApplicationContext loadBeanDefinitions
정보: Successfully resolved class for [carami.todo.config.ServletContextConfig]
Jun 24, 2017 3:04:04 PM org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor <init>
정보: JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
Jun 24, 2017 3:04:05 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping register
정보: Mapped "{[/],methods=[GET]}" onto public java.lang.String carami.todo.controller.HelloController.hello(org.springframework.ui.Model)
Jun 24, 2017 3:04:05 PM org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter initControllerAdviceCache
정보: Looking for @ControllerAdvice: WebApplicationContext for namespace 'dispatcher-servlet': startup date [Sat Jun 24 15:04:04 KST 2017]; parent: Root WebApplicationContext
Jun 24, 2017 3:04:05 PM org.springframework.web.servlet.DispatcherServlet initServletBean
정보: FrameworkServlet 'dispatcher': initialization completed in 673 ms
Jun 24, 2017 3:04:05 PM org.apache.coyote.AbstractProtocol start
정보: Starting ProtocolHandler ["http-bio-8080"]

```



## XML 파일로 작성할 경우 예


web.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>springMVCExam</display-name>

 <context-param>
 	<param-name>contextConfigLocation</param-name>
 	<param-value>classpath:/applicationContext.xml</param-value>
 </context-param>
  <listener>
  	<listener-class>
  		org.springframework.web.context.ContextLoaderListener
  	</listener-class>
  </listener>
  <filter>
		<filter-name>encodingFilter</filter-name>
		<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>encodingFilter</filter-name>
		<url-pattern>/*</url-pattern>
	</filter-mapping>

  <servlet>
  	<servlet-name>action</servlet-name>
  	<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  	<init-param>
  		<param-name>contextConfigLocation</param-name>
  		<param-value>WEB-INF/config/spring-mvc-config.xml</param-value>
  	</init-param>
  </servlet>
  <servlet-mapping>
  	<servlet-name>action</servlet-name>
  	<url-pattern>*.sku</url-pattern>
  </servlet-mapping>



  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```

spring-mvc-config.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	<context:component-scan base-package="kr.ac.skuniv.controller" />

	<bean id="viewResolver"
      class="org.springframework.web.servlet.view.UrlBasedViewResolver">
   	 <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
   	 <property name="prefix" value="/jsp/"/>
   	 <property name="suffix" value=".jsp"/>

</bean>

</beans>
```
