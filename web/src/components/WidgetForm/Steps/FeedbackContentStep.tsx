import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
    
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent,
}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<String | null>(null);
    const [comment, setComment] = useState("");

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(e: FormEvent) {
        e.preventDefault();

        console.log({
            screenshot,
            comment,
        })

        onFeedbackSent();
    }


    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="h-4 w-6" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full ">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-violet-500 focus:ring-violet-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}

                    />


                    <button
                        type="submit"
                        disabled={!comment}
                        className="p-2 bg-violet-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-violet-500"
                    >
                        Enviar feedback
                    </button>
                </footer>
            </form>
        </>
    );
}