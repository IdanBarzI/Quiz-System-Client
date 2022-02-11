import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'

const TextEditor = () => {
    const editor = useRef(null)
    const [content,setContent] = useState('')
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