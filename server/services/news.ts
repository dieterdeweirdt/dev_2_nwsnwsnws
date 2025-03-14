import sql from './db';

export interface News {
    id: number;
    title: string;
    slug: string;
    content?: string;
    image?: string;
    created_at: string;
}


export async function getAllNews(limit:number = 10): Promise<News[]> {
    const news : News[] = await sql`select * 
        from news
        order by created_at desc
        limit ${limit}`

    return news;
}

export async function getNewsBySlug(slug:string): Promise<News> {
    const news : News[] = await sql`select * 
        from news
        where slug = ${slug}`

    return news[0];
}


