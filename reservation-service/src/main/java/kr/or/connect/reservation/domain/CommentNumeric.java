package kr.or.connect.reservation.domain;

import java.math.BigDecimal;

public class CommentNumeric {
	int count;
	BigDecimal avgScore;
	
	public CommentNumeric() {
		
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public BigDecimal getAvgScore() {
		return avgScore;
	}

	public void setAvgScore(BigDecimal avgScore) {
		this.avgScore = avgScore;
	}
	
	
}
