<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config.php"; // Kết nối database

// ✅ Kiểm tra kết nối database có tồn tại không
if (!isset($conn) || $conn->connect_error) {
    die(json_encode(["message" => "Lỗi kết nối database!"]));
}

// ✅ Đọc dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['name'], $data['email'], $data['password'])) {
    echo json_encode(["message" => "Vui lòng nhập đầy đủ thông tin!"]);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

// ✅ Kiểm tra email đã tồn tại chưa
$check_sql = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($check_sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["message" => "Email đã tồn tại!"]);
    exit;
}
$stmt->close();

// ✅ Chèn dữ liệu vào database
$insert_sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($insert_sql);
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["message" => "Đăng ký thành công!"]);
} else {
    echo json_encode(["message" => "Lỗi khi đăng ký!"]);
}

$stmt->close();
$conn->close();
?>