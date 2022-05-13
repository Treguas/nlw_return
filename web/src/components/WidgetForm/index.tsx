import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoghtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto',
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lampada',
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoghtImageUrl,
            alt: 'imagem de uma núvem de pensamento',
        }
    }
}


export type FeedbackType = keyof typeof feedbackTypes;


export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);


    function handleRestartFeedback(): void {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <>
            <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-large w-[calc(100vw-4rem)] md:w-[350px]">
                { 
                feedbackSent 
                ? 
                (
                    <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
                )
                :
                <>
                    {
                    !feedbackType
                        ?
                        (
                            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                        )
                        :
                        (
                            <FeedbackContentStep
                                feedbackType={feedbackType}
                                onFeedbackRestartRequested={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        )
                }
                </>
            }

                <footer className="text-xs text-neutral-400">
                    Feito com ❤ by <a className="underline underline-offset-2" href="https://www.linkedin.com/in/vagnertreguas/">Treguas</a>
                </footer>
            </div>
        </>
    );
}