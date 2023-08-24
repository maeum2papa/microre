function resizeImageReal(file, maxWidth, maxHeight){
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // 최대 너비 또는 높이를 넘지 않도록 크기 조절
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }

            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
                resolve(blob);
            }, file.type);
        };

        img.onerror = (error) => {
            reject(error);
        };

        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target.result;
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

const resizeImage = async(file, maxWidth, maxHeight) => {
    return await blobToBase64(await resizeImageReal(file, maxWidth, maxHeight));
};

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
};

export{
    resizeImage
}