"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodingSection({
  question,
  onNext,
  onPrevious,
  answers,
  setAnswers,
  questionIndex,
  sectionIndex,
  isLastQuestion,
  onFinalSubmit,
}) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(answers[`${sectionIndex}-${questionIndex}`] || "");
  const [output, setOutput] = useState("Output will appear here...");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    // Simulating Judge0 API response
    setTimeout(() => {
      setOutput("Execution Output will appear here...");
      setTestResults([
        { input: "Test 1", expected: "Output 1", actual: "Output 1", passed: true },
        { input: "Test 2", expected: "Output 2", actual: "Wrong Output", passed: false },
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmitSolution = () => {
    setAnswers({ ...answers, [`${sectionIndex}-${questionIndex}`]: code || "" });
    alert("Solution submitted!");

    if (isLastQuestion) {
      onFinalSubmit();
    } else {
      onNext();
    }
  };

  const handleCodeChange = (value) => {
    setCode(value || "");
    setAnswers({ ...answers, [`${sectionIndex}-${questionIndex}`]: value || "" });
  };

  return (
    <div className="flex h-screen p-4 w-full">
      {/* Left Panel - Question & Editor */}
      <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mb-4 p-2 border rounded-lg"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <Editor
          height="300px"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
        />
      </div>

      {/* Right Panel - Output & Actions */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md ml-4">
        <h2 className="text-xl font-semibold mb-4">Output</h2>
        <textarea
          readOnly
          className="w-full p-3 border rounded-lg h-24 bg-white"
          value={output}
        />
        <h3 className="text-lg font-semibold mt-4">Test Cases</h3>
        <ul className="bg-white p-2 rounded-lg">
          {testResults.map((test, index) => (
            <li key={index} className={`p-2 ${test.passed ? "text-green-600" : "text-red-600"}`}>
              <strong>Input:</strong> {test.input} | <strong>Expected:</strong> {test.expected} | <strong>Actual:</strong> {test.actual} | <strong>{test.passed ? "✅ Passed" : "❌ Failed"}</strong>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleRunCode}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <div>
            <button
              onClick={onPrevious}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Previous
            </button>
            <button
              onClick={handleSubmitSolution}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {isLastQuestion ? "Final Submit" : "Submit Solution"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
