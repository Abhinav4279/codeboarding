import { useEffect } from 'react'
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const default_snip = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
}
`
  return (
    <Editor
      height="100vh"
      width="41%"
      theme="vs-dark"
      defaultLanguage="cpp"
      defaultValue={default_snip}
      // onChange={handleEditorChange}
    />
  )
}

export default CodeEditor