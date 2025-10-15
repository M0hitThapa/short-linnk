import { ApiResponse } from "@/lib/types";
import { z } from "zod";

const shortenUrlSchema = z.object({
  url: z.url(),
});
export async function shortenUrl(formData: FormData):Promise<ApiResponse><{
    shortUrl:string
}> {
    try {
        
    } catch (error) {
        
    }
}
