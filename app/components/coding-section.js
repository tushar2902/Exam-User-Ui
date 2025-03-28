"use client";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaChevronLeft, FaChevronRight, FaCheck, FaFlag } from "react-icons/fa";
import { motion } from "framer-motion";

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
  timeLeft
}) {
  const [language, setLanguage] = useState(
    question.text.includes("Python") ? "python" : "javascript"
  );
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [isMarked, setIsMarked] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const code = answers[`${sectionIndex}-${questionIndex}`] || question.starterCode || "";

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Executing code...\n\n");

    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const mockResults = question.testCases.map((testCase, index) => {
        const passed = Math.random() > 0.3;
        return {
          input: testCase.input,
          expected: testCase.output,
          actual: passed ? testCase.output : "Incorrect output",
          passed
        };
      });

      setTestResults(mockResults);
      
      const passedCount = mockResults.filter(r => r.passed).length;
      const outputText = [
        `Execution completed.`,
        `Results: ${passedCount}/${mockResults.length} test cases passed`,
        ...mockResults.map((r, i) => 
          `Test ${i+1}: ${r.passed ? '✅ PASSED' : '❌ FAILED'}\n` +
          `  Input: ${r.input}\n` +
          `  Expected: ${r.expected}\n` +
          `  Received: ${r.actual}\n`
        )
      ].join('\n');

      setOutput(outputText);
    } catch (error) {
      setOutput(`Error executing code:\n${error.message}`);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCodeChange = (value) => {
    setAnswers({
      ...answers,
      [`${sectionIndex}-${questionIndex}`]: value || "",
    });
  };

  const handleSubmitSolution = () => {
    if (isLastQuestion) {
      onFinalSubmit();
    } else {
      onNext();
    }
  };

  const handleMarkForReview = () => {
    setIsMarked(!isMarked);
  };

  // Calculate dynamic heights based on window size
  const isMobile = windowSize.width < 768;
  const editorHeight = isMobile ? 300 : Math.max(300, windowSize.height * 0.4);
  const outputHeight = isMobile ? 200 : Math.max(200, windowSize.height * 0.3);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-gray-50 overflow-hidden">
      {/* Header Bar */}
      <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Question {questionIndex + 1} of {sectionIndex + 1}
        </h2>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          ⏳ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Question & Editor */}
        <div className="flex-1 flex flex-col p-4 bg-white border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden">
          <div className="mb-2 overflow-y-auto">
            <h3 className="font-medium text-gray-800 mb-2">Problem Statement:</h3>
            <p className="text-gray-700 whitespace-pre-wrap text-sm">{question.text}</p>
            
            {question.testCases && (
              <>
                <h3 className="font-medium text-gray-800 mt-4 mb-2">Test Cases:</h3>
                <ul className="space-y-2">
                  {question.testCases.map((testCase, index) => (
                    <li key={index} className="bg-gray-100 p-2 rounded text-sm">
                      <div className="font-mono">
                        <span className="font-medium">Input:</span> {testCase.input}
                      </div>
                      <div className="font-mono">
                        <span className="font-medium">Expected:</span> {testCase.output}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 border rounded-lg text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </div>

            <div className="border rounded-lg overflow-hidden" style={{ height: `${editorHeight}px` }}>
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  wordWrap: "on",
                  automaticLayout: true,
                  lineNumbers: "on"
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Output & Results */}
        <div className="w-full md:w-96 flex flex-col bg-white border-t md:border-t-0 md:border-l border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-md font-semibold text-gray-800">Execution Output</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto" style={{ height: `${outputHeight}px` }}>
            <pre className="bg-gray-800 text-gray-100 p-3 font-mono text-xs whitespace-pre-wrap overflow-x-auto h-full">
              {output || "Run your code to see output here..."}
            </pre>
          </div>

          <div className="p-3 border-t border-gray-200 overflow-y-auto" style={{ maxHeight: `${outputHeight}px` }}>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Test Results</h3>
            {testResults.length > 0 ? (
              <div className="space-y-2">
                {testResults.map((test, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2 rounded-lg text-xs ${
                      test.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <div className="font-medium flex items-center">
                      {test.passed ? (
                        <span className="text-green-600 mr-1">✓</span>
                      ) : (
                        <span className="text-red-600 mr-1">✗</span>
                      )}
                      Test {index + 1} - {test.passed ? 'Passed' : 'Failed'}
                    </div>
                    <div className="mt-1">
                      <div>Input: <span className="font-mono">{test.input}</span></div>
                      <div>Expected: <span className="font-mono">{test.expected}</span></div>
                      {!test.passed && (
                        <div>Received: <span className="font-mono">{test.actual}</span></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">No test results yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="bg-gray-50 border-t border-gray-200 p-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={onPrevious}
            className="flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm"
          >
            <FaChevronLeft className="mr-1" />
            <span className="truncate">Previous</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center justify-center p-2 rounded-lg text-sm ${
              isRunning
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <FaPlay className="mr-1" />
            <span className="truncate">{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={handleMarkForReview}
            className={`flex items-center justify-center p-2 rounded-lg text-sm ${
              isMarked
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            <FaFlag className="mr-1" />
            <span className="truncate">{isMarked ? 'Marked' : 'Mark'}</span>
          </button>

          <button
            onClick={handleSubmitSolution}
            className={`flex items-center justify-center p-2 rounded-lg text-sm ${
              isLastQuestion
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLastQuestion ? (
              <>
                <FaCheck className="mr-1" />
                <span className="truncate">Submit Exam</span>
              </>
            ) : (
              <>
                <FaChevronRight className="mr-1" />
                <span className="truncate">Next Question</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}