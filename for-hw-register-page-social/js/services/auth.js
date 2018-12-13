class AuthService {
    login(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/login`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
    register(
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year
    ) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/signup`, {
                method: "POST",
                body: JSON.stringify(
                    {
                      email,
                      password,
                      nickname,
                      first_name,
                      last_name,
                      phone,
                      gender_orientation,
                      city,
                      country,
                      date_of_birth_day,
                      date_of_birth_month,
                      date_of_birth_year
                    }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }

    resetPassword(email) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/reset-password`, {
                method: "POST",
                body: JSON.stringify({email}),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
}


