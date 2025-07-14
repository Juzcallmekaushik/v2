import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getProjects } from "~/services/contentful.server";

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const url = new URL(request.url);
        const preview = url.searchParams.get("preview") === "true";
        
        const projects = await getProjects(preview);
        
        return json({ 
            projects,
            success: true 
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return json({ 
            projects: [], 
            success: false, 
            error: "Failed to fetch projects" 
        }, { status: 500 });
    }
}
