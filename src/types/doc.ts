

type Section = {
    _id?: string;
    title: string;
    excerpt: string;
    content: string;
    editables: Editable[];
    createdAt?: string;
}
type Editable = {
    _id?: string;
    label: string;
    start: number;
    end: number;
    placeholder: string;
}