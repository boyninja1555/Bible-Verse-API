"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export default function RefreshButton() {
    const [reloadState, setReloadState] = useState<number | null>(null)

    useEffect(() => {
        if (!reloadState)
            return

        window.location.reload()
    }, [reloadState])

    return <Button onClick={() => setReloadState(Math.random())}>Refresh</Button>
}
