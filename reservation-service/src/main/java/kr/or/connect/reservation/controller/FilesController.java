package kr.or.connect.reservation.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.or.connect.reservation.domain.Files;
import kr.or.connect.reservation.service.FilesService;

@Controller
@RequestMapping("/files")
public class FilesController {
	@Value("${file.stored.location}")
	private String baseDir;
	
	FilesService service;

	@Autowired
	public FilesController(FilesService service){
		this.service = service;
	}

    @GetMapping
    public String fileform(){
        return "files";
    }

    @PostMapping
    public String create(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile[] files){

        if(files != null && files.length > 0){
            String formattedDate = baseDir + new SimpleDateFormat("yyyy" + File.separator + "MM" + File.separator + "dd").format(new Date());
            File f = new File(formattedDate);
            if(!f.exists()){
                f.mkdirs();
            }
            
            for(MultipartFile file : files) {
                String contentType = file.getContentType();
                String name = file.getName();
                String originalFilename = file.getOriginalFilename();
                long size = file.getSize();

                String uuid = UUID.randomUUID().toString();
                String saveFileName = formattedDate + File.separator + uuid;

                System.out.println("title :" + title);
                System.out.println("contentType :" + contentType);
                System.out.println("name :" + name);
                System.out.println("originalFilename : " + originalFilename);
                System.out.println("size : " + size);
                System.out.println("saveFileName : " + saveFileName);

                try(
                        InputStream in = file.getInputStream();
                        FileOutputStream fos = new FileOutputStream(saveFileName)){
                    int readCount = 0;
                    byte[] buffer = new byte[512];
                    while((readCount = in.read(buffer)) != -1){
                        fos.write(buffer,0,readCount);
                    }
                }catch(Exception ex){
                    ex.printStackTrace();
                }
            }
        }

        return "redirect:/files";
    }

    @GetMapping(path="/{id}")
    public void downloadReservationUserCommentImage(
            @PathVariable(name="id") Integer id,
            HttpServletResponse response){
    	
    	Files file = service.getFilesById(id);
    	
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getFileName() + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setHeader("Content-Type", file.getContentType());
        response.setHeader("Content-Length", ""+ file.getFileLength());
        response.setHeader("Pragma", "no-cache;");
        response.setHeader("Expires", "-1;");

        java.io.File readFile = new java.io.File(file.getSaveFileName());
        if(!readFile.exists()){ // 파일이 존재하지 않다면
            throw new RuntimeException("file not found");
        }

        FileInputStream fis = null;
        try{
            fis = new FileInputStream(readFile);
            FileCopyUtils.copy(fis, response.getOutputStream()); // 파일을 저장할때도 사용할 수 있다.
            response.getOutputStream().flush();
        }catch(Exception ex){
            throw new RuntimeException(ex);
        }finally {
            try {
                fis.close();
            }catch(Exception ex){
                // 아무것도 하지 않음 (필요한 로그를 남기는 정도의 작업만 함.)
            }
        }

    }

}
