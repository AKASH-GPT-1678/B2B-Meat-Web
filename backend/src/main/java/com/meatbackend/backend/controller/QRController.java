package com.meatbackend.backend.controller;

import com.meatbackend.backend.service.QRService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

@RestController
@RequestMapping("/qr")
public class QRController {

    @Autowired
    private QRService qrService;


    @GetMapping("generate")
    public void generateQR(
            @RequestParam String url,
            HttpServletResponse response
    ) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();




        BufferedImage qrImage = qrService.generateQRCode(url);

        response.setContentType("image/png");
        ImageIO.write(qrImage, "PNG", response.getOutputStream());


    }
}
