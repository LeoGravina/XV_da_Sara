import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaGift, FaFemale, FaArrowLeft, FaLock } from 'react-icons/fa';

// IMAGENS
import conviteImg from '../assets/convite_sara.jpg';
import cinderelaSutilImg from '../assets/cinderela-sutil.png';
import fundoCastelo from '../assets/fundo-castelo.jpg';

// COMPONENTES
import RsvpModal from './RsvpModal';
import GiftList from './GiftList';
import AdminGuestList from './AdminGuestList';

const ENDERECO_FESTA = "Av. Santa Marta, 151 - Da Paz, Parauapebas - PA, 68515-000";

const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ENDERECO_FESTA)}`;

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
                objectFit: 'contain', 
                borderRadius: '15px', 
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
              }}
            />
          </motion.div>
        );

      case 'traje':
        return (
          <ContentSection title="Traje" icon={<FaFemale size={50} color="#D4AF37" />}>
             <img 
               src={cinderelaSutilImg} alt=""
               style={{
                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                 width: '90%', 
                 opacity: 0.3,
                 zIndex: 0, pointerEvents: 'none'
               }}
             />
             
             <div style={{ 
                position: 'relative', 
                zIndex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%',
                height: '100%',    
                overflowY: 'auto',  
                padding: '0 10px 20px 10px' 
             }}>
                
                <p style={{ 
                    fontSize: '2rem', 
                    color: '#5A3E36', 
                    margin: '5px 0 10px 0', 
                    fontFamily: "'Great Vibes', cursive",
                    textAlign: 'center'
                }}>
                    Passeio Completo / Social
                </p>
                
                <p style={{ 
                    color: '#666', 
                    marginBottom: '20px', 
                    maxWidth: '350px', 
                    fontSize: '1rem', 
                    textAlign: 'center',
                    lineHeight: '1.4'
                }}>
                  Prepare seu melhor look! Venha elegante, mas confortável para aproveitar a noite.
                </p>
                
                <div style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                    border: '2px dashed #D4AF37',
                    padding: '15px', 
                    borderRadius: '15px', 
                    maxWidth: '100%',
                    width: '90%',
                    marginBottom: '10px'
                }}>
                    <strong style={{ color: '#D4AF37', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', textAlign: 'center' }}>
                       ⚠️ Pedido da Debutante:
                    </strong>
                    <p style={{ color: '#5A3E36', fontSize: '1rem', fontStyle: 'italic', margin: 0, lineHeight: '1.4', textAlign: 'center' }}>
                      "A cor <strong style={{color: '#4A6fa5', fontWeight: '900', fontSize: '1.1rem'}}>AZUL</strong> foi escolhida especialmente para a aniversariante. Por favor, pedimos que não a use!"
                    </p>
                </div>
             </div>
          </ContentSection>
      );

      case 'presentes':
        return (
          <ContentSection title="Lista de Presentes" icon={<FaGift size={60} color="#D4AF37" />}>
            <p style={{ 
                fontSize: '1rem', 
                color: '#5A3E36', 
                marginBottom: '15px', 
                fontStyle: 'italic',
                textAlign: 'center', 
                width: '100%' 
            }}>
              Toque no item para marcar o que você vai presentear! ❤️
            </p>
            
            <div style={{ width: '100%', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
          width: '100%', 
          height: '100dvh', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          boxSizing: 'border-box' 
        }}
      >
        <div className="invitation-card" style={{ maxHeight: '85dvh' }}>
          {activeContent !== 'convite' && (
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setActiveContent('convite')}
              style={{ 
                position: 'absolute', top: '15px', left: '15px', zIndex: 20,
                background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', 
                width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#5A3E36', fontSize: '1.3rem', boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }}
            >
              <FaArrowLeft />
            </motion.button>
          )}

          <div style={{ 
            flex: 1, 
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative', 
            overflow: 'hidden', 
            padding: '0 15px' 
          }}>
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(90, 62, 54, 0.1)', zIndex: 10 }}></div>

          <div style={{ 
            padding: '10px 5px', 
            background: '#FFFAF0', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '5px', 
            justifyItems: 'center', 
            zIndex: 10 
          }}>
            <CircularButton icon={<FaHeart />} label="Confirmar" onClick={() => handleButtonClick('rsvp')} isActive={showModal} />
            <CircularButton icon={<FaMapMarkerAlt />} label="Local" onClick={() => handleButtonClick('map')} />
            <CircularButton icon={<FaFemale />} label="Traje" onClick={() => handleButtonClick('traje')} isActive={activeContent === 'traje'} />
            <CircularButton icon={<FaGift />} label="Presentes" onClick={() => handleButtonClick('presentes')} isActive={activeContent === 'presentes'} />
          </div>
        </div>
      </motion.div>

      {showModal && <RsvpModal onClose={() => setShowModal(false)} />}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', opacity: 0.3, zIndex: 200 }}>
        <button onClick={() => setShowAdmin(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaLock size={15} color="#fff" />
        </button>
      </div>
      
      {showAdmin && <AdminGuestList onClose={() => setShowAdmin(false)} />}
    </>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---
const ContentSection = ({ title, icon, children }) => (
  <motion.div
    key={title} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      width: '100%',
      height: '100%', 
      paddingTop: '10px' 
    }}
  >
    <h2 style={{ 
        fontFamily: "'Montserrat', sans-serif", 
        fontSize: '1.6rem', 
        marginBottom: '10px', 
        color: '#D4AF37', 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px',
        marginTop: '35px', 
        flexShrink: 0 
    }}>
        {title}
    </h2>
    
    <div style={{ marginBottom: '10px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        {icon}
    </div>
    <div style={{ 
        flex: 1, 
        width: '100%', 
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
    }}>
        {children}
    </div>
  </motion.div>
);

const CircularButton = ({ icon, label, onClick, isActive }) => {
  const activeColor = '#D4AF37'; const inactiveColor = '#4A6fa5'; 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <motion.button
        whileTap={{ scale: 0.9 }} onClick={onClick}
        className="footer-btn" 
        style={{
          width: '55px', height: '55px', borderRadius: '50%',
          border: `2px solid ${isActive ? activeColor : inactiveColor}`,
          backgroundColor: isActive ? activeColor : 'white',
          color: isActive ? 'white' : inactiveColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
          cursor: 'pointer', boxShadow: isActive ? `0 0 15px ${activeColor}90` : '0 5px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease', marginBottom: '6px', outline: 'none'
        }}
      >
        {icon}
      </motion.button>
      <span className="footer-label" style={{ fontSize: '0.6rem', color: '#5A3E36', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
    </div>
  );
};