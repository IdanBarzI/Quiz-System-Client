import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'

const TextEditor = ({text,onChange,content,setContent}) => {
    const editor = useRef(null)
    // const [content,setContent] = useState(text?text:"")
    const config = {
        readonly:false
    }

  return (
    <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={newContent=>setContent(newContent)}
        />
  )
}

export default TextEditor