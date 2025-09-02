import type { Metadata } from "next"
import hljs from "highlight.js"
import hlTypescript from "highlight.js/lib/languages/typescript"
import hlJson from "highlight.js/lib/languages/json"
import hlText from "highlight.js/lib/languages/plaintext"
import { Card, CardFooter } from "@/components/ui/card"
import "./styles/globals.css"

export function metadata(): Metadata {
	return {
		title: "Bible Verse API",
		description: "A bible verse a day keeps the doctor away!",
	}
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	hljs.registerLanguage("typescript", hlTypescript)
	hljs.registerLanguage("json", hlJson)
	hljs.registerLanguage("text", hlText)
	return (
		<html lang="en" className="dark">
			<body>
				<Card className="mt-30 mx-auto max-w-200">
					{children}
					<CardFooter>
						<span className="text-muted-foreground">
							<strong>Have some time on your hands? </strong>
							Help us expand our hand-picked database!
						</span>
						<span className="text-right">
							Email <a href="mailto:flappyfloorg@gmail.com" title="flappyfloorg@gmail.com">the project owner</a> for more information.
						</span>
					</CardFooter>
				</Card>
			</body>
		</html>
	)
}
