<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="/resources/css/style.css" rel="stylesheet" type="text/css">
<title>Reservation-System Administrator Category</title>
</head>
<body>
<h1>예약시스템 관리자 페이지</h1>
<h2>카테고리 목록</h2>
<hr>
<table class="category-list">
  <tr>
    <th>카테고리</th>
    <th></th>
    <th></th>
  </tr>
  <c:forEach var="x" items="${category}">
	<tr class="category" id="${ x.id }">
    <td class="col-4" id="cat">${ x.name }</td>
		<td class="col-4">
        <input type="text" id="update_val"/>
        <button class="update">수정</button>
    </td>
    <td class="col-4">
      <button class="delete">삭제</button>
    </td>
	</tr>
	</c:forEach>
</table>

<h2>카테고리 등록</h2>
<hr>
<form action="/categories/insert" method="post">
    <strong>등록 할 카테고리 명: </strong>
    <input type="text" name="name"/>
	  <input type="submit" value="생성"/>
</form>

<script src="/resources/js/jquery-3.2.1.min.js"></script>
<script src="/resources/js/app.js"></script>

</body>
</html>
