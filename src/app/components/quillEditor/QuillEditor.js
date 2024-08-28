// components/QuillEditor.js
import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css"; // Crie um CSS module para o QuillEditor

const QuillEditor = ({ onEditorChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !editorRef.current) {
      const editorContainer = document.querySelector("#editor-container");
      if (editorContainer) {
        const quill = new Quill(editorContainer, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'color': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['image']
            ],
          },
        });

        quill.on('text-change', () => {
          if (onEditorChange) {
            onEditorChange(quill.getContents());
          }
        });

        editorRef.current = quill;
      }
    }
  }, [onEditorChange]);

  return <div id="editor-container" className={styles.editorContainer}></div>;
};

export default QuillEditor;
