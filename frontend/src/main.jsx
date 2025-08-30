import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from '../context/AuthContextProvider.jsx';
import { ProblemContextProvider } from '../context/ProblemContextProvider.jsx';
import { TopicContextProvider } from '../context/TopicContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TopicContextProvider>
        <ProblemContextProvider>
          <App/>
        </ProblemContextProvider>
      </TopicContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
