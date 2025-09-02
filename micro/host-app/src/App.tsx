import React, { Component, type ErrorInfo, type ReactNode, Suspense } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info); }
  render() {
    if (this.state.hasError) return <div>Something went wrong loading the module!</div>;
    return this.props.children;
  }
}

const StudentsApp = React.lazy(() => import("students/studentsModule"));
const TeachersApp = React.lazy(() => import("teachers/teachersModule"));


export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#fff" }}>🏫 Coaching Manager Dashboard</h1>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading Student Module...</div>}>
          <StudentsApp />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<div>Loading Teacher Module...</div>}>
          <TeachersApp />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
