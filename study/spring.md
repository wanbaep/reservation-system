# IoC

## Bean factory & ApplicationContext

### Bean Factory

- 단순 컨테이너, 객체 생성 및 DI 처리


### ApplicationContext

- Bean Factory 기능 + α
- Annotation
- 스프링 설정
- 트렌젝션 관리
- 메시지 처리등등의 다양한 부가 가능


### ApplicationContext를 이용하여 String문자열 값 읽어오기
1. xml 설정파일에 직접 등록

/src/main/resources/applicationContext.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="name" class="java.lang.String">
        <constructor-arg value="carami"/>
    </bean>
</beans>
```

/src/main/java
에 carami.spring.core.examples 패키지 아래의 SpringApplication.java

```
package carami.spring.core.examples;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringApplication {

    private static final String CONTEXT_PATH = "applicationContext.xml";

    public static void main(String args[]) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(CONTEXT_PATH);
        String name = (String)context.getBean("name");

        System.out.println("name : " + name);

        context.close();
    }
}

```

2.  자바코드로 빈 등록하기
carami.spring.core.config 패키지 아래의 ApplicationContextConfig

java config를 이용하여 설정.

@Configuration 어노테이션이 붙어있으면 java config로 인식한다.
@ComponentScan 어노테이션을 이용하여 탐색할 package를 찾는다.

```
package carami.spring.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "carami.spring.core")
public class ApplicationContextConfig {
    @Bean
    public String name() {
        return "carami";
    }

}

```

/src/main/java
에 carami.spring.core.examples 패키지 아래의 SpringApplication.java

```
package carami.spring.core.examples;

import carami.spring.core.config.ApplicationContextConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringApplication {

    private static final String CONTEXT_PATH = "applicationContext.xml";

    public static void main(String args[]) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ApplicationContextConfig.class);
        String name = (String)context.getBean("name");

        System.out.println("name : " + name);

        context.close();
    }
}

```



```
    @Bean
    public String name() {
        return "carami";
    }
```
ApplicationContenxt는 필요한 모든 객체를 미리 생성해 놓는다.
@Bean이 붙어있는 메소드 이름이 name()이면 id값이 name으로 객체를 생성한다는 것을 의미한다. 해당 객체는 리턴하는 String객체이다.


### Setter Injection


1. xml 설정파일에 직접 등록

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="name" class="java.lang.String">
        <constructor-arg value="carami"/>
    </bean>

    <bean id="user1" class="carami.spring.core.examples.User">
        <property name="name" ref="name"/>
    </bean>

    <bean id="user2" class="carami.spring.core.examples.User">
        <property name="name" value="홍길동"/>
    </bean>
</beans>
```


user1의 경우 id="name"으로 설정된 정보의 레퍼런스로 값을 주입받고
user2의 경우 "홍길동" 값(value)을 직접 주입받았다.

```
// Bean클래스
public class User {

    // private하게 필드를 선언
    private String name;

    // 기본 생성자가 있어야 한다
    public User(){

    }

    // private한 필드를 접근하기 위한 seter, getter메소드가 있어야 한다.
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
```
package carami.spring.core.examples;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringApplication {

    private static final String CONTEXT_PATH = "applicationContext.xml";

    public static void main(String args[]) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(CONTEXT_PATH);
        User user1 = (User)context.getBean("user1");
        System.out.println(user1.getName());

        User user2 = (User)context.getBean("user2");
        System.out.println(user2.getName());

        context.close();
    }
}

```

2.  자바코드로 빈 등록하기

```
package carami.spring.core.config;

import carami.spring.core.examples.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "carami.spring.core")
public class ApplicationContextConfig {
  @Bean
  public String name() {
      return "carami";
  }

  @Bean
  public User user1(String name) {
      User user = new User();
      user.setName(name);
      return user;
  }

  @Bean
  public User user2() {
      User user = new User();
      user.setName("홍길동");
      return user;
  }
}

```

id가 user1(메소드 이름) 으로 Bean을 등록한다. 이때 user1메소드의 파라미터로 name이 있는데, 해당 값은 위의 name()메소드가 반환한 값이 자동으로 들어간다.
즉 id가 name인 값을 자동으로 받는다는 것을 의미한다. 해당 빈의 값은 리턴하는 User객체를 의미한다.

id가 user2(메소드 이름) 으로 Bean을 등록한다. 해당 빈의 값은 리턴하는 User객체를 의미한다.


```
package carami.spring.core.examples;

import carami.spring.core.config.ApplicationContextConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringApplication {

  private static final String CONTEXT_PATH = "applicationContext.xml";

  public static void main(String args[]) {
      AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ApplicationContextConfig.class);
      User user1 = (User)context.getBean("user1");
      System.out.println(user1.getName());

      User user2 = (User)context.getBean("user2");
      System.out.println(user2.getName());
      context.close();
  }
}

```

id가 user1과 user2인 객체를 요청한다. 모두 User객체이며 해당 객체의 getName()값을 호출하여 값을 출력하면 아래와 같이 출력되는 것을 확인할 수 있다.

carami
홍길동


### Constructor Injection
```
    <bean id="user3" class="carami.spring.core.examples.User">
        <constructor-arg index="0" ref="name"/>
    </bean>

    <bean id="user4" class="carami.spring.core.examples.User">
        <constructor-arg index="0" value="홍길동"/>
    </bean>
```

constructor-arg 는 생성자를 이용하여 주입하라는 의미다. index="0"은 첫번째 파라미터에 name레퍼런스의 값을 설정하라는 것을 의미한다.


```


    @Bean
    public User user3(String name) {
        User user = new User(name);
        return user;
    }

    @Bean
    public User user4() {
        User user = new User("홍길동");
        return user;
    }
```

id가 user3으로 등록된 Bean은 User객체로 설정된다. 해당 User객체는 id가 name인 값을 받아들여 생성자에 값을 설정하여 반환하는 것을 알 수 있다.

## JUnit을 이용한 Test

JUnit을 사용하기 위해서 pom.xml에 추가.
```
          <!-- spring test -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>RELEASE</version>
        </dependency>
    </dependencies>
```

test코드 추가

```
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import carami.spring.core.config.ApplicationContextConfig;
import carami.spring.core.examples.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationContextConfig.class)
public class SpringTest {
	@Autowired
	User user1;

	@Test
	public void testUser(){
		System.out.println(user1.getName());
	}
}

```
