export function loadImage(imgpath){
    let image = new Image();
    image.src = imgpath;

    if (imgpath == "none") {
        return '';
    } else {
        return "url('" + image.src + "')";
    }
}