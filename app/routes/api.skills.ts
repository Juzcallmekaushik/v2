import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSkills } from "~/services/contentful.server";

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const url = new URL(request.url);
        const preview = url.searchParams.get("preview") === "true";
        
        const skills = await getSkills(preview);
        
        return json({ 
            skills,
            success: true 
        });
    } catch (error) {
        console.error("Error fetching skills:", error);
        return json({ 
            skills: [], 
            success: false, 
            error: "Failed to fetch skills" 
        }, { status: 500 });
    }
}
