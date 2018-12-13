class ImageModal {
    constructor() {
        this._imageInfoContainer = document.querySelector("#imageModal .current-image-info");
        this._imgTag = document.querySelector(".current-image img");
        this._commentContainer = document.querySelector(".current-image-comments-wrap");
        this._loader = document.getElementById("loading");
    }

    renderInfo(image) {
        this.clearModal();
        this.setBaseInfo(image);
        this.setImg(image);
        this.setComments(image);
        this.loaderToggle();
    }

    loaderToggle() {
        this._loader.classList.toggle("hidden");
    }

    setBaseInfo(image) {
        const template = ImageModal._basicInfoTemplate(image);
        this._imageInfoContainer.insertAdjacentHTML("afterbegin", template);
    }

    setImg({url}) {
        this._imgTag.src = url;
    }

    setComments({comments, owner}) {
        let template = "";
        comments.forEach((comment) => template += ImageModal._commentTemplate(comment, owner));
        this._commentContainer.insertAdjacentHTML("afterbegin", template);
    }

    clearModal() {
        this._imageInfoContainer.innerHTML = "";
    }

    static _commentTemplate({owner, avatar, full_name, text, time_update, sub_comments}, {_id}) {
        const currentUserId = localStorage.getItem("social_user_id");
        const isOwner = currentUserId == owner || currentUserId == _id;
        return `
        <div class="comment-item mb-4">
            <div class="comment-item-details d-flex">
                <div class="comment-owner-avatar">
                    <img src="${avatar}" alt="">
                </div>
                <!-- /.comment-owner -->
                <div class="comment-item-info d-flex flex-column">
                    <h6 class="font-weight-bold">${full_name}</h6>
                    <p>${text}</p>
                    <span class="text-secondary">${time_update}</span>
                </div>
                <!-- /.comment-item-info -->
                <div class="ml-auto">
                    ${isOwner ? '<i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i>': ''}
                </div>
            </div>
            <!-- /.comment-item-details -->
            <div class="sub-comments"></div>
            <!-- /.sub-comments -->
        </div>
        <!-- /.comment-item -->
        `;
    }

    static _basicInfoTemplate({owner, views, likes}) {
        return `
            <div class="owner-info d-flex align-items-center">
                <div class="owner-avatar">
                    <img src="${owner.avatar}" alt="">
                </div>
                <!-- /.owner-avatar -->
                <div class="d-flex flex-column">
                    <span class="font-weight-bold">${owner.full_name}</span>
                    <span class="text-secondary">${owner.city}</span>
                </div>
            </div>
            <!-- /.owner-info -->
            <div class="current-image-stats d-flex ml-auto">
                <div class="views-count d-flex flex-column align-items-center">
                    <i class="fas fa-eye"></i>
                    <span class="font-weight-bold">${views.length}</span>
                </div>
                <div class="likes-count d-flex flex-column align-items-center ml-4">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="font-weight-bold">${likes.length}</span>
                </div>
            </div>
            <!-- /.image-sstatistics -->
        `;
    }
}