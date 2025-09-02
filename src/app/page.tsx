import Link from "next/link"
import RefreshButton from "@/components/refresh-button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

async function getVerse({
	isRandom,
	isTodays,
	book,
	chapter,
	verse,
}: {
	isRandom?: true
	isTodays?: true
	book?: string
	chapter?: number
	verse?: number
}): Promise<React.ReactNode> {
	try {
		const url = `${SITE_URL}/api${isRandom ? "?random" : ""}${isTodays ? "?todays" : ""}${book ? `?book=${book}` : ""}${chapter ? `&chapter=${chapter}` : ""}${verse ? `&verse=${verse}` : ""}`
		const resp = await fetch(url)
		const data = (await resp.json()) as ApiResponse

		if (!data.success)
			throw new Error(data.message)

		const verseData = data.data as VerseData
		console.warn(SITE_URL)
		return (
			<Card>
				<CardHeader className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-1 text-muted-foreground font-normal">
						<span>{isRandom && "Random"}{isTodays && "Today's"}{(!isRandom && !isTodays) && "Searched"}</span>
						<span>|</span>

						<span>{verseData.book}</span>
						<span>:</span>
						<span>{verseData.chapter}</span>
						<span>:</span>
						<span>{verseData.verse}</span>
					</CardTitle>

					{isRandom && (
						<CardAction>
							<RefreshButton />
						</CardAction>
					)}
				</CardHeader>
				<CardContent>
					{verseData.by_jesus ? (
						<p className="text-destructive">{verseData.text}</p>
					) : (
						<p>{verseData.text}</p>
					)}
				</CardContent>
			</Card>
		)
	} catch (errorRaw: unknown) {
		const error = errorRaw as Error
		console.error(error.message)
		return (
			<p className="flex flex-col text-destructive">
				<strong>Problem when loading verse!</strong>
				{error.message}
			</p>
		)
	}
}

export default async function Home() {
	const todaysVerse = await getVerse({
		isTodays: true,
	})
	const randomVerse = await getVerse({
		isRandom: true,
	})
	return (
		<>
			<CardHeader>
				<CardTitle>Bible Verse API</CardTitle>
				<CardDescription>See today&apos;s verse, plus others! All verses inside our database are from the <b>King James Version (KJV)</b> translation, hand-picked by two people. Some verses may convey ideas not found in more modern translations, which are found to be less accurate.</CardDescription>
				<CardAction>
					<Link href="/docs">Read Documentation</Link>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div id="key" className="flex flex-col gap-2">
					<strong>Key</strong>

					<div id="key-values" className="flex flex-col">
						<div className="flex items-center gap-2">
							<div className="bg-foreground w-[1rem] h-[1rem] border rounded-sm" />
							<span>Uncategorized</span>
						</div>

						<div className="flex items-center gap-2">
							<div className="bg-destructive w-[1rem] h-[1rem] border rounded-sm" />
							<span>Jesus said this</span>
						</div>
					</div>
				</div>

				<div id="verses" className="flex flex-col gap-4">
					<strong>Verses</strong>
					{todaysVerse}
					{randomVerse}
				</div>
			</CardContent>
		</>
	)
}
