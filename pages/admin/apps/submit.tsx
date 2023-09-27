import ApplicationLayout from "src/layouts/app/ui"
import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "src/types/session"
import type { SessionUserType } from "src/types/user"
import { useState, useContext,createContext, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => <>
    Loading the editor ...
  </>,
});

const mentionContext = createContext({
  suggestions: [],
  setSuggestions: () => {},
} as any);

export default function Application({
  user,
}: {
  user: SessionUserType;
}) {


  const [value, onChange] = useState('<p>That my driving license No. ………….. has been lost/stolen on….. for which I have lodged FIR at Police Station</p>');

  const [template, setTemplate] = useState({
    title: 'Driving License',
    excerpt: 'Driving License Lost',
    body: 'That my driving license No. ………….. has been lost/stolen on….. for which I have lodged FIR at Police Station',
    editables: [
      {
        id: 1,
        value: '',
        variable: 'license_number',
        default: '696969'
      }
    ],
    tags: ['Driving License', 'Lost'],
    author: 'Matthew Russell',
    createdAt: '2021-08-01T12:34:56.000Z',
    updatedAt: '2021-08-01T12:34:56.000Z',

  })

  console.log(value);
  const getSuggestion = useCallback(async(query:string) => {
    return template.editables.filter((item) =>
    item.variable.toLowerCase().includes(query.toLowerCase())
  )
  }, [template.editables]);
  

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@'],
      source: async function(searchTerm: string, renderList: any, mentionChar: string) {
        const list = await getSuggestion(searchTerm);
      
        renderList(list.map((item) => {
          return {
            id: item.id,
            value: item.variable,
            name: item.variable,
          };
        }));
      },
    }), [getSuggestion]);

  

  return (
    <ApplicationLayout user={user}>
      <div className="flex items-start justify-center gap-3 w-full h-full">
        <div>
          <div role="header" className="w-full bg-white p-3 mb-4 rounded-md">
            <h3 className="text-center">
              Create a new Template
            </h3>
            <div className="mb-2">
              <Label htmlFor="Title">Title</Label>
              <Input placeholder="Title" value={template.title} onChange={(e) => setTemplate({ ...template, title: e.target.value })} />
            </div>
            <div className="mb-2">
              <Label htmlFor="Excerpt">A brief description</Label>
              <Input placeholder="Excerpt" value={template.excerpt} onChange={(e) => setTemplate({ ...template, excerpt: e.target.value })} />
            </div>
            <div className="mb-2">
              <Label htmlFor="Tags">Tags</Label>
              <Input placeholder="Tags" value={template.tags.join(',')} onChange={(e) => setTemplate({ ...template, tags: e.target.value.split(',') })} />
            </div>
          </div>
          <div className="rounded-md bg-white w-full">
            <RichTextEditor
              value={value}
              onChange={onChange}
              placeholder="Type @ or # to see mentions autocomplete"
              mentions={mentions}
            />

          </div>
        </div>
        <div role="editable" className="w-1/4 bg-white p-3 rounded-md">
          <h3 className="font-semibold text-center text-slate-700">
            Editable Fields
          </h3>
          <div className="flex flex-col my-2">
            {template.editables.map((editable, index) => {
              return (
                <div key={index} className="flex flex-col mb-4 gap-2">
                  <Label htmlFor={`editable-${index}`}>Editable Field {index + 1}</Label>
                  <Input placeholder="Default value"
                    value={editable.default}
                    onChange={(e) => {
                      const editables = [...template.editables]
                      editables[index].default = e.target.value
                      setTemplate({ ...template, editables })
                    }} />
                  <Input placeholder="Add a unique variable name"
                    value={editable.variable}
                    onChange={(e) => {
                      const editables = [...template.editables]
                      editables[index].variable = e.target.value
                      setTemplate({ ...template, editables })
                    }} />

                </div>
              )
            })}
          </div>
          <div className="flex justify-center items-center gap-2  mb-2">
            <Button variant="outline" size="sm"
              onClick={() => {
                const editables = [...template.editables]
                editables.push({
                  id: editables.length + 1,
                  value: '',
                  default: '',
                  variable: `your_variable_${editables.length + 1}`
                })
                setTemplate({ ...template, editables })
              }}
            >
              Add new field
            </Button>
            <Button variant="outline" size="sm"
            disabled={template.editables.length === 1}
              onClick={() => {
                const editables = [...template.editables]
                editables.pop()
                setTemplate({ ...template, editables })
              }}>
              Remove last field
            </Button>
          </div>
        </div>
      </div>





    </ApplicationLayout>
  );
}

const Editor = ({ value, onChange, suggestions, placeholder }: {
  value: string,
  onChange: (value: string) => void,
  suggestions: any[],
  placeholder: string
}) => {
  
  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@'],
      source: async function(searchTerm: string, renderList: any, mentionChar: string) {
        // const list = mentionChar === '@' ? suggestions : [];
        const includesSearchTerm = suggestions.filter((item) =>
          item.variable.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm.map((item) => {
          return {
            id: item.id,
            value: item.variable,
            name: item.variable,
          };
        }));
      },
    }), [suggestions]);


  return (<RichTextEditor
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    mentions={mentions}
  />)
}


export async function getServerSideProps(context: GetSessionParams | undefined) {


  const session = (await getSession(context)) as sessionType | null;

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }


  return {
    props: { user: session.user as SessionUserType },
  }
}