import path from "path"
import { NextResponse, NextRequest } from "next/server"
import Database from "better-sqlite3"

const db = new Database(path.join(".", "src", "app", "api", "anti-mormonism.db"))

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const book = url.searchParams.get("book")
    const chapter = url.searchParams.get("chapter")
    const verse = url.searchParams.get("verse")
    const isRandom = url.searchParams.has("random")
    const isTodays = url.searchParams.has("todays")
    let result

    if (isRandom)
        result = db.prepare("SELECT * FROM verses ORDER BY RANDOM() LIMIT 1").get()
    else if (isTodays) {
        const count = (db.prepare("SELECT COUNT(*) as c FROM verses").get() as any).c
        const index = (new Date().getDate() % count) + 1
        result = db.prepare("SELECT * FROM verses WHERE id = ?").get(index)
    } else if (book && chapter && verse)
        result = db.prepare("SELECT * FROM verses WHERE book = ? AND chapter = ? AND verse = ?").get(book, Number(chapter), Number(verse))
    else
        return NextResponse.json(<ApiResponse>{
            context: "get-verse",
            success: false,
            message: "Invalid query",
        }, {
            status: 400,
        })

    return NextResponse.json(<ApiResponse>{
        context: "get-verse",
        success: true,
        message: "Enjoy your verse",
        data: result,
    })
}
