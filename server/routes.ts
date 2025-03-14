import express, { Request, Response, Router } from "express"
import path from "path"
import { News, getAllNews, getNewsBySlug } from "./services/news";

const router:Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    console.log('Request van de homepage of /');
    const name = "Dieter";
    const news : News[] = await getAllNews(3);
    res.render("home", { name, news });
});

router.get("/nieuws/:slug", async (req: Request, res: Response) => {
    const slug = req.params.slug; 
    const news : News = await getNewsBySlug(slug);

    res.render("detail", { news: news } );
})

export default router;