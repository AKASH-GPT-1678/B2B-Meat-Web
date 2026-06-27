package com.meatbackend.backend.service;

import java.awt.image.BufferedImage;
public interface QRService {

    BufferedImage generateQRCode(String url) throws Exception;
}
