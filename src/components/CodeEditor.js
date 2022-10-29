import { useEffect, useRef, useState } from 'react'
import Editor from "@monaco-editor/react";
import ACTIONS from '../Actions';

const CodeEditor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  const [isUserInput, setIsUserInput] = useState(1);

  const default_snip =
    `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
}
`

  useEffect(() => {
    if(socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== null) {
          setIsUserInput(0);
          editorRef.current.setValue(code);
        }
        console.log(code);
      })
    }
  }, [socketRef.current]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange() {
    // console.log(editorRef.current.getValue());
    if(isUserInput === 0) {
      setIsUserInput(1);
      return;
    }

    const code = editorRef.current.getValue();
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code,
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