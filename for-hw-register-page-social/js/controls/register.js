// Init Auth Service
const register = new AuthService();
// Init Message Module
const message = new Message();
message.init();

// Login UI
const formReg = document.forms["signUpForm"];
const firstNsmeInput = formReg.elements["first_name"];
const lastNameInput = formReg.elements["last_name"];
const nickNameInput = formReg.elements["nick_name"];
const dayOfBirthInput = formReg.elements["day_of_birth"];
const monthOfBirthInput = formReg.elements["month_of_birth"];
const yearOfBirthInput = formReg.elements["year_of_birth"];
const countryInput = formReg.elements["country"];
const cityInput = formReg.elements["city"];
const genderInput = formReg.elements["gender"];
const regEmailInput = formReg.elements["email"];
const phoneInput = formReg.elements["phone"];
const regPasswordInput = formReg.elements["password"];

//Login handler
function submitHandlerRegistration(e) {
    e.preventDefault();

    const validation = new Validation(formReg);
    validation.init();

    if (!validation.check()) return console.error("Validation error.");
    register.register(regEmailInput.value, regPasswordInput.value, nickNameInput.value, firstNsmeInput.value, lastNameInput.value, phoneInput.value, genderInput.value, cityInput.value, countryInput.value, dayOfBirthInput.value, monthOfBirthInput.value, yearOfBirthInput.value)
        .then((res) => {
            if (!res.error) {
                formReg.reset();
                window.location = "login.html";
            }
            message.show({text: res.message, error: res.error});
            formReg.reset()
        });
}
//
formReg.addEventListener("submit", submitHandlerRegistration);