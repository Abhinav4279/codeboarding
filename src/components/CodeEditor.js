import { useRef } from 'react'
import Editor from "@monaco-editor/react";
import ACTIONS from '../Actions';

const CodeEditor = ({ socket, roomId }) => {
  const editorRef = useRef(null);

  const default_snip =
    `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
}
`

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    if(socket && editorRef.current) {
      socket.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== null && code !== undefined) {
          editorRef.current.setValue(code);
        }
      })
    }
  }

  const handleEditorChange = (value, event) => {
    if(event.isFlush === true || socket === null || socket === undefined)
      return;

    socket.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      value,
    })
  }

  return (
    <Editor
      height="100vh"
      width="41%"
      theme="vs-dark"
      defaultLanguage="cpp"
      defaultValue={default_snip}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  )
}

export default CodeEditor