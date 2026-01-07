import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaGift, FaFemale, FaArrowLeft, FaLock } from 'react-icons/fa';

// IMPORTS DAS IMAGENS
import conviteImg from '../assets/convite_sara.jpg';
import cinderelaSutilImg from '../assets/cinderela-sutil.png';
import fundoCastelo from '../assets/fundo-castelo.jpg';

// IMPORTS DOS COMPONENTES
import RsvpModal from './RsvpModal';
import GiftList from './GiftList';
import AdminGuestList from './AdminGuestList';

const MAPS_LINK = "https://maps.app.goo.gl/PBVPutEtUwAcbTS59"; 

export default function Invitation() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeContent, setActiveContent] = useState('convite'); 

  // --- PRELOAD DE IMAGENS ---
  useEffect(() => {
    const imagensParaBaixar = [conviteImg, cinderelaSutilImg, fundoCastelo];
    imagensParaBaixar.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case 'convite':
        return (
          <motion.div
            key="convite-img"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <img
              src={conviteImg}
              alt="Convite"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', // Garante que a imagem inteira apareça sem cortar
                borderRadius: '15px', 
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
              }}
            />
          </motion.div>
        );

      case 'vestimenta':
        return (
          <ContentSection title="Vestimenta" icon={<FaFemale size={60} color="#D4AF37" />}>
             <img 
               src={cinderelaSutilImg} alt=""
               style={{
                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                 width: '90%', 
                 opacity: 0.3, // <--- OPACIDADE AUMENTADA AQUI (0.3)
                 zIndex: 0, pointerEvents: 'none'
               }}
             />
             <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: '2.2rem', color: '#5A3E36', margin: '10px 0', fontFamily: "'Great Vibes', cursive" }}>Esporte Fino</p>
                <p style={{ color: '#666', marginBottom: '30px', maxWidth: '350px', fontSize: '1.1rem' }}>
                  Prepare seu melhor look! Venha elegante, mas confortável para aproveitar a noite.
                </p>
                <div style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px dashed #D4AF37',
                    padding: '25px', borderRadius: '20px', maxWidth: '380px',
                }}>
                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1.2px', fontSize: '0.9rem' }}>
                       ⚠️ Pedido da Debutante:
                    </strong>
                    <p style={{ color: '#5A3E36', fontSize: '1.1rem', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                      "A cor <strong style={{color: '#4A6fa5', fontWeight: '900', fontSize: '1.2rem'}}>AZUL</strong> foi escolhida especialmente para a aniversariante. Por favor, pedimos que não a use!"
                    </p>
                </div>
             </div>
          </ContentSection>
        );

      case 'presentes':
        return (
          <ContentSection title="Lista de Presentes" icon={<FaGift size={60} color="#D4AF37" />}>
            <p style={{ fontSize: '1rem', color: '#5A3E36', marginBottom: '15px', fontStyle: 'italic' }}>
              Toque no item para marcar que você vai presentear! ❤️
            </p>
            {/* Wrapper com altura fixa para o scroll funcionar dentro dele */}
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <GiftList />
            </div>
          </ContentSection>
        );
      default: return null;
    }
  };

  const handleButtonClick = (action) => {
    if (action === 'rsvp') setShowModal(true);
    else if (action === 'map') window.open(MAPS_LINK, '_blank');
    else setActiveContent(action);
  };

  return (
    <>
      <motion.div 
        className="card-scroll-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%', height: '100vh', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', padding: '10px'
        }}
      >
        {/* --- O CARD PRINCIPAL AGORA É ESTÁVEL (SEM PULAR) --- */}
        <div style={{
          backgroundColor: '#FFFAF0', 
          borderRadius: '25px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)', 
          
          // DIMENSÕES FIXAS E GRANDES
          width: '100%',
          maxWidth: '600px',  // Mais largo
          
          // O SEGREDO DA ESTABILIDADE:
          height: '85vh',     // Ocupa 85% da altura da tela SEMPRE
          maxHeight: '850px', // Limite para monitores gigantes
          minHeight: '600px', // Limite para celulares pequenos

          display: 'flex', flexDirection: 'column', position: 'relative',
          overflow: 'hidden' // Corta o que sobrar (segurança)
        }}>
          
          {activeContent !== 'convite' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              onClick={() => setActiveContent('convite')}
              style={{ 
                position: 'absolute', top: '20px', left: '20px', zIndex: 20,
                background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', 
                width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#5A3E36', fontSize: '1.4rem', boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }}
            >
              <FaArrowLeft />
            </motion.button>
          )}

          {/* ÁREA DE CONTEÚDO (Ocupa todo o espaço restante) */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // Centraliza conteúdo pequeno
            position: 'relative',
            overflowY: 'auto' // Scroll aparece AQUI dentro se o conteúdo for maior que o card
          }}>
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>

          {/* DIVISOR */}
          <div style={{ width: '100%', height: '2px', background: 'rgba(90, 62, 54, 0.1)', zIndex: 10 }}></div>

          {/* RODAPÉ FIXO */}
          <div style={{ 
            padding: '20px', 
            background: '#FFFAF0',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', justifyItems: 'center', 
            zIndex: 10 
          }}>
            <CircularButton icon={<FaHeart />} label="Confirmar" onClick={() => handleButtonClick('rsvp')} isActive={showModal} />
            <CircularButton icon={<FaMapMarkerAlt />} label="Local" onClick={() => handleButtonClick('map')} />
            <CircularButton icon={<FaFemale />} label="Vestimenta" onClick={() => handleButtonClick('vestimenta')} isActive={activeContent === 'vestimenta'} />
            <CircularButton icon={<FaGift />} label="Presentes" onClick={() => handleButtonClick('presentes')} isActive={activeContent === 'presentes'} />
          </div>
        </div>
      </motion.div>

      {showModal && <RsvpModal onClose={() => setShowModal(false)} />}

      <div style={{ position: 'fixed', bottom: '10px', left: '10px', opacity: 0.3, zIndex: 200 }}>
        <button onClick={() => setShowAdmin(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Área Restrita">
            <FaLock size={15} color="#fff" />
        </button>
      </div>

      {showAdmin && <AdminGuestList onClose={() => setShowAdmin(false)} />}
    </>
  );
}

// Componentes Auxiliares
const ContentSection = ({ title, icon, children }) => (
  <motion.div
    key={title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}
    style={{ 
      textAlign: 'center', color: '#5A3E36', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      height: '100%', justifyContent: 'center' // Garante centralização
    }}
  >
    <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.8rem', marginBottom: '20px', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{title}</h2>
    <div style={{ marginBottom: '20px', position: 'relative', zIndex: 2 }}>{icon}</div>
    {children}
  </motion.div>
);

const CircularButton = ({ icon, label, onClick, isActive }) => {
  const activeColor = '#D4AF37'; const inactiveColor = '#4A6fa5'; 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
      <motion.button
        whileTap={{ scale: 0.9 }} onClick={onClick}
        style={{
          width: '65px', height: '65px', borderRadius: '50%', // Botões maiores
          border: `2px solid ${isActive ? activeColor : inactiveColor}`,
          backgroundColor: isActive ? activeColor : 'white',
          color: isActive ? 'white' : inactiveColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
          cursor: 'pointer', boxShadow: isActive ? `0 0 15px ${activeColor}90` : '0 5px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease', marginBottom: '10px', outline: 'none'
        }}
      >
        {icon}
      </motion.button>
      <span style={{ fontSize: '0.65rem', color: '#5A3E36', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
    </div>
  );
};