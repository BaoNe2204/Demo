document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./templates/header.html"); // Tải header.html
        const html = await response.text();
        document.querySelector("#header").outerHTML = html;

        // Đợi header tải xong, rồi gán sự kiện click
        setTimeout(() => {
            attachEventListeners();
        }, 500);
    } catch (error) {
        console.error("❌ Lỗi tải header.html:", error);
    }
});

// Gán sự kiện click cho nút Đăng Ký và Đăng Nhập
function attachEventListeners() {
    const registerBtn = document.querySelector("#open-register");
    const loginBtn = document.querySelector("#open-login");

    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            console.log("✅ Chuyển hướng đến trang đăng ký...");
            window.location.href = "/webdemo/templates/LoginRegister.html";
        });
    } else {
        console.error("❌ Không tìm thấy nút Đăng Ký!");
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            console.log("✅ Chuyển hướng đến trang đăng nhập...");
            window.location.href = "/webdemo/templates/LoginRegister.html";
        });
    } else {
        console.error("❌ Không tìm thấy nút Đăng Nhập!");
    }
}
