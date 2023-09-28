import { useDocContext } from "./context"
import { ContentType, DocType, SectionType } from "./types"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import { TbEdit, TbAlignCenter, TbAlignLeft, TbAlignRight, TbAlignJustified, TbHttpDelete, TbTextIncrease, TbTextDecrease } from "react-icons/tb"
import { LuScrollText } from "react-icons/lu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BsStars } from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";


export default function Editor() {
    const { docData: doc, updateDocData }: {
        docData: DocType,
        updateDocData: (doc: DocType) => void
    } = useDocContext();

    const [aiState, setAiState] = useState({
        fetching: false,
        error: false,
        value: ""
    });
    function CompileDocumentToSTring() {
        const newDoc = { ...doc };
        let docString = "";
        docString += newDoc.title + "\n";
        newDoc.sections.forEach((section: SectionType) => {
            section.content.forEach((content: ContentType) => {
                docString += content.value.replace(/<[^>]*>?/gm, '');
            })
        })

        return docString;
    }
    function CallImprovement(sectionId: number, contentId: number) {
        const docString = CompileDocumentToSTring();
        const sectionValue = doc.sections[sectionId].content[contentId].value.trim() === "" ? doc.sections[sectionId].content[contentId].defaultValue : doc.sections[sectionId].content[contentId].value;
        return new Promise(async (resolve, reject) => {
            await axios.post("/api/app/improve", {
                doc: docString,
                prompt: aiState.value,
                section: sectionValue
            }).then((response) => {
                console.log(response.data);
                resolve(response.data);
                const newDoc = { ...doc };
                newDoc.sections[sectionId].content[contentId].value = response.data.data;
                updateDocData(newDoc);
            }).catch((error) => {
                console.log(error);
                reject(error);
                setAiState({
                    ...aiState,
                    error: true
                });
            }).finally(() => {
                setAiState({
                    ...aiState,
                    fetching: false
                });
            });
        })

    }




    return (<Card>
        <CardHeader>
            <CardTitle>
                Customise Document
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col space-y-4">
                <Accordion type="single" collapsible>
                    {doc.sections.map((section: SectionType, index: number) => {
                        return (<AccordionItem value={section.title + index} key={index}>
                            <AccordionTrigger className={"hover:no-underline hover:bg-slate-100 px-2" + (section.editable ? " bg-slate-100" : "")}>
                                <div className="flex flex-row gap-1 items-center justify-start">
                                    <LuScrollText className="w-4 h-4 mr-2" />
                                    {section.title}
                                    {section.editable === true ? <TbEdit className="w-4 h-4" /> : null}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {section.content.map((content: ContentType, contentIndex: number) => {
                                    return (<div key={contentIndex} className="flex flex-col gap-2 mb-2 p-3 bg-slate-100">
                                        <Label htmlFor={"content-" + contentIndex}>
                                            Para {contentIndex + 1}
                                        </Label>

                                        <Textarea onChange={(e) => {
                                            const newDoc = { ...doc };
                                            newDoc.sections[index].content[contentIndex].value = e.target.value;
                                            updateDocData(newDoc);
                                        }}
                                            id={"content-" + contentIndex}
                                            disabled={!section.editable || aiState.fetching}
                                            value={content.value}
                                            placeholder={!section.editable ? "Enter your text here or our AI will fill it for you":content.defaultValue}
                                            className="focus-visible:ring-0 focus-visible:ring-transparent"
                                        />
                                        <div className="flex flex-wrap gap-1 justify-end items-center my-2 bg-white p-2 rounded-md">
                                            <div className="flex flex-row gap-1 items-center mr-auto">
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-left");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignLeft className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-center");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignCenter className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-right");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignRight className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-justify");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignJustified className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        // const newDoc = { ...doc };
                                                        // decrease font size

                                                        // newDoc.sections[index].content[contentIndex].classNames.push("text-");
                                                    }}
                                                >
                                                    <TbTextDecrease className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline" disabled={!section.editable || aiState.fetching}
                                                    onClick={() => {
                                                        // const newDoc = { ...doc };
                                                        // newDoc.sections[index].content[contentIndex].classNames.push("text-justify");
                                                        // updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbTextIncrease className="text-inherit" />
                                                </Button>

                                            </div>
                                            <Button size="xs" variant="outline"

                                                onClick={() => {
                                                    const newDoc = { ...doc };
                                                    newDoc.sections[index].content[contentIndex].value = "";
                                                    updateDocData(newDoc);
                                                }}
                                                disabled={!section.editable || aiState.fetching}>
                                                <TbHttpDelete className="text-inherit" />
                                            </Button>

                                            <Dialog onOpenChange={() => {
                                                setAiState({
                                                    ...aiState,
                                                    value: ""
                                                })
                                            }}>
                                                <DialogTrigger asChild>
                                                    <Button size="xs" variant="outline" className="hover:bg-slate-800  hover:text-white"
                                                        disabled={!section.editable || aiState.fetching}>
                                                        <BsStars className="text-inherit mr-2 motion-safe:animate-bounce hover:animate-ping" />
                                                        Improve with AI
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Improve the content with our AI
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            <p>
                                                                Describe the content you want to add to this section and our AI will generate it for you.
                                                            </p>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form
                                                        onSubmit={(event) => {
                                                            event.preventDefault();
                                                        
                                                        }}
                                                        className="flex flex-col items-center"
                                                    >

                                                        <Textarea className="my-3" placeholder="Write your prompt..."
                                                            value={aiState.value}
                                                            onChange={(e) => {
                                                                setAiState({
                                                                    ...aiState,
                                                                    value: e.target.value
                                                                })
                                                            }}
                                                        />
                                                        <Button className="m-auto"
                                                            disabled={aiState.fetching || aiState.value.trim().length === 0}
                                                            onClick={(e) =>{
                                                                setAiState({
                                                                    ...aiState,
                                                                    fetching: true
                                                                })
                                                            
                                                                toast.promise(CallImprovement(index, contentIndex), {
                                                                    loading: "Generating ...",
                                                                    success: "Generated",
                                                                    error: "Error generating content"
                                                                });
                                                            }}
                                                        >

                                                            {aiState.fetching ? (
                                                                <AiOutlineLoading className="h-4 w-4 mr-2  animate-spin" />
                                                            ) : (<BsStars className="text-inherit mr-2 h-4 w-4 motion-safe:animate-bounce" />
                                                            )}
                                                            {aiState.fetching ? "Generating ..." : " Generate with AI"}

                                                        </Button>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>

                                        </div>
                                        {/* <div className="flex flex-wrap gap-1 justify-start items-start">
                                    Suggested Edits : {content?.variables?.map((suggestion: string, index: number) => <Badge key={index} variant="secondary">{suggestion}</Badge>)}
                                </div> */}
                                    </div>)
                                })}

                            </AccordionContent>
                        </AccordionItem>)
                    })}

                </Accordion>

            </div>
        </CardContent>
    </Card>)
}