import { Blog } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type BlogResponse = {
    id: string
    title: string
    image: string
    source: string
    content: string,
    created_at: string
    updated_at: string
}

export function toBlogResponse(blog: Blog): BlogResponse {
    return {
        id: blog.id,
        title: blog.title,
        image: blog.image,
        source: blog.source,
        content: blog.content,
        created_at: moment(blog.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(blog.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toBlogArrayResponse(blogs: Blog[]): BlogResponse[] {
    return blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        image: blog.image,
        source: blog.source,
        content: blog.content,
        created_at: moment(blog.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(blog.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }))
}