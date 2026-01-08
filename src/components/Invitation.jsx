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
             {/* Imagem de Fundo Fixa */}
             <img 
               src={cinderelaSutilImg} alt=""
               style={{
                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                 width: '90%', 
                 opacity: 0.3,
                 zIndex: 0, pointerEvents: 'none'
               }}
             />
             
             {/* MUDANÇA: Container com Scroll (overflow-y: auto) */}
             <div style={{ 
                position: 'relative', 
                zIndex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: '100%',
                height: '100%',     // Ocupa toda a altura disponível
                overflowY: 'auto',  // Ativa o SCROLL se o texto for grande
                padding: '0 10px 20px 10px' // Espaço extra embaixo para não cortar no scroll
             }}>
                
                <p style={{ 
                    fontSize: '2rem', // Diminuí levemente (era 2.2)
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
                
                {/* Box de Aviso */}
                <div style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                    border: '2px dashed #D4AF37',
                    padding: '15px', // Padding interno reduzido
                    borderRadius: '15px', 
                    maxWidth: '100%', // Garante que não estoure a largura
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
            {/* AQUI ESTÁ A ALTERAÇÃO: adicionei textAlign: 'center' */}
            <p style={{ 
                fontSize: '1rem', 
                color: '#5A3E36', 
                marginBottom: '15px', 
                fontStyle: 'italic',
                textAlign: 'center', // <--- Centraliza o texto
                width: '100%' // Garante que use a largura toda pra centralizar bem
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
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        style={{
          width: '100%', 
          height: '100vh', // Ocupa a tela toda
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '10px' // Espaço de respiro nas bordas
        }}
      >
        
        {/* AQUI ESTÁ A MUDANÇA PRINCIPAL: Usando a classe CSS do index.css */}
        <div className="invitation-card">
          
          {activeContent !== 'convite' && (
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => setActiveContent('convite')}
              style={{ 
                // MUDANÇA: Aumentei para 15px para desgrudar da quina
                position: 'absolute', top: '15px', left: '15px', zIndex: 20,
                background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', 
                width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#5A3E36', fontSize: '1.3rem', boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }}
            >
              <FaArrowLeft />
            </motion.button>
          )}

          {/* Área de Conteúdo (Com Scroll Interno automático) */}
          <div style={{ 
            flex: 1, // Ocupa todo o espaço disponível
            width: '100%',
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative', 
            overflow: 'hidden', // IMPORTANTE: Impede que o card inteiro estoure
            padding: '0 15px' // Padding lateral apenas
          }}>
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>

          {/* Divisor Sutil */}
          <div style={{ width: '100%', height: '2px', background: 'rgba(90, 62, 54, 0.1)', zIndex: 10 }}></div>

          {/* Rodapé de Navegação */}
          <div style={{ 
            padding: '10px 5px', // Padding reduzido
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

      {/* --- MODAIS E ADMIN --- */}
      {showModal && <RsvpModal onClose={() => setShowModal(false)} />}
      
      {/* Botão Admin Discreto */}
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
      height: '100%', // Ocupa a altura total do pai
      paddingTop: '10px' 
    }}
  >
    {/* Título Fixo no Topo */}
    <h2 style={{ 
        fontFamily: "'Montserrat', sans-serif", 
        fontSize: '1.6rem', // Diminuí um pouco para telas pequenas
        marginBottom: '10px', 
        color: '#D4AF37', 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px',
        marginTop: '35px', // Espaço para a seta não cobrir
        flexShrink: 0 // Impede que o título seja esmagado
    }}>
        {title}
    </h2>
    
    {/* Ícone Fixo */}
    <div style={{ marginBottom: '10px', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        {icon}
    </div>
    
    {/* ÁREA DE SCROLL (Onde fica a lista ou o texto) */}
    <div style={{ 
        flex: 1, // Ocupa o resto do espaço
        width: '100%', 
        overflow: 'hidden', // Segura o conteúdo dentro
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0 // <--- O SEGREDO DO FLEXBOX! (Sem isso o scroll some)
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
        className="footer-btn" // <--- ADICIONE ESSA CLASSE
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
      {/* ADICIONE A CLASSE footer-label ABAIXO */}
      <span className="footer-label" style={{ fontSize: '0.6rem', color: '#5A3E36', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
    </div>
  );
};