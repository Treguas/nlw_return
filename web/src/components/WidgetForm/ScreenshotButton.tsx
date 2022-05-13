import { Camera, CircleNotch, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";

interface ScreenshotButtonProps {
    screenshot: String | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ onScreenshotTook, screenshot }: ScreenshotButtonProps) {
    const [ isTakingScreenshot, setIsTakingScreenshot ] = useState(false);

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector("html")!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);
        setIsTakingScreenshot(false);
    }

    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
                onClick={()  => onScreenshotTook(null)}
            >
                
                <Trash weight="fill" />
            </button>
        );
    }

    return (
        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500"
            onClick={handleTakeScreenshot}
        >
            { isTakingScreenshot ? <CircleNotch /> : <Camera weight="bold" className="h-4 w-4" /> }
        </button>
    )
}