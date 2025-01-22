class NewsController{
    static createNews =async (req,res) => {
        console.log(req.body)
        console.log(req.user)
    }
}
export default NewsController