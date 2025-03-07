document.addEventListener("DOMContentLoaded", function () {
    const openRegisterBtn = document.getElementById("open-register"); // Nút mở modal
    const header = document.getElementById("header");

    if (openRegisterBtn && header) {
        openRegisterBtn.addEventListener("click", function () {
            const template = document.getElementById("register-modal");
            if (template) {
                const modalContent = template.content.cloneNode(true);
                modalContent.querySelector("#register-btn").addEventListener("click", handleRegister);
                header.appendChild(modalContent);
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const openRegisterBtn = document.getElementById("open-register");

    if (openRegisterBtn) {
        openRegisterBtn.addEventListener("click", openRegister);
    } else {
        console.error("❌ Không tìm thấy nút đăng ký!");
    }
});


function handleRegister() {
    let name = document.getElementById("register-name").value.trim();
    let email = document.getElementById("register-email").value.trim();
    let password = document.getElementById("register-password").value;
    let cpassword = document.getElementById("register-cpassword").value;

    if (!name || !email || !password || !cpassword) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (password !== cpassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    let data = { name, email, password };

    fetch("http://localhost/webdemo/backend/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            if (result.message === "Đăng ký thành công!") {
                document.querySelector(".register-modal").remove(); // Ẩn modal sau khi đăng ký thành công
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        });
}
