class CommentService {
    constructor(){
        this._token = localStorage.getItem("social_user_token");
    }

    addComment(id, commentText){
        console.log(id);
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/users/comment/${id}` ,{
                method: 'POST',
                body: JSON.stringify({
                    comment_text: commentText
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

}