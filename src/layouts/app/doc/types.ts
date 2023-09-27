export type DocType ={
    title:string;
    type:string;
    sections:SectionType[],
    format:{
        orientation:string;
        margins:{
            [k :string]:string
        }
    },
    header:{
        aligment:string | "center";
        content:string[]
    },
    footer:{
        aligment:string | "center";
        content:string[]
    }
}

export type ContentType = {
    variables?: string[];
    defaultValue: string;
    value: string,
    classNames: string[]
    styles: {
        [key: string]: string
    }
}
export type SectionType = {
    title: string,
    editable: boolean;
    content: ContentType[]
}
