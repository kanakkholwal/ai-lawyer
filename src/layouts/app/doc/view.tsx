
import { twMerge } from "tailwind-merge"
import { useDocContext } from "./context"
import { DocType, SectionType, ContentType } from "./types"

import { HiOutlinePrinter } from "react-icons/hi2";
import { PiShareFatBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { compiler } from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

export default function DocView() {
    const { docData: doc, updateDocData }: {
        docData: DocType,
        updateDocData: (doc: DocType) => void
    } = useDocContext();
    const previewRef = useRef<HTMLDivElement>(null);
    const [docName, setDocName] = useState<string>("Document Name");
    const [pdfLoader, setPdfLoader] = useState(false);

    const downloadPdfDocument = (downloadFileName: string) => {
        const input = previewRef.current as HTMLElement;
        if (!input) {
            toast.error("No Preview Found");
            return;
        }
        setPdfLoader(true);
        return new Promise((resolve, reject) => {
            html2canvas(input)
                .then((canvas) => {
                    const imgData: string = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage({
                        imageData: imgData,
                        format: 'JPEG',
                        x: 0,
                        y: 0,
                        width: input.clientWidth,
                        height: input.clientHeight,
                        alias: '',
                        compression: 'NONE',
                        rotation: 0,
                    });
                    pdf.save(`${downloadFileName}.pdf`);
                    toast.success("Pdf Downloaded Successfully");
                    resolve(true);
                }).catch((err) => {
                    toast.error("Something went wrong");
                    console.log(err)

                    reject(err);
                }).finally(() => {
                    setPdfLoader(false);
                })
        })

    }

    const makeSectionEditable = (sectionIndex: number) => {
        // make it this section editable only 
        const newDoc = { ...doc };
        newDoc.sections.forEach((section: SectionType, index: number) => {
            section.editable = false;
        })
        newDoc.sections[sectionIndex].editable = !doc.sections[sectionIndex].editable
        updateDocData(newDoc);
    }

    return (<div className="flex flex-col sticky top-[100px]">

        <div className="flex flex-row justify-between items-center mb-3 gap-3 bg-white rounded-md p-3">
            <Input value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Your Pdf File Name (e.g. : My marriage certificate)" className="font-semibold focus-visible:ring-0 focus-visible:ring-transparent" />
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="p-1" onClick={() => {
                    downloadPdfDocument(docName)
                }} type="button" disabled={pdfLoader}>
                    {pdfLoader ? (
                        <AiOutlineLoading className="h-4 w-4 animate-spin" />
                    ) : (
                        <HiOutlinePrinter className="h-4 w-4" />
                    )}
                </Button>
                <Button variant="outline" size="icon" className="p-1">
                    <PiShareFatBold className="w-4 h-4" />
                </Button>
            </div>
        </div>
        <div className="p-5 bg-white rounded-md shadow-md aspect-[210/297]" id="doc_preview" ref={previewRef}>
            <h1 className="text-center underline text-[24px] mb-[20px] font-semibold">
                {doc.title}
            </h1>
            {doc.sections.map((section: SectionType, index: number) => {
                return (<div
                    className={"text-[16px] mb-[10px] font-normal hover:bg-slate-100 cursor-pointer" + (section.editable === true ? " bg-sky-100" : "")}
                    role="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        makeSectionEditable(index)
                    }}
                    key={index}>
                    {section.content.map((content: ContentType, index: number) => {
                        return (
                            <p
                                className={twMerge("text-[16px] mb-[10px] font-normal", ...content.classNames)}
                                style={content.styles}
                                key={index}
                            >
                                {compiler(content.value.length === 0 ? content.defaultValue.replace(/```[\s\S]*?```/g, '') : content.value.replace(/```[\s\S]*?```/g, ''), {
                                    overrides: {
                                        pre: {
                                            props: {
                                                className: "text-inherit font-inherit bg-inherit p-0 m-0 break-words",
                                            }
                                        },
                                        code: {
                                            props: {
                                                className: "text-inherit font-inherit bg-inherit p-0 m-0 break-words",
                                            }
                                        }
                                    }
                                })}
                            </p>
                        )
                    })}
                </div>)
            })}

        </div>
    </div>)
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <p className="text-[16px] mb-[10px] font-normal">{children}</p>
}



