package kr.or.connect.reservation.service;

import kr.or.connect.reservation.domain.Files;

public interface FilesService {
	public Integer insertFiles(Files files);
	public Files getFilesById(Integer id);
}
