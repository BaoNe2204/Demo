document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");
    const registerButtons = document.getElementsByClassName('register-btn');
    const loginButtons = document.getElementsByClassName('login-btn');
    
    // Xử lý hiệu ứng chuyển đổi giữa đăng nhập và đăng ký
    registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    // 🟢 Kiểm tra URL để tự động mở đúng form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "register") {
        container.classList.add("right-panel-active"); // Hiện sẵn form đăng ký
    } else if (urlParams.get("action") === "login") {
        container.classList.remove("right-panel-active"); // Hiện sẵn form đăng nhập
    }

    // Xử lý đăng ký người dùng
    const registerForm = document.querySelector(".register-container form");
    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Ngăn form load lại trang

            let name = registerForm.querySelector("input[type='text']").value.trim();
            let email = registerForm.querySelector("input[type='email']").value.trim();
            let password = registerForm.querySelector("input[type='password']").value.trim();

            if (!name || !email || !password) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            let data = { name, email, password };

            try {
                let response = await fetch("http://localhost/webdemo/backend/api/register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                let result = await response.json(); // Dùng .json() thay vì .text() rồi JSON.parse()

                alert(result.message);

                if (result.message === "Đăng ký thành công!") {
                    container.classList.remove("right-panel-active");
                }
            } catch (error) {
                console.error("Lỗi kết nối API:", error);
                alert("Không thể kết nối đến server!");
            }
        });
    }

    // Xử lý đăng nhập người dùng
    const loginForm = document.querySelector(".login-container form");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            let email = loginForm.querySelector("input[type='email']").value.trim();
            let password = loginForm.querySelector("input[type='password']").value.trim();

            if (!email || !password) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            let data = { email, password };

            try {
                let response = await fetch("http://localhost/webdemo/backend/api/login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                let result = await response.json();
                alert(result.message);

                if (result.success) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    window.location.href = "/webdemo/index.html"; // Quay về index
                }
               
            } catch (error) {
                console.error("Lỗi:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        });
    }
});
