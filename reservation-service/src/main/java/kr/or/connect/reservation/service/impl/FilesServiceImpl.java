package kr.or.connect.reservation.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reservation.dao.FilesDao;
import kr.or.connect.reservation.domain.Files;
import kr.or.connect.reservation.service.FilesService;

@Service
public class FilesServiceImpl implements FilesService {
	@Autowired
	FilesDao filesDao;
	
	@Override
	@Transactional(readOnly = true)
	public Integer insertFiles(Files files) {
		// TODO Auto-generated method stub
		return filesDao.insert(files);
	}

	@Override
	@Transactional(readOnly = false)
	public Files getFilesById(Integer id) {
		return filesDao.selectFileById(id);
	}

}
