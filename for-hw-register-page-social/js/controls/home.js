// Init User service
const user = new UserService();
// Image Service
const imageService = new ImageService();
// Comments Service
const comentService = new CommentService();
// Init User UI
const userUI = new UserUI();
//init Image Service
const image = new ImageService();
// Init Image UI
const imageUI = new ImageUI();
// Init Image Modal
const imageModal = new ImageModal();

// UI elements
const elementImgRow =document.querySelector(".row");
const imageWrap = document.querySelector(".images-wrap");
const inputCover = document.getElementById("coverImg");
const inputUploadPhoto = document.getElementById("userPhotos");
const addComments = document.forms["addComments"];
const commentInput = addComments.elements["comment"];

//Функцыя для получения информаціи о польщователе с сервера
function onLoad(e) {
    user.getInfo()
        .then((data) => {
            userUI.clearContainer();
            userUI.renderUserInfo(data);
            return data;
        })
        .then((data) => {
            imageUI.clearContainer();
            data.my_images.forEach((img) => imageUI.addImage(img));
        })
        .catch((error) => {
            console.log(error);
        });
}

//Функцыя для добавления coverImg
function onCoverUpload(e) {
    if (inputCover.files.length) {
        const [newCover] = inputCover.files;
        user.uploadCover(newCover)
            .then(user.getInfo)
            .then((data) => userUI.setCover(data.cover))
            .catch((error) => {
                console.log(error);
            });
    }
}
//Функцыя для добавления фото на сервер
function onloadingPhoto(e) {
    if (inputUploadPhoto.files.length){
        const [newPhoto] = inputUploadPhoto.files;
        image.loadingPhoto(newPhoto)
          .then(() => onLoad())
          .catch((error) => console.log(error));
    }
}
//Функцыя для удаление фото из сервер
function deletePhoto(e) {

    if (e.target.closest('.remove-wrap')) {
        // UI elements
        const imgSrc = e.target.offsetParent.previousElementSibling;
        const imgWrap = e.target.offsetParent.previousElementSibling.parentElement;

            let questionDelete = confirm('Вы точно хотите удалить ето фото ?');

            if (questionDelete) {
                // elements imgID - id photo, imgUrl - url photo
                const imgId = imgWrap.dataset.imgId;
                const imgUrl = imgSrc.currentSrc.split('/')[5];
                image.removePhoto(imgId, imgUrl);
            }
            user.getInfo()
             .then(() => onLoad())
             .catch((error) => console.log(error));

    }
}

imageWrap.addEventListener("click", (e) => {
    if (e.target.classList.contains("on-hover")) {
        const id = e.target.closest("[data-img-id]").dataset.imgId;
        $('#imageModal').modal('toggle');

        imageService.getInfo(id)
            .then((data) => imageModal.renderInfo(data))
            .catch((error) => {
                console.log(error);
            });

        addComments.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.closest("[data-class]")) {
                const commentText = commentInput.value;

                comentService.addComment(id, commentText)
                    .catch((error) => {
                        console.log(error);
                    });

            }
        }) ;

    }
});

// Remove loader
// addComments.addEventListener("click", (e) => {
//     e.preventDefault();
//
//
// });
$('#imageModal').on('hidden.bs.modal', (e) => imageModal.loaderToggle());

// Events
window.addEventListener("load", onLoad);
inputCover.addEventListener("change", onCoverUpload);
inputUploadPhoto.addEventListener("change", onloadingPhoto);
elementImgRow.addEventListener('click', deletePhoto);

