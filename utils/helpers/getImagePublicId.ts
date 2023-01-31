export const getImagePublicId = (url: string) => {
    const arr = url.split("/");
    return arr[arr.length - 1].split(".")[0];
}

