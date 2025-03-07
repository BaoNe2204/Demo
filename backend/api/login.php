<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config.php"; // Kết nối database

// Kiểm tra kết nối database
if (!isset($conn) || $conn->connect_error) {
    die(json_encode(["message" => "Lỗi kết nối database!"]));
}

// Nhận dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['email'], $data['password'])) {
    echo json_encode(["message" => "Vui lòng nhập đầy đủ thông tin!", "success" => false]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);

$sql = "SELECT id, name, email, password FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "message" => "Đăng nhập thành công!",
            "success" => true,
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ]);
    } else {
        echo json_encode(["message" => "Mật khẩu không đúng!", "success" => false]);
    }
} else {
    echo json_encode(["message" => "Email không tồn tại!", "success" => false]);
}

$stmt->close();
$conn->close();
?>