import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

// IMPORTS DAS IMAGENS DE BORBOLETA
import borboleta1 from '../assets/borboleta1.png';
import borboleta2 from '../assets/borboleta2.png';
import borboleta3 from '../assets/borboleta3.png';

const BORBOLETAS_IMGS = [borboleta1, borboleta2, borboleta3];

// --- COMPONENTE BORBOLETA  ---
const Butterfly = ({ id }) => {
  const randomImg = BORBOLETAS_IMGS[Math.floor(Math.random() * BORBOLETAS_IMGS.length)];
  
  const randomSize = Math.random() * (90 - 60) + 60; 
  const destinationX = Math.random() * 600 - 300; 
  const destinationY = Math.random() * -500 - 100; 
  const flightDuration = Math.random() * 1 + 2; 
  const flapSpeed = Math.random() * 0.2 + 0.1; 
  const startDelay = Math.random() * 0.3; 
  const initialRotation = destinationX > 0 ? 20 : -20;
  
  return (
    // 1. CONTAINER PRINCIPAL (Controla o trajeto do voo)
    <motion.div
      style={{
        position: 'absolute',
        // Nascem um pouco espalhadas ao redor do selo, não num ponto único
        top: `${50 + Math.random() * 10 - 5}%`, 
        left: `${50 + Math.random() * 10 - 5}%`,
        zIndex: 20, pointerEvents: 'none',
        width: randomSize, height: 'auto',
        transformOrigin: 'center center'
      }}
      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      animate={{ 
        scale: [0.5, 1.2, 1, 0], // Nasce, cresce, mantém, some
        opacity: [0, 1, 1, 0], 
        x: destinationX, 
        y: destinationY, 
      }}
      transition={{ 
        duration: flightDuration, 
        ease: "easeOut", 
        delay: startDelay,
        times: [0, 0.01, 0.8, 1] // Cresce rápido no início
      }}
    >
      {/* 2. IMAGEM INTERNA (Controla o bater de asas e o tremor) */}
      <motion.img
        src={randomImg}
        alt=""
        style={{ width: '100%', height: '100%', display: 'block' }}
        // ANIMAÇÃO CAÓTICA: Bater asas + Tremor de rotação
        animate={{ 
            scaleX: [1, 0.6, 1], // Simula o bater de asas comprimindo a imagem
            rotate: [initialRotation, initialRotation + 15, initialRotation - 15, initialRotation] // Tremor
        }}
        transition={{
            scaleX: {
                repeat: Infinity, // Bate asas para sempre
                duration: flapSpeed, 
                ease: "easeInOut"
            },
            rotate: {
                repeat: Infinity, // Treme para sempre
                duration: flapSpeed * 3, // Tremor mais lento que o bater de asas
                ease: "easeInOut",
                repeatType: "mirror"
            }
        }}
      />
    </motion.div>
  );
};


export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showButterflies, setShowButterflies] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setShowButterflies(true);
    setTimeout(() => { onOpen(); }, 3000); // Tempo suficiente para o show
  };

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)', transition: { duration: 1.5 } }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, backgroundColor: 'rgba(0,0,0,0.6)', perspective: '1200px'
      }}
    >
      <div 
        onClick={handleOpenClick}
        style={{ width: '340px', height: '240px', position: 'relative', cursor: 'pointer' }}
      >
        
        {/* 1. FUNDO DO ENVELOPE */}
        <div style={{
           position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
           backgroundColor: '#3b5f94', borderRadius: '10px',
           boxShadow: '0 20px 30px rgba(0,0,0,0.3)'
        }}></div>

        {/* 2. O CARTÃO (Sobe) */}
        <motion.div
          initial={{ y: 0 }}
          animate={isOpening ? { y: -150, zIndex: 5 } : { y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
          style={{
            position: 'absolute', left: '5%', width: '90%', height: '90%', bottom: '5px',
            backgroundColor: '#FFFAF0', borderRadius: '8px', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
          }}
        >
           <span style={{fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: '#D4AF37'}}>XV da Sara</span>
        </motion.div>

        {/* 3. BOLSA DA FRENTE */}
        <div style={{
           position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
           backgroundColor: '#4A6fa5', zIndex: 3, borderRadius: '10px',
           clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)'
        }}></div>

        {/* 4. ABA QUE ABRE */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
             position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
             backgroundColor: '#537ab3', zIndex: 4, borderRadius: '10px',
             transformOrigin: 'top',
             clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
             backfaceVisibility: 'hidden'
          }}
        ></motion.div>
        
        {/* --- O SELO DE CORAÇÃO --- */}
        <AnimatePresence>
        {!isOpening && (
        <motion.div 
            initial={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            style={{
            position: 'absolute', 
            // AJUSTE AQUI: Subi de 55% para 48% para centralizar visualmente no bico
            top: '38%', 
            left: '42%', 
            transform: 'translate(-50%, -50%)', 
            
            zIndex: 10, 
            background: 'linear-gradient(45deg, #D4AF37, #F4C430)', 
            width: '60px', height: '60px', borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '24px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.5)',
            cursor: 'pointer'
            }}
        >
            <FaHeart />
        </motion.div>
        )}
        </AnimatePresence>

        {/* Texto de Instrução */}
        <AnimatePresence>
        {!isOpening && (
          <motion.p 
          exit={{opacity: 0}}
          style={{
            position: 'absolute', bottom: '-50px', width: '100%', textAlign: 'center',
            color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px black', 
            fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px'
          }}>
            Toque no selo para abrir
          </motion.p>
        )}
        </AnimatePresence>

        <AnimatePresence>
          {showButterflies && [...Array(30)].map((_, i) => (
            <Butterfly key={i} id={i} />
          ))}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}