## git에 프로젝트 올리기

- todo프로젝트 아래에 .gitignore 파일을 생성한다.

```
.classpath
.project
.settings
target

```

사용자마다 다른 값을 가질 수 있는 eclipse 프로젝트 설정 파일과 빌드한 내용이 저장되는 target 폴더를 .gitignore에 추가하여 형상관리 서버에 올라가지 못하도록 한다.

- github.com 에서 todo 프로젝트를 생성한다.(public 프로젝트로 생성)

```
echo "# todo" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/carami/todo.git
git push -u origin master
```

프로젝트를 생성하면 보통 위와 같은 메시지가 나온다.

- elcipse todo 프로젝트 안에서 다음과 같이 명령을 수행한다.

```
git init
git add *
git commit -m "first commit"
git remote add origin https://github.com/carami/todo.git
git push -u origin master
```

실제 명령 실행과 결과
```
480 carami:todo $ git init
Initialized empty Git repository in /DEVEL/eclipse_workspace/todo/.git/
481 carami:todo (master #)$ git add *
The following paths are ignored by one of your .gitignore files:
target
Use -f if you really want to add them.
482 carami:todo (master +)$ git commit -m "first commit"
[master (root-commit) 93163cd] first commit
 6 files changed, 200 insertions(+)
 create mode 100644 pom.xml
 create mode 100644 src/main/java/carami/todo/config/RootApplicationContextConfig.java
 create mode 100644 src/main/java/carami/todo/config/ServletContextConfig.java
 create mode 100644 src/main/java/carami/todo/controller/HelloController.java
 create mode 100644 src/main/webapp/WEB-INF/views/hello.jsp
 create mode 100644 src/main/webapp/WEB-INF/web.xml
483 carami:todo (master)$ git remote add origin https://github.com/carami/todo.git
484 carami:todo (master)$ git push -u origin master
Counting objects: 18, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (12/12), done.
Writing objects: 100% (18/18), 2.92 KiB | 0 bytes/s, done.
Total 18 (delta 0), reused 0 (delta 0)
To https://github.com/carami/todo.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
485 carami:todo (master)$
```

https://github.com/carami/todo 를 가보면 git에 올라가 있는 것을 확인할 수 있다.
물론, 이 예제를 따라하는 분들은 https://github.com/본인아이디/todo 로 확인을 해야합니다.

터미널로 git을 다루는 것은 불편하니, 여기까지 진행을 한 후에는 Source tree를 이용하여 관리하는 것을 추천합니다.
