// Init Auth Service
const auth = new AuthService();
// Init Message Module
const message = new Message();
message.init();

// Login UI
const form = document.forms["loginForm"];
const emailInput = form.elements["email"];
const passwordInput = form.elements["password"];
const resetPasswordForm = document.forms["resetPassword"];
const resEmail = resetPasswordForm.elements["res_email"];
const modalFormReset = document.querySelector(".reset-password-modal");
const modalBackdrop = document.querySelector("div .modal-backdrop");
// Login handler
function submitHandler(e) {
    e.preventDefault();

    const validation = new Validation(form);
    validation.init();

    if (!validation.check()) return console.error("Validation error.");

    auth.login(emailInput.value, passwordInput.value)
        .then((res) => {
            if (!res.error) {
                localStorage.setItem("social_user_id", res.id);
                localStorage.setItem("social_user_token", res.token);
                window.location = "index.html";
            } else {
                message.show({text: res.message, error: res.error});
            }
        });
}

//resetPasswordHandler
function resetPasswordHandler(e) {
    e.preventDefault();

    const modalBackdrop = document.querySelector(".modal-backdrop");
    const validation = new Validation(resetPasswordForm);
    validation.init();

    if (!validation.check()) return console.error("Validation error.");

    auth.resetPassword(resEmail.value)
        .then((res) => {
            if (!res.error) {
                modalFormReset.classList.remove("show");
                modalBackdrop.classList.remove("show");
                resetPasswordForm.reset();
                message.show({text: res.message, error: res.error});
            } else {
                modalFormReset.classList.remove("show");
                modalBackdrop.classList.remove("show");
                resetPasswordForm.reset();
                message.show({text: res.message, error: res.error});
            }
        })
}

form.addEventListener("submit", submitHandler);
resetPasswordForm.addEventListener("submit", resetPasswordHandler);