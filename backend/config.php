<?php
$servername = "localhost";
$username = "root";  // Nếu bạn dùng XAMPP, tài khoản mặc định là "root"
$password = "";      // Mặc định XAMPP không có mật khẩu
$database = "webdemo"; // Đảm bảo tên database đúng

// ✅ Kết nối database
$conn = new mysqli($servername, $username, $password, $database);

// ✅ Kiểm tra kết nối
if ($conn->connect_error) {
    die(json_encode(["message" => "Lỗi kết nối database!"]));
}
?>
