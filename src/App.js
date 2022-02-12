import Selector from './components/Selector';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="h-full text-center bg-gray-100 overflow-auto">
      <ErrorBoundary>
        <Selector />
      </ErrorBoundary>
    </div>
  );
}

export default App;