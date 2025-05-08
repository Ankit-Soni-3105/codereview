import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ initialValue = '', onChange }) => {
  const [code, setCode] = useState(initialValue);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="code-editor-container h-full rounded-2xl p-1">
      <Editor
      className='rounded-2xl p-8'
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;