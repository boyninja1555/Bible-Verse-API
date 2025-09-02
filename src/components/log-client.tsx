"use client"

import { useEffect } from "react"

export default function LogClient({ message, }: {
    message: string
}) {
    useEffect(() => console.log(message), [message])
    return null
}
