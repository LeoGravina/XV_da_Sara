import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';
import './index.css'; // Garante que o CSS global está aqui

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Função para resetar (Voltar ao envelope)
  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope" onOpen={() => setIsOpen(true)} />
        ) : (
          <Invitation key="invitation" onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;