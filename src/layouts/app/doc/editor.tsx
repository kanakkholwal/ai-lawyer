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

import { TbEdit, TbAlignCenter, TbAlignLeft, TbAlignRight, TbAlignJustified, TbHttpDelete, TbTextIncrease,TbTextDecrease } from "react-icons/tb"
import { LuScrollText } from "react-icons/lu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BsStars } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";


export default function Editor() {
    const { docData: doc, updateDocData }: {
        docData: DocType,
        updateDocData: (doc: DocType) => void
    } = useDocContext();

    console.log(doc.sections);


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
                                            disabled={!section.editable}
                                            defaultValue={content.defaultValue}
                                            value={content.value}
                                            placeholder="Enter your text here or our AI will fill it for you"
                                            className="focus-visible:ring-0 focus-visible:ring-transparent"
                                        />
                                        <div className="flex flex-wrap gap-1 justify-end items-center my-2 bg-white p-2 rounded-md">
                                            <div className="flex flex-row gap-1 items-center mr-auto">
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-left");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignLeft className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-center");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignCenter className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-right");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignRight className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-justify");
                                                        updateDocData(newDoc);
                                                    }}
                                                >
                                                    <TbAlignJustified className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        // decrease font size
                                                        // newDoc.sections[index].content[contentIndex].classNames.push("text-justify");
                                                    }}
                                                >
                                                    <TbTextDecrease className="text-inherit" />
                                                </Button>
                                                <Button size="xs" variant="outline"
                                                    onClick={() => {
                                                        const newDoc = { ...doc };
                                                        newDoc.sections[index].content[contentIndex].classNames.push("text-justify");
                                                        updateDocData(newDoc);
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
                                                disabled={!section.editable}>
                                                <TbHttpDelete className="text-inherit" />
                                            </Button>
                                            <Button size="xs" variant="outline" className="hover:bg-slate-800  hover:text-white"
                                                onClick={() => {

                                                }}
                                                disabled={!section.editable}>
                                                <BsStars className="text-inherit mr-2 motion-safe:animate-bounce hover:animate-ping" />
                                                Improve with AI
                                            </Button>
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