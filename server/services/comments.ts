import sql from './db'

export async function getAllComments() {
    const data = await sql`
        select * 
        from comments`
    return data;
}

export async function getCommentsByNewsId(news_id : number) {
    const data = await sql`
        select * 
        from comments
        where news_id = ${news_id}`
    return data;
}

export async function addComment(news_id: number, author: string, content: string) {
    const data = await sql`
        insert into comments (news_id, author, content)
        values (${news_id}, ${author}, ${content})
        `
    return data;
}