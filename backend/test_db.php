<?php
require_once "config.php"; // Kết nối database

// Test kết nối database
if ($db) {
    echo json_encode(["message" => "Kết nối database thành công!"]);
} else {
    echo json_encode(["message" => "Kết nối database thất bại!"]);
}
?>