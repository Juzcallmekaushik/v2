import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getFeaturedProjects } from "~/services/contentful.server";

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const url = new URL(request.url);
        const preview = url.searchParams.get("preview") === "true";
        
        const projects = await getFeaturedProjects(preview);
        
        return json({ 
            projects,
            success: true 
        });
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return json({ 
            projects: [], 
            success: false, 
            error: "Failed to fetch featured projects" 
        }, { status: 500 });
    }
}
