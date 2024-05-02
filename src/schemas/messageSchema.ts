import {z} from "zod"

export const messageSchema= z.object({
    content:z
    .string()
    .min(10,{message:"Content must be 10 charcters"})
    .max(300,{message:"Content must be maximum of 300 charcters"})
})