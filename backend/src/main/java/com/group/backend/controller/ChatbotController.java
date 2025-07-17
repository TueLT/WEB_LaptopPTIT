package com.group.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        String reply = processMessage(userMessage);
        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return response;
    }

    private String processMessage(String message) {
        String lowerMsg = message.toLowerCase();
        // Lời chào hỏi
        if (lowerMsg.contains("xin chào") || lowerMsg.contains("hello")) {
            return "Xin chào bạn. Rất vui được phục vụ bạn!";
        }

        // Câu hỏi về sản phẩm
        if (lowerMsg.contains("hiện tại cửa hàng có bao nhiêu sản phẩm") || lowerMsg.contains("cửa hàng có bao nhiêu sản phẩm")) {
            return "Hiện tại cửa hàng có 50 sản phẩm đang được bán.";
        }

        // Địa chỉ cửa hàng
        if (lowerMsg.contains("địa chỉ") || lowerMsg.contains("shop ở đâu") || lowerMsg.contains("cửa hàng ở đâu")) {
            return "Địa chỉ của cửa hàng là: Mộ Lao, Hà Đông, Hà Nội.";
        }

        // Chính sách vận chuyển
        if (lowerMsg.contains("cơ chế vận chuyển như thế nào?") || lowerMsg.contains("giao hàng có nhanh hay không?")) {
            return "Chúng tôi hỗ trợ giao hàng toàn quốc trong vòng 3-5 ngày làm việc.";
        }

        // Chính sách đổi trả, bảo hành
        if (lowerMsg.contains("đổi trả") || lowerMsg.contains("chính sách bảo hành")) {
            return "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi và bảo hành trong 12 tháng.";
        }

        // Câu hỏi mua hàng
        if (lowerMsg.contains("tôi muốn đặt mua hàng") || lowerMsg.contains("mua")) {
            return "Bạn có thể tìm kiếm và đặt mua sản phẩm tại trang cửa hàng của chúng tôi.";
        }

        // Câu hỏi liên hệ
        if (lowerMsg.contains("liên hệ") || lowerMsg.contains("số điện thoại")) {
            return "Bạn có thể liên hệ với chúng tôi qua số điện thoại: 0988606878.";
        }

        if (lowerMsg.contains("dell inspiron giá bao nhiêu")) {
            return "Dell Inspiron có giá dao động từ 15 đến 25 triệu tùy cấu hình.";
        }
        if (lowerMsg.contains("asus vivobook tốt không")) {
            return "Asus VivoBook là dòng laptop phổ thông, phù hợp cho sinh viên và nhân viên văn phòng.";
        }
        if (lowerMsg.contains("acer swift 3 dùng có bền không")) {
            return "Acer Swift 3 có thiết kế mỏng nhẹ và độ bền khá tốt trong tầm giá.";
        }
        if (lowerMsg.contains("dell xps chơi game được không")) {
            return "Dell XPS có thể chơi game nhẹ, nhưng không phải là dòng máy chuyên game.";
        }
        if (lowerMsg.contains("asus tuf gaming có mạnh không")) {
            return "Asus TUF Gaming là dòng laptop tầm trung chơi game tốt, tản nhiệt ổn.";
        }
        if (lowerMsg.contains("acer aspire phù hợp cho ai")) {
            return "Acer Aspire phù hợp cho học sinh, sinh viên và người dùng văn phòng.";
        }
        if (lowerMsg.contains("dell latitude dùng cho doanh nhân")) {
            return "Dell Latitude là dòng laptop cao cấp cho doanh nhân, thiết kế chắc chắn.";
        }
        if (lowerMsg.contains("Asus Zenbook pin có lâu không")) {
            return "Asus ZenBook có pin khá tốt, dùng được khoảng 8-10 tiếng tùy cấu hình.";
        }
        if (lowerMsg.contains("acer nitro 5 chiến game thế nào")) {
            return "Acer Nitro 5 là một trong những dòng laptop chơi game phổ biến, hiệu năng tốt.";
        }
        if (lowerMsg.contains("Dell có bảo hành mấy năm")) {
            return "Hầu hết laptop Dell được bảo hành chính hãng 1-2 năm.";
        }

        if (lowerMsg.contains("dell inspiron giá bao nhiêu")) {
            return "Dell Inspiron có giá dao động từ 15 đến 25 triệu tùy cấu hình.";
        }
        if (lowerMsg.contains("asus vivobook tốt không")) {
            return "Asus VivoBook là dòng laptop phổ thông, phù hợp cho sinh viên và nhân viên văn phòng.";
        }
        if (lowerMsg.contains("acer swift 3 dùng có bền không")) {
            return "Acer Swift 3 có thiết kế mỏng nhẹ và độ bền khá tốt trong tầm giá.";
        }
        if (lowerMsg.contains("dell xps chơi game được không")) {
            return "Dell XPS có thể chơi game nhẹ, nhưng không phải là dòng máy chuyên game.";
        }
        if (lowerMsg.contains("asus tuf gaming có mạnh không")) {
            return "Asus TUF Gaming là dòng laptop tầm trung chơi game tốt, tản nhiệt ổn.";
        }
        if (lowerMsg.contains("acer aspire phù hợp cho ai")) {
            return "Acer Aspire phù hợp cho học sinh, sinh viên và người dùng văn phòng.";
        }
        if (lowerMsg.contains("dell latitude dùng cho doanh nhân")) {
            return "Dell Latitude là dòng laptop cao cấp cho doanh nhân, thiết kế chắc chắn.";
        }
        if (lowerMsg.contains("asus zenbook pin có lâu không")) {
            return "Asus ZenBook có pin khá tốt, dùng được khoảng 8-10 tiếng tùy cấu hình.";
        }
        if (lowerMsg.contains("Acer nitro 5 chiến game thế nào")) {
            return "Acer Nitro 5 là một trong những dòng laptop chơi game phổ biến, hiệu năng tốt.";
        }
        if ( lowerMsg.contains("dell có bảo hành mấy năm") || lowerMsg.contains("dell có mấy năm bảo hành") ) {
            return "Hầu hết laptop Dell được bảo hành chính hãng 1-2 năm.";
        }

        if (lowerMsg.contains("máy tính phù hợp nhất cho học tập văn phòng trong của hàng của bạn") || lowerMsg.contains("máy tính học tập văn phòng") ) {
            return "Cảm ơn câu hỏi của bạn. ";
        }

        if (lowerMsg.contains("dell inspiron 16 5630 giá bao nhiêu")) {
            return "Dell Inspiron 16 5630 có giá 18000000 vnd trong shop.";
        }

        if ( lowerMsg.contains("thông số của dell inspiron 16 ") || lowerMsg.contains("dell inspiron 16 thông số ") ) {
            return "Bạn vui lòng click chuột vào sản phẩm để biết thêm chi tiết.";
        }
        if (lowerMsg.contains("thông số của các máy là như thế nào") || lowerMsg.contains("thông số các máy") || lowerMsg.contains("thông số máy") ) {
            return "Bạn vui lòng click chuột vào sản phẩm để biết thêm chi tiết";
        }
        // Mặc định
        return "Rất tiếc câu hỏi bạn đưa ra nằm ngoài phạm vi của tôi.";
    }
}
