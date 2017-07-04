1. maven 설치

- IDE( eclipse , intelliJ 등)에 기본 내장되어 있을 수 있으나 터미널에서 독립적으로 실행할 수 있도록 설치를 한다.
- https://maven.apache.org/download.cgi 에서 다운로드
  - 이 글을 쓰는 시점에서는 가장 최신 버전인인 apache-maven-3.5.0-bin.tar.gz 를 다운로드 한다.
  - 특정 폴더에 압축을 해제한다.  /boost/apache-maven-3.3.9 로 압축을 해제한다.
  - path에 /boost/apache-maven-3.3.9/bin 을 추가한다.
  - 터미널을 새롭게 열고 mvn -v 명령으로 명령이 실행되는지 확인한다.

  2. maven 프로젝트 생성

  1) Eclipse를 실행한다.
  2) new - project -> maven - maven project -> next 버튼 클릭
     -> Create a simple project 선택, use default workspace location 선택 -> next 버튼 클릭
     -> goal id : carami (보통 도메인 이름을 거꾸로 적음)
        Artifact id : todo (프로젝트 이름을 보통 소문자로 씀)
        packaging : war (웹 어플리케이션 프로젝트니깐) -> finish 버튼 클릭
  3) 처음 프로젝트를 생성하면 프로젝트에 오류표시가 납니다.
     웹 어플리케이션인데 필요한 파일이 존재하지 않기 때문입니다.
     참고로 maven은 기본설정이 jdk 1.5 로 되어 있습니다.
     problems 부분에서 maven - update project를 하라는 메시지가 있다면, 이클립스에서 프로젝트를 선택 후에 우측버튼을 클릭하고 maven - udpate project를 선택합니다.
     maven 프로젝트의 설정파일은 pom.xml 입니다. 해당 파일을 다음과 같이 수정합니다.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>carami/groupId>
    <artifactId>todo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <jdk-version>1.8</jdk-version>
        <source-encoding>UTF-8</source-encoding>
        <resource-encoding>UTF-8</resource-encoding>

        <!-- spring framework -->
        <spring-framework.version>4.3.5.RELEASE</spring-framework.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring-framework.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
            <version>${spring-framework.version}</version>
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
        </plugins>
    </build>
</project>

```
