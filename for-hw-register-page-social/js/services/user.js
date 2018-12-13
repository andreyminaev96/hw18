class UserService {
    getInfo() {
        return new Promise((resolve, reject) => {
            const id = localStorage.getItem("social_user_id");

            fetch(`${env.apiUrl}/public/users/get-info/${id}`)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }

    uploadCover(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("coverImg", file);

            // Get token
            const token = localStorage.getItem("social_user_token");
            // Get user id
            const id = localStorage.getItem("social_user_id");

            if (!token || !id) return reject("Error. Unauthorized.");

            fetch(`${env.apiUrl}/public/users/upload-cover/${id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "x-access-token": token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
    }
}