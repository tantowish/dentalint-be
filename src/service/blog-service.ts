import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { BlogResponse, toBlogArrayResponse, toBlogResponse } from "../model/blog-model";

export class BlogService {
    static async get(id: string): Promise<BlogResponse> {
        const blog = await prismaClient.blog.findUnique({
            where: {
                id: id
            }
        })

        if (!blog){
            throw new ResponseErorr(404, "blog not found")
        }

        return toBlogResponse(blog)
    }

    static async list(): Promise<BlogResponse[]> {
        const blogs = await prismaClient.blog.findMany()

        return toBlogArrayResponse(blogs)
    }
}