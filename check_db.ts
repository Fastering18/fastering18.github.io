
import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function checkSchema() {
    try {
        const result = await db.execute(sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'projects'
        `);
        console.log("Projects Table Columns:", result.rows);
    } catch (err) {
        console.error("Error checking schema:", err);
    }
}

checkSchema();
