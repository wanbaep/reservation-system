package kr.or.connect.reservation.domain;

import java.sql.Date;

public class User {
	int id;
	String username;
	String email;
	String tel;
	String nickname;
	String snsId;
	String snsType;
	String snsProfile;
	int adminFlag;
	Date createDate;
	Date modifyDate;
	
	public User(){
		
	}
	public User(int id){
		this.id = id;
	}
	public User(int id, String username){
		this.id = id;
		this.username = username;
	}
	public User(int id, String username, String email){
		this.id = id;
		this.username = username;
		this.email = email;
	}
	public User(int id, String username, String email, String tel){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
	}
	public User(int id, String username, String email, String tel, String nickname){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId, String snsType){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
		this.snsType = snsType;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId, String snsType, String snsProfile){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
		this.snsType = snsType;
		this.snsProfile = snsProfile;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId, String snsType, String snsProfile, int adminFlag){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
		this.snsType = snsType;
		this.snsProfile = snsProfile;
		this.adminFlag = adminFlag;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId, String snsType, String snsProfile, int adminFlag, Date createDate){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
		this.snsType = snsType;
		this.snsProfile = snsProfile;
		this.adminFlag = adminFlag;
		this.createDate = createDate;
	}
	public User(int id, String username, String email, String tel, String nickname, String snsId, String snsType, String snsProfile, int adminFlag, Date createDate, Date modifyDate){
		this.id = id;
		this.username = username;
		this.email = email;
		this.tel = tel;
		this.nickname = nickname;
		this.snsId = snsId;
		this.snsType = snsType;
		this.snsProfile = snsProfile;
		this.adminFlag = adminFlag;
		this.createDate = createDate;
		this.modifyDate = modifyDate;
	}
	
	
	
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getSnsId() {
		return snsId;
	}
	public void setSnsId(String snsId) {
		this.snsId = snsId;
	}
	public String getSnsType() {
		return snsType;
	}
	public void setSnsType(String snsType) {
		this.snsType = snsType;
	}
	public String getSnsProfile() {
		return snsProfile;
	}
	public void setSnsProfile(String snsProfile) {
		this.snsProfile = snsProfile;
	}
	public int getAdminFlag() {
		return adminFlag;
	}
	public void setAdminFlag(int adminFlag) {
		this.adminFlag = adminFlag;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	
	
}
