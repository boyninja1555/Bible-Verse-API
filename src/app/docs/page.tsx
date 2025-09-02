"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import hljs from "highlight.js"
import { CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "@/components/ui/card"
import "highlight.js/styles/github-dark.css"

export default function Documentation() {
    const code0 = `interface ApiResponse {
    context: string
    success: boolean
    message: string
    data?: object
}`
    const codeblock0 = useRef<HTMLElement>(null)

    const code1 = `interface ApiResponse {
    context: string
    success: boolean
    message: string
    data: {
        id: number
        book: string
        chapter: number
        verse: number
        text: number
        by_jesus: boolean
    }
}`
    const codeblock1 = useRef<HTMLElement>(null)

    const code2 = `// From \`/api?todays\`
{
    "context": "get-verse",
    "success": true,
    "message": "Enjoy your verse",
    "data": {
        "id": 2,
        "book": "John",
        "chapter": 6,
        "verse": 29,
        "text": "Jesus answered and said to them, \\"This is the work of God, that...",
        "by_jesus": 1
    }
}`
    const codeblock2 = useRef<HTMLElement>(null)

    const code3 = "/api?book={X}&chapter={Y}&verse={Z}"
    const codeblock3 = useRef<HTMLElement>(null)

    useEffect(() => {
        if (codeblock0.current)
            hljs.highlightElement(codeblock0.current)

        if (codeblock1.current)
            hljs.highlightElement(codeblock1.current)

        if (codeblock2.current)
            hljs.highlightElement(codeblock2.current)

        if (codeblock3.current)
            hljs.highlightElement(codeblock3.current)
    }, [codeblock0, codeblock1, codeblock2, codeblock3])

    return (
        <>
            <CardHeader>
                <CardTitle>Bible Verse API Documentation</CardTitle>
                <CardDescription>Access our collected verses directly through your applicaiton. No limitations, keys, or tokens!</CardDescription>
                <CardAction>
                    <Link href="/">Back to Home</Link>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>Want our daily verse inside your inbox? This API may help with that! Even the official application <Link href="/">here</Link> is built upon the API. As mentioned above, there are no limitations or tokens associated with the API. You just send a GET request, and parse the JSON response. Below is the response structure, represented in a TypeScript interface:</p>
                <pre><code ref={codeblock0} className="language-typescript">{code0}</code></pre>

                <p>As you can see, the data property can be anything. It depends on what data you requested. For example, when asking for a verse, this is what it would look like:</p>
                <pre><code ref={codeblock1} className="language-typescript">{code1}</code></pre>

                <p>Let&apos;s say you don&apos;t know TypeScript, or even basic types and interfaces. Below is an example API response, ripped directly from the day this article was written:</p>
                <pre><code ref={codeblock2} className="language-json">{code2}</code></pre>

                <p>To get today&apos;s verse, make a GET request to <Link href="/api?todays">/api?todays</Link> on this website. To generate a random verse, make a GET request to <Link href="/api?random">/api?random</Link>. And finally, you can supply the book, chapter, and verse instead using the following:</p>
                <pre><code ref={codeblock3} className="language-text">{code3}</code></pre>
            </CardContent>
        </>
    )
}
