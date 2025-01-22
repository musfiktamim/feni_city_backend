import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"
import { nanoid } from "nanoid";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRETE,
})


async function cloudNaryGetUrl(getUrl) {
    try {
        const url = await cloudinary.url(getUrl)
        return url
    } catch (error) {
        return { message: error.message }
    }
}

async function cloudNaryPostMediaOnePost(data,foldername="") {
    try {
        const res = await cloudinary.uploader.upload(`data:image/jpg;base64,${data}`, {
            public_id: nanoid(),
            resource_type: "image",
            folder:foldername
        })
        return res;
    } catch (error) {
        return { message: error.message }
    }
}

async function cloudNaryPostMediaMultyPost(images) {
    try{
        let imageReturn = []
        images.map(async (item)=>{
            const {public_id, secure_url, url} = await cloudNaryPostMediaOnePost(item)
            imageReturn.push({public_id, secure_url, url})
        })
        return imageReturn
    } catch (error) {
        return { message: error.message }
    }
}

export { cloudNaryGetUrl, cloudNaryPostMediaOnePost,cloudNaryPostMediaMultyPost }