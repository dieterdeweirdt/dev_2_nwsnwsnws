import express, { Request, Response, Router } from "express"
import path from "path"
import { News, getAllNews, getNewsBySlug } from "./services/news";
import { addComment, getAllComments, getCommentsByNewsId } from "./services/comments";

const router:Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    console.log('Request van de homepage of /');
    const name = "Dieter";
    const news : News[] = await getAllNews(3);
    res.render("home", { name, news });
});

router.get("/nieuws/:slug", async (req: Request, res: Response) => {
    console.log(req.query);
    const slug = req.params.slug; 
    const news : News = await getNewsBySlug(slug);
    //console.log(news)
    const comments = await getCommentsByNewsId(news.id);
    //console.log(comments)
    res.render("detail", {  news, comments } );
})

router.post("/nieuws/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug; 
    const news : News = await getNewsBySlug(slug);
    const { author, comment} = req.body;

    //console.log(`Plaats het bericht ${comment} geschreven door ${author} op het nieuwsbericht ${news.id}`);
    
    //Toevoegen aan database
    const data = await addComment(news.id, author, comment);
    
    //terug keren naar de get request van mijn pagina
    res.redirect(`/nieuws/${news.slug}`);
});

router.get("/reacties", async (req: Request, res: Response) => {
    const comments = await getAllComments();

    //console.log(comments)

    res.render("comments", { comments });
})

export default router;