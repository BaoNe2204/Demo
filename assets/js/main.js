// Hàm load nội dung từ file và lưu vào localStorage
function load(selector, path) {
    const cached = localStorage.getItem(path);
    if (cached) {
        document.querySelector(selector).innerHTML = cached;
    }

    fetch(path)
        .then((res) => res.text())
        .then((html) => {
            if (html !== cached) {
                document.querySelector(selector).innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .catch((error) => {
            console.error("Error loading the file:", error);
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

// Khởi chạy Swiper sau khi header load xong
window.addEventListener("template-loaded", function () {
    console.log("Header đã load xong, khởi chạy Swiper...");

    if (document.querySelector(".swiper")) {
        new Swiper(".swiper", {
            loop: true,
            autoplay: {
                delay: 3000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    } else {
        console.error("Không tìm thấy slider!");
    }
});

// Khởi tạo modal đăng nhập với Popzy sau khi header load xong
document.addEventListener("DOMContentLoaded", function () {
    if (typeof Popzy === "undefined") {
        console.error("❌ Lỗi: Popzy chưa được định nghĩa! Kiểm tra file popzy.js.");
        return;
    }

    window.addEventListener("template-loaded", function () {
        const loginBtn = document.getElementById("open-login");
        if (!loginBtn) {
            console.warn("⚠️ Không tìm thấy nút đăng nhập #open-login!");
            return;
        }

        const loginPopup = new Popzy({
            templateId: "login-modal",
            cssClass: ["custom-modal"],
            closeMethods: ["button", "overlay", "escape"],
        });

        loginBtn.addEventListener("click", function () {
            loginPopup.open();
        });

        console.log("✅ Modal đăng nhập đã được khởi tạo!");
    });
});

// Chạy hàm Info() khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function() {
    Info();  // Tự động gọi Info() khi trang tải xong
});

// Hàm Info() kiểm tra và hiển thị thông tin người dùng
function Info() {
    const user = JSON.parse(localStorage.getItem("user"));  // Lấy thông tin người dùng từ localStorage
    const userInfo = document.getElementById("user-info");  // Phần tử hiển thị thông tin người dùng
    const registerBtn = document.getElementById("open-register");  // Nút đăng ký
    const loginBtn = document.getElementById("open-login");  // Nút đăng nhập
    const logoutBtn = document.getElementById("logout-btn");  // Nút đăng xuất

    // Kiểm tra nếu các phần tử không tồn tại trong DOM
    if (!registerBtn || !loginBtn || !logoutBtn) {
        console.error("🔴 Một hoặc nhiều phần tử không tồn tại trong DOM.");
        return;  // Dừng lại nếu không tìm thấy phần tử
    }
    
    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (user && user.name) {
        console.log("🔹 Đã đăng nhập:", user); // Debug
        userInfo.textContent = `Chào, ${user.name}`; // Hiển thị tên người dùng
        registerBtn.style.display = "none";  // Ẩn nút đăng ký
        loginBtn.style.display = "none";  // Ẩn nút đăng nhập
        logoutBtn.style.display = "inline-block";  // Hiển thị nút đăng xuất
    } else {
        console.log("🔹 Chưa đăng nhập!"); // Debug
        userInfo.textContent = "Chào, khách hàng!"; // Thông báo người dùng chưa đăng nhập
        registerBtn.style.display = "inline-block";  // Hiển thị nút đăng ký
        loginBtn.style.display = "inline-block";  // Hiển thị nút đăng nhập
        logoutBtn.style.display = "none";  // Ẩn nút đăng xuất
    }
}
