import { User } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type UserResponse = {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

export type LoginResponse = {
    data: UserResponse
    token: string
}

export type RegisterRequest = {
    name: string
    password: string
    email: string
}

export type UpdateUserRequest = {
    name?: string
    email?: string
    password?: string
}

export type LoginRequest = {
    email: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: moment(user.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(user.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toUserLoginResponse(user: User, token: string): LoginResponse {
    return {
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: moment(user.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
            updated_at: moment(user.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        },
        token: token
    }
}