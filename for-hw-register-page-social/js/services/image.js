class ImageService {
    constructor(){
        this._id = localStorage.getItem("social_user_id");
        this._token = localStorage.getItem("social_user_token");
    }
    loadingPhoto(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("userPhotos", file);

            if (!this._token || !this._id) return reject("Error. Unauthorized.");

            fetch(`${env.apiUrl}/public/users/upload-photos/${this._id}`, {
                method: "POST",
                body: formData,
                headers: {
                    "x-access-token": this._token
                }
            })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
    removePhoto(imgId, imgUrl) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/remove-photo/${this._id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    image_id: imgId,
                    image_url: `users-photos/${imgUrl}`
                 }),
                headers: {
                    "Content-type": "application/json",
                    "x-access-token": this._token
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });

    }
    getInfo(id) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/image-info/${id}`)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
}