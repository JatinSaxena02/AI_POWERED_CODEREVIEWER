import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import "./App.css";
import Markdown from "react-markdown";
import axios from "axios";
import Editor from "react-simple-code-editor";

function App() {
  const [code, setcode] = useState(`function sum(){
  return 1+1
  }`);

  const [review, setreview] = useState(``);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  });

  async function reviewCode() {
    setloading(true);
    const res = await axios.post("http://localhost:3000/ai/get-review", {
      code,
    });
    setreview(res.data);
    setloading(false);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setcode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code","Fira Mono",monospace',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review-button">
            Review
          </div>
        </div>
        <div className="right">{!loading && <Markdown>{review}</Markdown>}</div>
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
