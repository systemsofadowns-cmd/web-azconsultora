/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Globe, 
  DollarSign, 
  Check, 
  Briefcase, 
  Clock, 
  UserCheck, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Building2, 
  Coins, 
  Award, 
  Heart, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Scale,
  Star,
  Quote,
  Calendar,
  Share2,
  Copy,
  Link
} from 'lucide-react';

// @ts-ignore
import paraguayLandscape from "./assets/images/paraguay_landscape_1779889536891.png";
// @ts-ignore
import suaceInvestorMeeting from "./assets/images/suace_investor_meeting_1779889939384.png";
// @ts-ignore
import palacioLopezBg from "./assets/images/palacio_lopez_asuncion_bg_1779891054697.png";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Requirements Tool States
  const [userOrigin, setUserOrigin] = useState<'mercosur' | 'general'>('general');
  
  // Cédula Simulator premium high-security interactive states
  const [isUvMode, setIsUvMode] = useState(false);
  const [signatureType, setSignatureType] = useState<'real' | 'none'>('real');
  const [activeCard, setActiveCard] = useState<'front' | 'back' | null>(null);

  // Sharing Tool for clients states
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareFeedbackMsg, setShareFeedbackMsg] = useState("");
  const [shareConfig, setShareConfig] = useState<'general' | 'mercosur'>('general');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const originParam = params.get('origin');
      if (originParam === 'mercosur' || originParam === 'general') {
        setUserOrigin(originParam);
        setShareConfig(originParam);
      }
    }
  }, []);

  const getShareLink = (kind: 'general' | 'mercosur') => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}${window.location.pathname}?origin=${kind}`;
    }
    return `https://ais-pre-a52zm3e6mg2lh2roqup7nb-87584552827.us-east1.run.app?origin=${kind}`;
  };

  const handleCopyLink = (kind: 'general' | 'mercosur') => {
    const link = getShareLink(kind);
    navigator.clipboard.writeText(link).then(() => {
      setShareFeedbackMsg("¡Enlace copiado con éxito!");
      setTimeout(() => setShareFeedbackMsg(""), 3000);
    }).catch(() => {
      setShareFeedbackMsg("Error al copiar. Copie de forma manual.");
      setTimeout(() => setShareFeedbackMsg(""), 3000);
    });
  };

  const faqData = [
    {
      question: "¿Es obligatoria la presencia física en Paraguay para iniciar mi trámite?",
      answer: "Sí, la legislación de la República del Paraguay exige que la toma de huellas dactilares, firma digitalizada y toma de fotografía biométrica (datos de identificación) se realicen presencialmente ante la Dirección General de Migraciones y el Departamento de Identificaciones de la Policía Nacional. Sin embargo, en AZ Consultora preparamos absolutamente toda tu carpeta de forma anticipada, organizando traducciones oficiales juradas y la validación de tus antecedentes para que resuelvas todo de forma optimizada en tu viaje, el cual generalmente requiere de sólo 3 a 5 días hábiles en Asunción."
    },
    {
      question: "¿Cuánto tiempo demora obtener la Residencia Temporaria y mi primera Cédula Paraguaya?",
      answer: "Por lo general, la Dirección General de Migraciones emite la Resolución de Radicación Temporaria y el carnet migratorio en un periodo aproximado de 60 a 90 días hábiles a partir de la comparecencia física y firma de la carpeta. Una vez que contamos con dicho carnet, procedemos con la solicitud de tu Cédula de Identidad Civil Paraguaya, la cual es emitida por el Departamento de Identificaciones de la Policía en un plazo adicional de 30 a 45 días hábiles."
    },
    {
      question: "¿Puedo tramitar la residencia si soy ciudadano de origen no perteneciente al Mercosur?",
      answer: "¡Totalmente! En AZ Consultora atendemos con éxito a ciudadanos de todo el mundo, incluyendo países de la Unión Europea (Alemania, España, Italia, Francia), Suiza, Reino Unido, Estados Unidos, Canadá y Asia. La única diferencia radica en la legalización previa de tus documentos de origen: para no-Mercosur es requisito contar con la Apostilla de la Haya (o legalización consular según corresponda). Toda traducción al idioma español debe ser efectuada por traductores jurados matriculados ante la Corte Suprema de Justicia en Paraguay, servicio que coordinamos de forma directa."
    },
    {
      question: "¿Cuáles son los impuestos reales que pagaré en Paraguay con mi Residencia Fiscal?",
      answer: "La República del Paraguay se rige exclusivamente por el principio de territorialidad fiscal. Esto significa que únicamente tributas por los ingresos netos generados dentro de los límites del territorio paraguayo. Cualquier ingreso obtenido en el extranjero (por ejemplo: ganancias por inversiones financieras en bolsas internacionales, dividendos pagados por compañías foráneas, rentas inmobiliarias en el exterior, o servicios de consultoría prestados de forma 100% remota a clientes fuera de Paraguay) está sujeto a una tasa impositiva efectiva del 0%. Para rentas generadas localmente en Paraguay, el esquema tributario es la regla triple 10% (10% IVA, 10% impuesto a la renta empresarial, 10% renta personal)."
    },
    {
      question: "¿Se requiere un depósito de dinero en garantía o demostrar ahorros específicos?",
      answer: "Bajo la actual Ley de Migraciones N° 6984/22 de Paraguay, la figura tradicional de acreditar solvencia económica mediante un depósito bancario de $5000 USD ya no es exigible para solicitar la Residencia Temporaria convencional, la cual se ha simplificado significativamente. Esto remueve una barrera financiera importante para freelancers, nómadas digitales y emprendedores. Solamente se aplican requisitos específicos de justificación de capital o inversión si optas por la Residencia Permanente directa para inversionistas vía SUACE (Sistema Unificado de Apertura y Cierre de Empresas)."
    },
    {
      question: "¿Qué diferencia práctica hay entre la Residencia Temporaria de la Ley 6984/22 y la Permanente?",
      answer: "La ley paraguaya actual establece una estructura escalonada para casi todos los inmigrantes. El primer paso obligatorio es la obtención de la Residencia Temporaria, válida por un periodo de 2 años continuos. Durante la vigencia de esta residencia temporal, el titular cuenta con plenos derechos de trabajo, radicación y desarrollo comercial en el país. Al cabo de los 2 años (o con anticipación de 90 días antes del vencimiento), el residente califica y puede solicitar el pase a la Residencia Permanente, la cual se emite con una validez extendida de 10 años prorrogables y le da permanencia indefinida."
    }
  ];

  const testimonialsData = [
    {
      name: "Hans-Werner Meier",
      role: "Inversionista Crypto & Consultor IT",
      country: "Alemania",
      avatar: "H",
      avatarBg: "from-amber-500 to-amber-600 text-slate-950",
      rating: 5,
      date: "Hace 2 meses",
      text: "Elegí Paraguay buscando seguridad jurídica, un estilo de vida más libre e impuestos sumamente atractivos. AZ Consultora hizo que todo el proceso fuera de lo más fluido y transparente posible. En menos de un mes ya tenía mi carnet de radicación de la nueva ley. Muy profesionales, el traductor jurado hizo un trabajo impecable y rápido con mis documentos alemanes."
    },
    {
      name: "Camila Rossini",
      role: "Directora en AgroNegocios SRL",
      country: "Brasil",
      avatar: "C",
      avatarBg: "from-blue-500 to-indigo-600 text-white",
      rating: 5,
      date: "Hace 4 meses",
      text: "Excelente y dedicada atención corporativa integral. El equipo nos ayudó desde cero a abrir la sucursal de nuestra empresa EAS y gestionar de forma coordinada las cuentas bancarias corporativas multimoneda. El acompañamiento físico presencial y personalizado tanto en Identificaciones de la Policía como en Migraciones fue clave para ahorrar valioso tiempo empresarial."
    },
    {
      name: "Santiago Pérez",
      role: "Desarrollador Full-Stack Remoto",
      country: "España",
      avatar: "S",
      avatarBg: "from-emerald-500 to-teal-600 text-slate-950",
      rating: 5,
      date: "Hace 1 mes",
      text: "Buscaba estructurar mi residencia fiscal y mi RUC bajo el principio de territorialidad. Conseguí mi cédula paraguaya en un tiempo récord y sin complicaciones gracias a ellos. El equipo de AZ resolvió de forma inmediata y directa todas mis consultas por WhatsApp. Destaco su absoluta transparencia con los aranceles de ley."
    },
    {
      name: "Thomas Vance",
      role: "Socio en Capital Ventures Inc.",
      country: "Estados Unidos",
      avatar: "T",
      avatarBg: "from-purple-500 to-pink-600 text-white",
      rating: 5,
      date: "Hace 3 meses",
      text: "Tenía muchísimas dudas previas sobre el cumplimiento normativo bancario local viniendo de EE.UU. AZ Consultora estructuró todo por contrato de forma impecable. Me recibieron con chófer corporativo privado en el aeropuerto Silvio Pettirossi y me guaron paso por paso en la policía y notarías de Asunción. Absolutamente recomendados."
    }
  ];
  const [userGoal, setUserGoal] = useState<'residencia_cedula' | 'inversion_empresa' | 'ruc_fiscal'>('residencia_cedula');
  const [stepFilter, setStepFilter] = useState<'general_steps' | 'documents_needed'>('documents_needed');

  // Contact form submission feedback
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceRequested: 'Servicio de Migraciones'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Direct navigation to WhatsApp which bypasses mobile popup blockers securely
      const text = encodeURIComponent(
        `Hola AZConsultora, mi nombre es ${formData.name}. Estoy interesado en el servicio de: ${formData.serviceRequested}. Correo: ${formData.email}. Mensaje: ${formData.message}`
      );
      window.location.href = `https://wa.me/595991857037?text=${text}`;
      setFormSubmitted(false);
    }, 1200);
  };

  const formattedPhone = "+595 991 857 037";
  const whatsappLink = "https://wa.me/595991857037";

  // Data for the 'Por qué elegir Paraguay?' cards
  const whyParaguayCards = [
    {
      id: "carga-impositiva",
      title: "Baja carga impositiva",
      description: "Esquema tributario de régimen triple 10% (10% IVA, 10% de impuesto a la renta empresarial, 10% renta personal). Uno de los más competitivos de toda América Latina, ideal para resguardar patrimonios.",
      highlight: "Solo 10% de Impuestos",
      badge: "Ventaja Fiscal",
      icon: <DollarSign className="w-8 h-8 text-amber-400" />
    },
    {
      id: "inversion-negocios",
      title: "Inversión y negocios",
      description: "Libre flujo de capitales y repatriación de dividendos sin trabas gubernamentales. Sectores en pleno crecimiento (bienes raíces, agro, manufacturas y tecnología) con amplios beneficios arancelarios (Ley Maquila).",
      highlight: "100% Retorno Libre",
      badge: "Incentivo",
      icon: <TrendingUp className="w-8 h-8 text-amber-400" />
    },
    {
      id: "calidad-vida",
      title: "Calidad de vida",
      description: "Clima templado todo el año, naturaleza exuberante y una comunidad local hospitalaria. Gastos de vida sumamente accesibles que permiten mantener un estilo de vida de primer nivel con un presupuesto optimizado.",
      highlight: "Costo de Vida Óptimo",
      badge: "Bienestar",
      icon: <Heart className="w-8 h-8 text-amber-400" />
    },
    {
      id: "estabilidad-economica",
      title: "Estabilidad económica",
      description: "La moneda más estable de Sudamérica (el Guaraní, sin cambios drásticos ni devaluaciones extremas en décadas). Inflación controlada históricamente por debajo del 4.5% anual y un crecimiento robusto sostenido.",
      highlight: "Moneda de Hierro",
      badge: "Seguridad",
      icon: <Scale className="w-8 h-8 text-amber-400" />
    }
  ];

  // Data for services
  const services = [
    {
      id: "servicio-migraciones",
      title: "Servicio de Migraciones",
      shortDescription: "Tramitamos tu residencia temporaria y permanente en Paraguay con acompañamiento completo.",
      longDescription: "Nuestro servicio principal asiste a ciudadanos extranjeros de todo el mundo en la obtención del estatus de residencia legal en la República del Paraguay bajo la Ley 6984/22. Nos encargamos de todo el flujo documental, traducción oficial autorizada, apostillado, y la gestoría estatal ante la Dirección General de Migraciones de forma segura y veloz.",
      icon: <Globe className="w-7 h-7 text-amber-400" />,
      items: [
        "Gestión de residencias temporales y permanentes.",
        "Renovación y actualización de documentos migratorios.",
        "Asistencia en el cambio de categoría migratoria.",
        "Trámites de reagrupación familiar.",
        "Gestión de legalizaciones, apostillas y traducciones certificadas.",
        "Obtención de Residencia Permanente para Inversionistas Extranjeros"
      ],
      detailLabel: "Ver detalle …"
    },
    {
      id: "cedula-identidad",
      title: "Cédula de Identidad",
      shortDescription: "Gestionamos tu documento de identidad paraguayo de forma ágil y sin complicaciones.",
      longDescription: "Tras la obtención de tu libreta de radicación o resolución migratoria, te acompañamos presencialmente al Departamento de Identificaciones de la Policía Nacional para solicitar la Cédula de Identidad Civil Paraguaya, documento vital para el desarrollo diario, transacciones e instalación comercial duradera en Paraguay.",
      icon: <UserCheck className="w-7 h-7 text-amber-400" />,
      items: [
        "Cédula para extranjeros",
        "Renovaciones",
        "Trámite express",
        "Licencia de Conducir"
      ]
    },
    {
      id: "residencia-fiscal",
      title: "Residencia Fiscal (RUC)",
      shortDescription: "Obtén tu Registro Único de Contribuyente y cumple con tus obligaciones fiscales en Paraguay.",
      longDescription: "Ideal para profesionales internacionales, nómadas digitales y empresarios extranjeros. Al configurar tu residencia fiscal paraguaya, aprovechas la tributación casi nula para utilidades de fuente extranjera.",
      icon: <Coins className="w-7 h-7 text-amber-400" />,
      items: [
        "Inscripción en SET",
        "RUC personas físicas",
        "RUC personas jurídicas",
        "Optimización bajo el principio de territorialidad"
      ]
    },
    {
      id: "apertura-empresas",
      title: "Apertura de Empresas",
      shortDescription: "Constituimos tu empresa en Paraguay de acuerdo a tus necesidades estructurando tu capital.",
      longDescription: "Creamos las estructuras de sociedades mercantiles que mejor se adapten a tu plan (como S.A., S.R.L. o las ágiles Empresas por Acciones Simplificadas - E.A.S.) en tiempo récord.",
      icon: <Building2 className="w-7 h-7 text-amber-400" />,
      items: [
        "Constitución de Sociedades Anónimas y SRL",
        "Estructura express para E.A.S. digitalizable",
        "Elaboración de estatutos a la medida corporativa",
        "Inscripción legal ante ministerios correspondientes"
      ]
    },
    {
      id: "apertura-bancaria",
      title: "Apertura Bancaria",
      shortDescription: "Te acompañamos en la apertura de cuentas bancarias y acceso a servicios financieros en Paraguay.",
      longDescription: "Nos encargamos de canalizar la exigente carpeta documental regulatoria ('Compliance') con los oficiales clave de los bancos locales para asegurar el alta de tu cuenta multimoneda.",
      icon: <Award className="w-7 h-7 text-amber-400" />,
      items: [
        "Presentación comercial exclusiva ante bancos de plaza",
        "Apertura ágil de cuentas corrientes en USD y PYG",
        "Elaboración previa de perfiles fiscales aceptables",
        "Habilitación de pasarelas y banca electrónica internacional"
      ]
    },
    {
      id: "servicios-adicionales",
      title: "Servicios Adicionales",
      shortDescription: "Servicios independientes de soporte legal y gestiones complementarias ante organismos públicos.",
      longDescription: "Puedes contratar de forma independiente la validación de tu expediente de entrada sin obligación de un plan migratorio integral complejo con nuestra firma.",
      icon: <FileText className="w-7 h-7 text-amber-450" />,
      items: [
        "Apostillados express de Documentos. (de la Haya)",
        "Traducciones legalizadas",
        "Legalizaciones de documentos.",
        "Trámites ante los organismos públicos (Interpol, Pol de identificaciones, etc).",
        "Licencia de Conducir (gestión y canje)."
      ]
    }
  ];

  // Requirements Helper details based on origin
  const requirementsData = {
    mercosur: {
      title: "Ciudadanos del MERCOSUR / Estados Asociados",
      subtitle: "Paraguay ofrece el acuerdo de residencia simplificada facilitado para países hermanos sudamericanos.",
      documents: [
        "Pasaporte Vigente o Cédula de Identidad Civil original vigente de tu país.",
        "Certificado de Antecedentes Penales de tu país de origen, debidamente legalizado o con Apostilla de la Haya.",
        "Certificado de Nacimiento original apostillado.",
        "Certificado de Estado Civil (si corresponde) para ratificar parentescos, apostillado o legalizado.",
        "Certificado de Antecedentes Penales para Extranjeros de la Policía de Paraguay (lo tramitamos juntos en Asunción).",
        "Certificado de Interpol de Paraguay (lo gestionamos juntos en Asunción)."
      ]
    },
    general: {
      title: "Ciudadanos Extracomunitarios (EE.UU., Europa, Asia, etc.)",
      subtitle: "Bajo la legislación actual simplificada, cualquier extranjero puede obtener residencia paraguaya acreditante.",
      documents: [
        "Pasaporte original vigente (con sello formal de ingreso migratorio a Paraguay).",
        "Certificado de Antecedentes Penales oficial del país de origen y de donde residiste los últimos 3 años, debidamente Apostillados por la Haya o Consulado de Paraguay.",
        "Certificado de Nacimiento expedido por el registro civil de tu país, con Apostilla de la Haya.",
        "Certificado de Estado Civil apostillado (si es aplicable, soltero es declarado juradamente).",
        "Acreditación de solvencia o solvencia profesional (título universitario legalizado, o solvencia mediante un depósito bancario temporal u otra modalidad regulatoria)."
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Dynamic Header */}
      <header id="app-header" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <span className="font-serif text-slate-950 font-bold text-xl">AZ</span>
            </div>
            <div>
              <span className="font-serif text-xl tracking-wider font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                AZConsultora
              </span>
              <p className="text-[9px] uppercase tracking-widest text-slate-400">Asesoría Migratoria Premium</p>
            </div>
          </a>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <a href="#" id="nav-inicio" className="text-slate-200 hover:text-amber-400 transition-colors">Inicio</a>
            <a href="#porque-paraguay" id="nav-porque" className="text-slate-400 hover:text-amber-400 transition-colors">Por qué Paraguay</a>
            <a href="#servicios" id="nav-servicios" className="text-slate-400 hover:text-amber-400 transition-colors">Servicios</a>
            <a href="#proceso" id="nav-proceso" className="text-slate-400 hover:text-amber-400 transition-colors">Requisitos</a>
            <a href="#contacto" id="nav-contacto" className="text-slate-400 hover:text-amber-400 transition-colors">Contacto</a>
            


            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noreferrer" 
              id="cta-whatsapp-header"
              className="ml-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-full flex items-center space-x-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp: {formattedPhone}</span>
            </a>
          </nav>

          {/* Mobile hamburger icon menu button */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-400 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-amber-500/20 px-4 py-6 space-y-4"
            >
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-amber-400 text-base py-1">Inicio</a>
              <a href="#porque-paraguay" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-amber-400 text-base py-1">Por qué Paraguay</a>
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-amber-400 text-base py-1">Servicios</a>
              <a href="#proceso" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-amber-400 text-base py-1">Requisitos</a>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-amber-400 text-base py-1">Contacto</a>
              
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <a 
                  href={whatsappLink}
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-emerald-500 text-slate-950 font-bold p-3 rounded-xl flex items-center justify-center space-x-2 shadow-md hover:bg-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 fill-slate-950" />
                  <span>WhatsApp: {formattedPhone}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section with high-impact sunset over Paraguay River and 100% Paraguayan/Guarani Flag details */}
      <section id="hero" className="relative min-h-[100vh] xl:min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
        
        {/* Background Image of Palacio de los López with beautiful dark & ambient gradients overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={palacioLopezBg} 
            alt="Palacio de los López en Asunción con sutil iluminación al atardecer" 
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.55] saturate-[0.95]"
            referrerPolicy="no-referrer"
          />
          {/* Ambient rich gradients overlay with soft patriotic red, white and blue lens-flare hues */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/65 pointer-events-none" />
          
          {/* Glowing patriotic colorful orbs representing the Paraguayan flag in the background */}
          <div className="absolute top-1/4 left-1/3 w-[30%] h-[30%] bg-[#D5151A]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[30%] h-[30%] bg-[#0038A8]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Floating Beautiful Paraguayan Flag badge for premium identity decoration */}
        <div className="absolute top-6 right-6 lg:right-12 z-10 sm:flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/35 shadow-2xl">
          <div className="flex space-x-1 items-center">
            <div className="w-4 h-2.5 bg-[#D5151A] rounded-sm" />
            <div className="w-4 h-2.5 bg-white flex items-center justify-center rounded-sm">
              <div className="w-1 h-1 rounded-full bg-amber-500" />
            </div>
            <div className="w-4 h-2.5 bg-[#0038A8] rounded-sm" />
          </div>
          <span className="text-[11px] tracking-widest uppercase text-amber-300 font-bold font-sans">
            100% IDENTIDAD GUARANÍ 🇵🇾
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Header Text */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/20 via-white/10 to-blue-600/20 text-white border border-white/20 px-4.5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-amber-300">Asesoramiento Legal de Élite en Paraguay</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold text-white tracking-tight leading-none"
            >
              Residencia Paraguaya <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent italic font-serif">
                Express
              </span>{" "}
              <span className="text-white">para extranjeros</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-200 max-w-xl font-light leading-relaxed font-sans border-l-2 border-amber-500/40 pl-4 py-1"
            >
              <strong className="text-white font-bold">AZ Consultora</strong> ayuda a extranjeros a obtener <span className="text-white font-semibold">residencia, cédula, RUC y abrir empresas</span> en Paraguay, con <strong className="text-amber-300 font-bold">gestión integral, rápida y segura</strong>.
            </motion.p>

            {/* Premium Highlights checks with high visibility */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            >
              <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded-full bg-[#D5151A]/20">
                  <Check className="w-4.5 h-4.5 text-red-400 shrink-0" />
                </div>
                <span className="font-bold text-white text-base">Servicio de Migraciones</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded-full bg-slate-100/10">
                  <Check className="w-4.5 h-4.5 text-slate-100 shrink-0" />
                </div>
                <span className="font-bold text-white text-base font-sans">Cédula de Identidad</span>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded-full bg-[#0038A8]/20">
                  <Check className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                </div>
                <span className="font-bold text-white text-base">Apertura de Empresas</span>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/60 backdrop-blur-sm p-3.5 rounded-xl border border-slate-800">
                <div className="p-1 rounded-full bg-amber-500/20">
                  <Check className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                </div>
                <span className="font-bold text-white text-base">Apertura Bancaria</span>
              </div>
            </motion.div>

            {/* CTAs buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noreferrer"
                id="cta-whatsapp-hero"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-widest px-8 py-5.5 rounded-xl flex items-center justify-center space-x-3 shadow-2xl shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <MessageSquare className="w-5.5 h-5.5 fill-slate-950" />
                <span>Contactar por WhatsApp</span>
              </a>

              <a 
                href="#servicios"
                className="bg-slate-900/90 hover:bg-slate-850 text-slate-200 hover:text-white px-8 py-5.5 rounded-xl border-2 border-slate-800 hover:border-amber-500/60 flex items-center justify-center space-x-2 backdrop-blur-sm active:scale-98 transition-all text-sm font-bold tracking-wider"
              >
                <span>Ver Servicios</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Interactive CSS Biometric Cédula de Identidad (Frente y Dorso) representing the real Paraguayan document */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center relative py-12 lg:py-0 w-full">
            
            {/* Visual backdrop glow */}
            <div className="absolute w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            
            <div className="w-full max-w-[290px] sm:max-w-[620px] lg:max-w-[315px] xl:max-w-[620px] relative py-4">
              
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center w-full relative -space-y-16 sm:space-y-0 sm:-space-x-20 lg:-space-y-16 lg:space-x-0 xl:-space-x-20 xl:space-y-0">
                
                {/* CARD 1: FRENTE DE LA CÉDULA (Front side, styled exactly like real biometric document) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  animate={{ 
                    opacity: 1, 
                    scale: activeCard === 'front' ? 1.05 : activeCard === 'back' ? 0.93 : 1,
                    rotate: activeCard === 'front' ? 0 : activeCard === 'back' ? -6 : -2,
                    zIndex: activeCard === 'front' ? 30 : activeCard === 'back' ? 10 : 20,
                    x: activeCard === 'front' ? -6 : activeCard === 'back' ? -12 : 0,
                    y: activeCard === 'front' ? -6 : activeCard === 'back' ? 4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  onMouseEnter={() => setActiveCard('front')}
                  onMouseLeave={() => setActiveCard(null)}
                  onTouchStart={() => setActiveCard('front')}
                  className={`w-[290px] h-[183px] sm:w-[330px] sm:h-[208px] lg:w-[315px] lg:h-[199px] xl:w-[330px] xl:h-[208px] rounded-xl relative cursor-pointer select-none overflow-hidden p-2.5 sm:p-3 lg:p-2.5 xl:p-3 flex flex-col justify-between shrink-0 transition-all duration-500 ${isUvMode ? 'shadow-[0_25px_60px_rgba(79,70,229,0.35)] shadow-purple-500/10 border border-purple-500/30' : 'shadow-[0_22px_45px_rgba(0,0,0,0.22)] border border-white/95'}`}
                  style={{ backgroundImage: isUvMode ? "linear-gradient(135deg, #09021c 0%, #060114 45%, #03061f 100%)" : "linear-gradient(135deg, #fcecee 0%, #faebf2 28%, #e1eefa 68%, #d0e5f5 100%)" }}
                >
                  {/* Outer security print lines & intricate dual-tone Guilloche curves */}
                  <div className="absolute inset-0 opacity-[0.38] pointer-events-none transition-opacity duration-500">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="real-guilloche-vector" width="70" height="70" patternUnits="userSpaceOnUse">
                          <path d="M 0 10 Q 17.5 5, 35 15 T 70 10" fill="none" stroke={isUvMode ? "#bef264" : "#9e1f3b"} strokeWidth={isUvMode ? "0.32" : "0.22"} opacity={isUvMode ? "0.8" : "0.5"} />
                          <path d="M 0 20 Q 17.5 25, 35 15 T 70 20" fill="none" stroke={isUvMode ? "#22d3ee" : "#0038A8"} strokeWidth={isUvMode ? "0.32" : "0.22"} opacity={isUvMode ? "0.8" : "0.5"} />
                          <path d="M 0 35 Q 25 20, 35 40 T 70 35" fill="none" stroke={isUvMode ? "#f43f5e" : "#9e1f3b"} strokeWidth="0.18" opacity={isUvMode ? "0.7" : "0.4"} />
                          <path d="M 15 0 Q 35 20, 15 40 T 15 70" fill="none" stroke={isUvMode ? "#e0f2fe" : "#0038A8"} strokeWidth="0.18" opacity={isUvMode ? "0.6" : "0.4"} />
                          <circle cx="35" cy="35" r="33" fill="none" stroke={isUvMode ? "#22d3ee" : "#0038A8"} strokeWidth="0.15" strokeDasharray="1 2" opacity="0.25" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#real-guilloche-vector)" />
                    </svg>
                  </div>

                  {/* Central red-pink Official Stamp Watermark Seal of the Republic (Outstanding photorealism!) */}
                  {!isUvMode && (
                    <div className="absolute left-[30%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.24] pointer-events-none mix-blend-multiply z-0">
                      <svg className="w-full h-full text-[#9e1f3b]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
                        <circle cx="50" cy="50" r="42" strokeDasharray="2 1" />
                        <circle cx="50" cy="50" r="38" strokeWidth="0.4" />
                        <circle cx="50" cy="50" r="28" strokeDasharray="1 0.5" />
                        <text   id="stampText" x="50" y="58" fontSize="2.8" fontWeight="900" fill="currentColor" textAnchor="middle" stroke="none" className="font-sans tracking-widest uppercase">REPÚBLICA DEL PARAGUAY</text>
                        {/* Beautiful star inside */}
                        <polygon points="50,41 51.5,44.5 55,45 52.5,47.5 53.2,51 50,49.2 46.8,51 47.5,47.5 45,45 48.5,44.5" fill="currentColor" stroke="none" />
                        {/* Fine decorative rays */}
                        <circle cx="50" cy="50" r="14" strokeWidth="0.15" strokeDasharray="0.5 0.5" />
                      </svg>
                    </div>
                  )}

                  {/* Holographic Interactive Glossy Sheet Sheen Overlay */}
                  <motion.div 
                    animate={{ 
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "linear" 
                    }}
                    className={`absolute inset-0 pointer-events-none mix-blend-overlay z-25 transition-all duration-1000 ${isUvMode ? 'opacity-[0.14]' : 'opacity-[0.75]'}`}
                    style={{
                      backgroundImage: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.22) 0%, rgba(244,63,94,0.18) 45%, rgba(234,179,8,0.12) 100%)",
                      backgroundSize: "200% 200%"
                    }}
                  />

                  {/* Curving Elegant Pink Security Ribbon in Top Right Corner (Matches real card scanned color blocking) */}
                  <div className={`absolute -right-6 -top-12 w-44 h-28 rounded-full filter blur-[1px] rotate-[15deg] border-b pointer-events-none duration-700 ${isUvMode ? 'bg-[#9333ea]/15 border-purple-500/20' : 'bg-[#fcd3dd]/35 border-[#fbc2eb]/40'}`} />
                  <div className={`absolute -right-2 -top-6 w-32 h-20 rounded-full filter blur-[3px] pointer-events-none duration-700 ${isUvMode ? 'bg-[#c084fc]/10' : 'bg-[#f4b5c7]/20'}`} />

                  {/* Left Side Tilted Vertical Text Watermark (PARAGUAY REPUBLICA) */}
                  <div className={`absolute left-[3px] top-10 bottom-10 flex flex-col justify-between pointer-events-none text-[8px] sm:text-[9.2px] font-sans font-black tracking-widest select-none uppercase -rotate-90 origin-left translate-x-1 duration-500 ${isUvMode ? 'text-indigo-400/15' : 'text-[#9e1f3b]/7'}`}>
                    PARAGUAY REPUBLICA
                  </div>

                  {/* National Seal Watermark in center background (Military-style coat of arms) */}
                  <div className={`absolute left-[135px] sm:left-[155px] top-[42px] pointer-events-none w-28 h-28 flex items-center justify-center transition-all duration-500 ${isUvMode ? 'opacity-[0.12] text-purple-400' : 'opacity-[0.16] text-[#9e1f3b]'}`}>
                    <svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
                      <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="0.75" />
                      <circle cx="18" cy="18" r="14.5" stroke="currentColor" strokeWidth="0.42" strokeDasharray="1.5 0.7" />
                      <text x="18" y="27.5" fontSize="2.8" fontWeight="bold" fill="currentColor" textAnchor="middle" fontFamily="sans-serif">REPÚBLICA DEL PARAGUAY</text>
                      <polygon points="18,10 20,15 25,15.5 21,19 22.5,23.5 18,20.5 13.5,23.5 15,19 11,15.5 16,15" fill="currentColor" />
                    </svg>
                  </div>

                  {/* FLYING BIRD WATERMARK on front-right side of the card (As seen in scanned physical card) */}
                  <div className={`absolute right-[40px] sm:right-[48px] xl:right-[55px] bottom-[58px] sm:bottom-[65px] xl:bottom-[70px] pointer-events-none z-10 animate-pulse transition-all duration-500 ${isUvMode ? 'opacity-85 text-cyan-400 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'opacity-[0.24] text-white/95'}`} style={{ animationDuration: '4s' }}>
                    <svg className="w-14 h-12 sm:w-16 sm:h-14 xl:w-20 xl:h-16 fill-current" viewBox="0 0 100 80">
                      <path d="M90,75 C70,68 55,50 48,32 C43,26 40,15 45,5 C42,12 36,25 24,35 C15,42 5,46 0,55 C12,52 25,48 35,40 C38,48 35,60 48,78 C46,65 52,52 58,45 C68,52 78,65 90,75 Z" />
                    </svg>
                  </div>

                  {/* Holographic Silhouette Map of Paraguay (Perfected path & orange-amber gradient look!) */}
                  <div className="absolute left-[105px] sm:left-[118px] xl:left-[128px] top-[102px] sm:top-[118px] xl:top-[128px] pointer-events-none select-none z-10 transition-all duration-500">
                    <svg className={`w-[30px] h-[42px] sm:w-[34px] sm:h-[48px] xl:w-[38px] xl:h-[54px] transition-all duration-500 ${isUvMode ? 'text-red-500/80 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.85)] fill-current' : 'opacity-[0.82] filter drop-shadow-[0.5px_1px_1px_rgba(180,83,9,0.355)]'}`} viewBox="0 0 100 140">
                      {!isUvMode && (
                        <defs>
                          <linearGradient id="map-gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#c2410c" stopOpacity="0.85" />
                          </linearGradient>
                        </defs>
                      )}
                      <path 
                        d="M35,15 L42,12 L50,18 L58,15 L62,25 L70,30 L78,28 L85,38 L88,50 L84,62 L78,70 L68,82 L58,95 L48,105 L35,115 L28,110 L22,98 L25,82 L30,68 L32,54 L28,40 L30,28 Z" 
                        fill={isUvMode ? "currentColor" : "url(#map-gold-foil)"}
                      />
                    </svg>
                  </div>

                  {/* Forensic glowing components exclusively active in UV Light Mode */}
                  {isUvMode && (
                    <div className="absolute inset-0 bg-transparent pointer-events-none z-20 transition-all duration-500">
                      {/* Fluorescent microscopic security fiber threads */}
                      <div className="absolute top-[20px] left-[50px] w-6 h-4 border-l border-t border-dashed border-lime-300/40 rounded-tl-full rotate-[15deg] blur-[0.2px] animate-pulse" />
                      <div className="absolute bottom-[40px] left-[155px] w-8 h-3 border-r border-b border-dashed border-pink-400/40 rounded-br-full -rotate-[45deg] blur-[0.2px]" />
                      <div className="absolute top-[80px] right-[70px] w-5 h-5 border-t border-r border-dashed border-cyan-400/50 rounded-tr-full rotate-[110deg] blur-[0.3px]" />
                      <div className="absolute bottom-[15px] right-[130px] w-10 h-2 border-b border-l border-dashed border-lime-400/45 rounded-bl-[12px] rotate-[5deg]" />

                      {/* Giant Police department central stamp glowing neon lime-green */}
                      <div className="absolute inset-x-0 inset-y-2 flex items-center justify-center opacity-80">
                        <svg className="w-40 h-40 text-lime-400/70 filter drop-shadow-[0_0_8px_rgba(163,230,53,0.7)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.45">
                          <circle cx="50" cy="50" r="38" strokeDasharray="1.5 1.5" />
                          <circle cx="50" cy="50" r="30" strokeWidth="0.3" />
                          <text x="50" y="58" fontSize="3.8" fontWeight="bold" fill="currentColor" textAnchor="middle" stroke="none" className="tracking-widest uppercase font-mono">IDENTIFICACIONES</text>
                          <line x1="50" y1="12" x2="50" y2="45" strokeWidth="0.6" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Vertical SPECIMEN text on the far RHS */}
                  <div className="absolute right-[-14px] top-0 bottom-0 flex items-center justify-center pointer-events-none select-none z-20">
                    <span className={`rotate-[270deg] text-[15px] sm:text-[18px] xl:text-[20px] font-sans font-black tracking-[0.22em] uppercase duration-500 ${isUvMode ? 'text-indigo-400/10' : 'text-slate-800/15'}`}>
                      SPECIMEN
                    </span>
                  </div>

                  {/* Top Header: Circular Official Seal Logo + Republica del Paraguay titles */}
                  <div className={`flex items-center space-x-2.5 relative z-10 mt-1 pb-1 border-b text-left duration-500 ${isUvMode ? 'border-indigo-500/20' : 'border-[#cca3e2]'}`}>
                    <div className={`w-8 h-8 sm:w-[35px] sm:h-[35px] xl:w-10 xl:h-10 rounded-full border bg-white flex items-center justify-center p-0.5 shrink-0 shadow-sm transition-all duration-500 ${isUvMode ? 'border-purple-500/40 bg-slate-950/80 shadow-purple-500/5' : 'border-blue-900/20 bg-white'}`}>
                      <svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="17" fill={isUvMode ? "#09021c" : "white"} stroke={isUvMode ? "#a3e635" : "#0038A8"} strokeWidth="1.1" />
                        <circle cx="18" cy="18" r="14.5" fill="none" stroke={isUvMode ? "#f43f5e" : "#D5151A"} strokeWidth="0.45" strokeDasharray="1.2 0.6" />
                        <text x="18" y="28.2" fontSize="2.9" fontWeight="900" fill={isUvMode ? "#bef264" : "#0038A8"} textAnchor="middle" fontFamily="sans-serif">PARAGUAY</text>
                        {/* Central gold star */}
                        <polygon points="18,10.5 19.3,13.8 22.5,14.1 19.9,16.4 20.7,19.6 18,17.7 15.3,19.6 16.1,16.4 13.5,14.1 16.7,13.8" fill={isUvMode ? "#bef264" : "#EAB308"} />
                      </svg>
                    </div>
                    <div className="leading-none text-left">
                      <h4 className={`text-[10.5px] sm:text-[11.5px] xl:text-[12.5px] font-black tracking-wider uppercase font-sans transition-all duration-500 ${isUvMode ? 'text-indigo-200' : 'text-slate-900'}`}>
                        REPÚBLICA DEL PARAGUAY
                      </h4>
                      <p className={`text-[8.5px] sm:text-[9px] xl:text-[9.5px] font-bold tracking-wider font-sans mt-0.5 italic transition-all duration-500 ${isUvMode ? 'text-pink-400' : 'text-[#9e1f3b]'}`}>
                        Cédula de Identidad Civil
                      </p>
                    </div>
                  </div>

                  {/* Middle Area: Face Portrait on left, Personal Names in middle, Vencimiento/DONANTE on right */}
                  <div className="grid grid-cols-12 gap-1 items-center relative z-10 py-1 flex-1">
                    
                    {/* Left Column: Portrait and Document Number */}
                    <div className="col-span-4 flex flex-col items-center">
                      <div className={`w-[70px] h-[85px] sm:w-[82px] sm:h-[100px] xl:w-[92px] xl:h-[112px] rounded-sm border overflow-hidden relative transition-all duration-500 ${isUvMode ? 'bg-indigo-950/40 border-purple-500/70 shadow-[0_0_12px_rgba(163,230,53,0.25)]' : 'bg-[#e2e8f0] border-slate-400/80 shadow-md'}`}>
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=240" 
                          alt="María Alejandra Martínez - Specimen" 
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover filter contrast-[1.28] brightness-[1.02] duration-550 ${isUvMode ? 'grayscale select-none opacity-60 mix-blend-luminosity' : 'grayscale'}`}
                        />
                        {/* High security horizontal lines overlapping photograph */}
                        <div className={`absolute inset-0 opacity-[0.25] transition-all duration-500 bg-[size:3.5px_3.5px] pointer-events-none ${isUvMode ? 'bg-[linear-gradient(to_bottom,transparent_90.5%,rgba(34,211,238,0.5)_90.5%),linear-gradient(to_right,transparent_90.5%,rgba(236,72,153,0.5)_90.5%)]' : 'bg-[linear-gradient(to_bottom,transparent_90.5%,rgba(0,56,168,0.25)_90.5%),linear-gradient(to_right,transparent_90.5%,rgba(213,21,26,0.22)_90.5%)]'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent mix-blend-overlay pointer-events-none" />
                        
                        {/* Micro-Biometric eID card symbol nested on portrait */}
                        <div className={`absolute bottom-1 right-1 w-[13px] h-[9px] border rounded-sm flex items-center justify-center p-[1px] ${isUvMode ? 'border-lime-400 text-lime-400 bg-slate-900/40' : 'border-white/80 text-white bg-slate-950/40'} text-[4px] leading-none pointer-events-none transition-all`}>
                          <div className="w-[3px] h-[3px] rounded-full bg-current" />
                          <div className="absolute w-[9px] h-[0.8px] bg-current" />
                        </div>
                      </div>
                      
                      {/* Microprint Text Border directly below the photo frame */}
                      <div className={`w-[70px] sm:w-[82px] xl:w-[92px] overflow-hidden whitespace-nowrap text-[4.2px] sm:text-[4.8px] uppercase font-mono tracking-tighter leading-none select-none mt-[1px] transition-all ${isUvMode ? 'text-indigo-400/30' : 'text-slate-500/65'}`}>
                        MARIALEJANDRAMARTINEZCENTURIONMARIALEJANDRAMARTINEZ
                      </div>
                      
                      {/* Document number "Nº 8.958.445" */}
                      <div className="mt-0.5 text-center font-mono leading-none">
                        <span className={`text-[6.8px] sm:text-[7.5px] font-sans font-bold mr-0.5 duration-500 ${isUvMode ? 'text-pink-400' : 'text-[#9e1f3b]'}`}>Nº</span>
                        <span className={`font-extrabold text-[10.5px] sm:text-[12.5px] xl:text-[13.5px] tracking-wide duration-500 ${isUvMode ? 'text-purple-300 font-black' : 'text-slate-950'}`}>8.958.445</span>
                      </div>
                    </div>

                    {/* Middle Column: Personal names & handwritten signature */}
                    <div className="col-span-5 space-y-1.5 pl-1.5 text-left transition-all">
                      <div className="leading-none text-left">
                        <span className={`text-[5.5px] sm:text-[6.5px] xl:text-[7px] font-sans font-extrabold tracking-wider block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>APELLIDOS</span>
                        <span className={`font-sans font-black text-[10.5px] sm:text-[11.8px] xl:text-[12.8px] tracking-wide uppercase leading-tight block transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>
                          MARTINEZ CENTURION
                        </span>
                      </div>

                      <div className="leading-none text-left">
                        <span className={`text-[5.5px] sm:text-[6.5px] xl:text-[7px] font-sans font-extrabold tracking-wider block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>NOMBRES</span>
                        <span className={`font-sans font-black text-[10.5px] sm:text-[11.8px] xl:text-[12.8px] tracking-wide uppercase leading-tight block transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>
                          MARIA ALEJANDRA
                        </span>
                      </div>

                      {/* Handwritten dynamic/reactive pen ink signature positioned over map watermark */}
                      <div className="relative h-6 mt-1 flex items-center">
                        {signatureType === 'real' ? (
                          <span 
                            className={`absolute -rotate-[8deg] left-1 sm:left-2 font-serif italic text-[11.5px] sm:text-[13.5px] xl:text-[15.5px] font-bold select-none tracking-wider leading-none py-0.5 filter drop-shadow-[0.5px_0.5px_0.5px_rgba(0,0,0,0.1)] transition-all duration-500 ${isUvMode ? 'text-cyan-300 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]' : 'text-blue-800'}`} 
                            style={{ fontFamily: "'Dancing Script', cursive, serif" }}
                          >
                            M. Alejandra Mtz
                          </span>
                        ) : (
                          <span className={`absolute left-1 border px-1.5 py-0.5 rounded text-[5px] sm:text-[6.2px] tracking-widest font-sans font-black uppercase transition-all duration-500 ${isUvMode ? 'border-purple-600/60 bg-purple-950/20 text-purple-400' : 'border-[#9e1f3b]/30 bg-red-50/10 text-[#9e1f3b]/80'}`}>
                            sin Firma
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Fechas & Donante aligned vertically */}
                    <div className={`col-span-3 pl-1 text-left space-y-1.5 border-l transition-colors duration-500 ${isUvMode ? 'border-indigo-500/20' : 'border-[#cca3e2]/40'}`}>
                      <div className="leading-none text-left">
                        <span className={`text-[5px] sm:text-[5.8px] xl:text-[6.5px] font-sans font-bold leading-none block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>FECHA DE VENCIMIENTO</span>
                        <span className={`font-mono font-black text-[9px] sm:text-[10px] xl:text-[11px] mt-0.5 block tracking-wide transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>23-03-2033</span>
                      </div>
                      
                      <div className="leading-none text-left pt-0.5 pb-1 relative">
                        <span className={`text-[5px] sm:text-[5.8px] xl:text-[6.5px] font-sans font-bold leading-none block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>DONANTE</span>
                        <span className={`font-sans font-black text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] mt-0.5 block transition-colors duration-500 ${isUvMode ? 'text-indigo-250' : 'text-[#121826]'}`}>SI</span>
                      </div>

                      {/* Micro stencil barcode or vertical spec label */}
                      <div className={`text-[5.5px] font-mono tracking-widest pt-1 uppercase font-semibold transition-colors ${isUvMode ? 'text-purple-550/40' : 'text-slate-400'}`}>
                        DOC CO-B
                      </div>
                    </div>

                  </div>

                  {/* INTRICATE BLUE ROSETTE MANDALA & GHOST PHOTO OVERLAY (Perfected matching physical card circular rosette!) */}
                  <div className="absolute right-[8px] sm:right-[12px] xl:right-[15px] bottom-[30px] sm:bottom-[34px] xl:bottom-[38px] w-12 h-14 sm:w-14 sm:h-16 xl:w-16 xl:h-18 flex items-center justify-center z-10 pointer-events-none">
                    {/* Background Holographic Rosette vector stamps */}
                    <svg className={`absolute w-full h-full animate-spin-slow transition-all duration-500 ${isUvMode ? 'text-cyan-400 opacity-80 filter drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]' : 'text-blue-500/40'}`} style={{ animationDuration: '45s' }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.32">
                      <circle cx="50" cy="50" r="45" strokeDasharray="1 1" />
                      <circle cx="50" cy="50" r="35" strokeDasharray="2 2" />
                      <circle cx="50" cy="50" r="25" />
                      <path d="M 50 5 Q 40 30, 50 50 Q 60 30, 50 5 Z" />
                      <path d="M 50 95 Q 40 70, 50 50 Q 60 70, 50 95 Z" />
                      <path d="M 5 50 Q 30 40, 50 50 Q 30 60, 5 50 Z" />
                      <path d="M 95 50 Q 70 40, 50 50 Q 70 60, 95 50 Z" />
                    </svg>
                    
                    {/* Secondary Ghost Portrait with rounded-full or soft stamp borders, grey scale with very high transparency */}
                    <div className={`w-[22px] h-[26px] sm:w-[26px] sm:h-[30px] overflow-hidden grayscale rounded-full border filter blur-[0.25px] transition-all duration-500 ${isUvMode ? 'opacity-50 border-cyan-400 bg-cyan-950/20' : 'opacity-[0.22] border-blue-400/25'}`}>
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=120" 
                        alt="Ghost duplicate" 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {/* Iridescent laser foil overlays */}
                    <div className={`absolute inset-0 rounded-full animate-pulse transition-opacity duration-500 ${isUvMode ? 'bg-gradient-to-tr from-cyan-400/30 via-purple-400/20 to-lime-300/20 opacity-80' : 'bg-gradient-to-tr from-cyan-400/15 via-pink-400/10 to-yellow-300/10'}`} />
                  </div>

                  {/* Bottom Strip: Fecha de Nacimiento, Sexo, Lugar de Nacimiento and file dynamic details */}
                  <div className={`grid grid-cols-12 gap-1 border-t pt-1 text-left relative z-10 transition-all duration-500 ${isUvMode ? 'border-purple-500/20' : 'border-[#cca3e2]/60'}`}>
                    <div className="col-span-4 leading-none text-left">
                      <span className={`text-[5px] sm:text-[5.8px] xl:text-[6.2px] font-sans font-bold block pb-0.5 transition-all duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>FECHA DE NACIMIENTO</span>
                      <span className={`font-mono font-black text-[9px] sm:text-[10px] xl:text-[10.5px] transition-all duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>15-02-1985</span>
                    </div>

                    <div className={`col-span-3 leading-none text-left border-l pl-1 transition-all duration-500 ${isUvMode ? 'border-purple-500/20' : 'border-slate-300'}`}>
                      <span className={`text-[5px] sm:text-[5.8px] xl:text-[6.2px] font-sans font-bold block pb-0.5 transition-all duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>SEXO</span>
                      <span className={`font-sans font-black text-[9px] sm:text-[10px] xl:text-[10.5px] transition-all duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>FEMENINO</span>
                    </div>

                    <div className={`col-span-5 leading-none text-left border-l pl-1 transition-all duration-500 ${isUvMode ? 'border-purple-500/20' : 'border-slate-300'}`}>
                      <span className={`text-[5px] sm:text-[5.8px] xl:text-[6.2px] font-sans font-bold block pb-0.5 transition-all duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>LUGAR DE NACIMIENTO</span>
                      <span className={`font-sans font-bold text-[8.5px] sm:text-[9.5px] xl:text-[10px] truncate block transition-all duration-500 ${isUvMode ? 'text-indigo-200/90' : 'text-[#121826]'}`}>
                        HOHENAU-ITAPUA
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* CARD 2: DORSO DE LA CÉDULA (Back side, containing biometric chip, barcode, and MRZ strip, matches image) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  animate={{ 
                    opacity: 1, 
                    scale: activeCard === 'back' ? 1.05 : activeCard === 'front' ? 0.93 : 1,
                    rotate: activeCard === 'back' ? 0 : activeCard === 'front' ? 6 : 2,
                    zIndex: activeCard === 'back' ? 30 : activeCard === 'front' ? 10 : 15,
                    x: activeCard === 'back' ? 6 : activeCard === 'front' ? 12 : 0,
                    y: activeCard === 'back' ? -6 : activeCard === 'front' ? 4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  onMouseEnter={() => setActiveCard('back')}
                  onMouseLeave={() => setActiveCard(null)}
                  onTouchStart={() => setActiveCard('back')}
                  className={`w-[290px] h-[183px] sm:w-[330px] sm:h-[208px] lg:w-[315px] lg:h-[199px] xl:w-[330px] xl:h-[208px] rounded-xl relative cursor-pointer select-none overflow-hidden p-2.5 sm:p-3 lg:p-2.5 xl:p-3 flex flex-col justify-between shrink-0 transition-all duration-500 ${isUvMode ? 'shadow-[0_25px_60px_rgba(79,70,229,0.35)] shadow-purple-500/10 border border-purple-500/30' : 'shadow-[0_22px_45px_rgba(0,0,0,0.22)] border border-white/95'}`}
                  style={{ backgroundImage: isUvMode ? "linear-gradient(135deg, #09021c 0%, #060114 45%, #03061f 100%)" : "linear-gradient(135deg, #fcecee 0%, #faebf2 28%, #e1eefa 68%, #d0e5f5 100%)" }}
                >
                  {/* Fine horizontal wave security background pattern of Guilloche lines */}
                  <div className="absolute inset-0 opacity-[0.38] pointer-events-none transition-opacity duration-500">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="back-waves-real-optimized" width="60" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 0 10 Q 15 2, 30 10 T 60 10" fill="none" stroke={isUvMode ? "#c084fc" : "#0038A8"} strokeWidth={isUvMode ? "0.32" : "0.22"} opacity={isUvMode ? "0.8" : "0.45"} />
                          <path d="M 0 25 Q 15 32, 30 25 T 60 25" fill="none" stroke={isUvMode ? "#f43f5e" : "#9e1f3b"} strokeWidth={isUvMode ? "0.3" : "0.22"} opacity={isUvMode ? "0.8" : "0.4"} />
                          <circle cx="30" cy="20" r="18" fill="none" stroke={isUvMode ? "#bef264" : "#0038A8"} strokeWidth="0.15" strokeDasharray="1 1" opacity="0.2" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#back-waves-real-optimized)" />
                    </svg>
                  </div>

                  {/* Circular Pink Guilloche Rosette Stamps on Top-Left and Top-Right CORNERS (Matches image!) */}
                  {!isUvMode && (
                    <>
                      {/* Top-Left Rosette */}
                      <div className="absolute -left-8 -top-8 w-28 h-28 opacity-[0.22] pointer-events-none mix-blend-multiply z-0">
                        <svg className="w-full h-full text-[#9e1f3b]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
                          <circle cx="50" cy="50" r="42" strokeDasharray="1.5 1" />
                          <circle cx="50" cy="50" r="34" strokeWidth="0.4" />
                          <circle cx="50" cy="50" r="26" strokeDasharray="1 0.5" />
                          <circle cx="50" cy="50" r="18" strokeWidth="0.15" />
                        </svg>
                      </div>
                      {/* Top-Right Rosette */}
                      <div className="absolute right-2 -top-10 w-28 h-28 opacity-[0.24] pointer-events-none mix-blend-multiply z-0">
                        <svg className="w-full h-full text-[#9e1f3b]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25">
                          <circle cx="50" cy="50" r="42" strokeDasharray="2 1" />
                          <circle cx="50" cy="50" r="36" strokeWidth="0.38" />
                          <circle cx="50" cy="50" r="28" strokeDasharray="1 0.5" />
                          <circle cx="50" cy="50" r="20" strokeWidth="0.15" />
                        </svg>
                      </div>
                    </>
                  )}

                  {/* Giant Blue Passion Flower (Mburucuyá) Central Watermark (Light blue & extremely photorealistic) */}
                  <div className={`absolute left-[54%] top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center transition-all duration-500 z-0 ${isUvMode ? 'opacity-[0.14] text-purple-400' : 'opacity-[0.28] text-sky-400'}`}>
                    <svg className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] xl:w-[190px] xl:h-[190px] fill-none stroke-current stroke-[0.38]" viewBox="0 0 100 100">
                      {/* Core centers & rings */}
                      <circle cx="50" cy="50" r="6" />
                      <circle cx="50" cy="50" r="10" strokeDasharray="1 0.7" />
                      <circle cx="50" cy="50" r="16" strokeDasharray="2 1" />
                      <circle cx="50" cy="50" r="22" />
                      <circle cx="50" cy="50" r="28" strokeDasharray="0.5 0.5" />
                      {/* Passion Flower Petals (Distinctive and delicate) */}
                      <path d="M 50,50 C 42,4 58,4 50,50" />
                      <path d="M 50,50 C 96,42 96,58 50,50" />
                      <path d="M 50,50 C 58,96 42,96 50,50" />
                      <path d="M 50,50 C 4,58 4,42 50,50" />
                      <path d="M 50,50 C 20,20 35,20 50,50" />
                      <path d="M 50,50 C 80,20 80,35 50,50" />
                      <path d="M 50,50 C 80,80 65,80 50,50" />
                      <path d="M 50,50 C 20,80 20,65 50,50" />
                      {/* Fine radial lines / filaments of Corona */}
                      <g strokeWidth="0.18" opacity="0.8">
                        <line x1="50" y1="34" x2="50" y2="28" />
                        <line x1="50" y1="66" x2="50" y2="72" />
                        <line x1="34" y1="50" x2="28" y2="50" />
                        <line x1="66" y1="50" x2="72" y2="50" />
                        <line x1="39" y1="39" x2="34" y2="34" />
                        <line x1="61" y1="39" x2="66" y2="34" />
                        <line x1="61" y1="61" x2="66" y2="66" />
                        <line x1="39" y1="61" x2="34" y2="66" />
                      </g>
                    </svg>
                  </div>

                  {/* Vertical SPECIMEN stencil watermark on LHS */}
                  <div className="absolute left-[3px] top-10 bottom-10 flex items-center justify-center pointer-events-none select-none z-10">
                    <span className={`-rotate-90 text-[18px] sm:text-[20px] xl:text-[22px] font-sans font-black tracking-[0.25em] uppercase duration-500 ${isUvMode ? 'text-purple-400/10' : 'text-[#9e1f3b]/5'}`}>
                      SPECIMEN
                    </span>
                  </div>

                  {/* Forensic UV glowing graphics on back */}
                  {isUvMode && (
                    <div className="absolute inset-0 bg-transparent pointer-events-none z-20">
                      {/* Fluorescent microscopic waves across the backside */}
                      <div className="absolute top-[45px] left-[10px] w-48 h-8 border-b border-dashed border-cyan-400/40 rounded-full rotate-[5deg] blur-[0.2px] animate-pulse" />
                      {/* Microscopic glowing shield */}
                      <div className="absolute right-[40px] top-[30px] w-14 h-14 border border-dashed border-lime-400/35 rounded-full flex items-center justify-center">
                        <span className="text-[3px] text-lime-400 font-sans tracking-widest font-black uppercase">BIO CHIP SECURE</span>
                      </div>
                    </div>
                  )}

                  {/* Dynamic interactive sheeting sheen overlay */}
                  <motion.div 
                    animate={{ 
                      backgroundPosition: ["100% 100%", "0% 0%"],
                    }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "linear" 
                    }}
                    className={`absolute inset-0 pointer-events-none mix-blend-overlay z-25 transition-all duration-1000 ${isUvMode ? 'opacity-[0.1]' : 'opacity-[0.62]'}`}
                    style={{
                      backgroundImage: "radial-gradient(circle at 35% 45%, rgba(236,72,153,0.18) 0%, rgba(34,211,238,0.15) 50%, rgba(251,191,36,0.08) 100%)",
                      backgroundSize: "200% 200%"
                    }}
                  />

                  {/* Main Grid: Card Content Area for Labels, Chip, and Barcode */}
                  <div className="grid grid-cols-12 gap-1 relative z-10 items-start text-left mt-0.5 w-full flex-1">
                    
                    {/* Left Column: Civil details & Metallic Chip */}
                    <div className="col-span-5 space-y-2 text-left pt-1">
                      
                      {/* Text Fields: ESTADO CIVIL & NACIONALIDAD with Bilingual Sublabels */}
                      <div className="space-y-1.5 text-left leading-none">
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className={`text-[6px] sm:text-[6.8px] xl:text-[7.4px] font-sans font-extrabold uppercase tracking-wide block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>ESTADO CIVIL</span>
                            <span className="text-[4px] text-slate-400 font-bold block">/ MARITAL STATUS</span>
                          </div>
                          <span className={`font-sans font-black text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] block mt-0.5 transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>SOLTERO</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className={`text-[6px] sm:text-[6.8px] xl:text-[7.4px] font-sans font-extrabold uppercase tracking-wide block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>NACIONALIDAD</span>
                            <span className="text-[4px] text-slate-400 font-bold block">/ NATIONALITY</span>
                          </div>
                          <span className={`font-sans font-black text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] uppercase tracking-wide block mt-0.5 transition-colors duration-500 ${isUvMode ? 'text-cyan-400' : 'text-[#121826]'}`}>PARAGUAYA</span>
                        </div>
                      </div>

                      {/* Highly Realistic Golden Biometric Smart Chip (As seen in physical card) */}
                      <div className={`w-11 h-9 sm:w-12 sm:h-10 bg-gradient-to-br from-[#ffd966] via-[#bf9000] to-[#7f6000] rounded-md border p-[3px] flex flex-col justify-between relative overflow-hidden shrink-0 transition-shadow ${isUvMode ? 'shadow-[0_0_10px_#eab308] border-yellow-400' : 'border-amber-600 shadow-sm'}`}>
                        {/* Metallic contacts split paths mimicking real ISO 7816 smart card microchip */}
                        <div className="absolute inset-0 bg-yellow-300/10 mix-blend-overlay" />
                        <div className="grid grid-cols-3 gap-0.5 h-full opacity-90">
                          <div className="border-r border-b border-yellow-950/40" />
                          <div className="border-r border-b border-yellow-950/40" />
                          <div className="border-b border-yellow-950/40" />
                          <div className="border-r border-b border-yellow-950/40" />
                          <div className="border-r border-b border-yellow-950/40" />
                          <div className="border-b border-yellow-950/40" />
                          <div className="border-r border-yellow-950/40" />
                          <div className="border-r border-yellow-950/40" />
                          <div className="border-none" />
                        </div>
                        <div className="absolute inset-[2px] border border-yellow-950/15 pointer-events-none" />
                        <div className="absolute w-[8px] h-[16px] bg-[#fbbf24]/50 border-l border-r border-yellow-950/30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute w-[18px] h-[6px] bg-gradient-to-r from-transparent via-[#fef08a] to-transparent left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-t border-b border-yellow-950/30 opacity-80" />
                        <div className="absolute w-2 h-4 bg-[#f8fafc] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-yellow-600/50 shadow-inner opacity-45" />
                      </div>

                    </div>

                    {/* Middle Column: Chip Sublabels (IC, UBICACIÓN) & FECHA DE EMISIÓN */}
                    <div className="col-span-4 space-y-2 pt-1 text-left leading-none pl-1">
                      
                      {/* FECHA DE EMISIÓN (Bilingual) */}
                      <div>
                        <div className="flex items-center space-x-0.5">
                          <span className={`text-[5.5px] sm:text-[6.2px] xl:text-[6.8px] font-sans font-bold uppercase block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>FECHA DE EMISIÓN</span>
                        </div>
                        <span className={`font-mono font-black text-[9px] sm:text-[10px] xl:text-[10.5px] block mt-0.5 transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>03-04-2023</span>
                      </div>

                      {/* IC & UBICACIÓN near the chip */}
                      <div className="space-y-1 pt-1.5 border-t border-slate-350/30">
                        <div>
                          <span className={`text-[5px] sm:text-[5.5px] font-sans font-bold block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>IC / CARD ID</span>
                          <span className={`font-mono text-[8px] sm:text-[8.5px] block font-black mt-0.5 transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>A-8958445</span>
                        </div>

                        <div>
                          <span className={`text-[5px] sm:text-[5.5px] font-sans font-bold block transition-colors duration-500 ${isUvMode ? 'text-purple-400' : 'text-[#9e1f3b]'}`}>UBICACIÓN / LOCATION</span>
                          <span className={`font-mono text-[7px] sm:text-[7.8px] block font-extrabold mt-0.5 transition-colors duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>PN-07-23-000-584</span>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Barcode & Interactive QR Code */}
                    <div className="col-span-3 flex flex-col items-end space-y-2.5 pt-1 pr-0.5">
                      
                      {/* Barcode Element exactly matching the photograph */}
                      <div className="w-full text-right">
                        <svg className={`w-full h-[18px] sm:h-[22px] opacity-100 fill-current ${isUvMode ? 'text-indigo-200' : 'text-black'}`} viewBox="0 0 160 25">
                          <rect x="0" width="2" height="25" />
                          <rect x="3" width="1" height="25" />
                          <rect x="6" width="3" height="25" />
                          <rect x="11" width="1" height="25" />
                          <rect x="14" width="4" height="25" />
                          <rect x="20" width="2" height="25" />
                          <rect x="24" width="1" height="25" />
                          <rect x="27" width="2" height="25" />
                          <rect x="31" width="3" height="25" />
                          <rect x="36" width="1" height="25" />
                          <rect x="39" width="2" height="25" />
                          <rect x="43" width="4" height="25" />
                          <rect x="49" width="1" height="25" />
                          <rect x="52" width="2" height="25" />
                          <rect x="56" width="3" height="25" />
                          <rect x="61" width="2" height="25" />
                          <rect x="65" width="1" height="25" />
                          <rect x="68" width="4" height="25" />
                          <rect x="74" width="2" height="25" />
                          <rect x="78" width="1" height="25" />
                          <rect x="81" width="3" height="25" />
                          <rect x="86" width="2" height="25" />
                          <rect x="103" width="3" height="25" />
                          <rect x="108" width="1" height="25" />
                          <rect x="111" width="2" height="25" />
                          <rect x="115" width="4" height="25" />
                          <rect x="121" width="2" height="25" />
                          <rect x="125" width="1" height="25" />
                          <rect x="128" width="3" height="25" />
                          <rect x="140" width="4" height="25" />
                          <rect x="146" width="2" height="25" />
                          <rect x="150" width="3" height="25" />
                        </svg>
                        <span className={`text-[6px] sm:text-[6.8px] font-mono text-center block mt-[1px] tracking-[0.25em] font-bold duration-500 ${isUvMode ? 'text-indigo-200' : 'text-[#121826]'}`}>
                          AA0008958445
                        </span>
                      </div>

                      {/* INTERACTIVE SCAN QR CODE CELL (Maps Calendar appointment smoothly!) */}
                      <a 
                        href="https://calendar.app.google/koWzK2QNpGhTTSgj6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/qr relative flex flex-col items-center justify-center shrink-0 border border-[#cca3e2]/35 hover:border-blue-500 rounded p-[2px] transition-all bg-white hover:bg-slate-50 relative z-30 shadow-xs"
                        title="Escanear QR para agendar cita en Calendario"
                      >
                        {/* Live scanning target highlight */}
                        <span className="absolute -top-1.5 text-[4px] font-sans font-extrabold text-blue-600 uppercase tracking-tighter opacity-0 group-hover/qr:opacity-100 transition-opacity whitespace-nowrap bg-white/90 px-1 py-[1px] border border-blue-500/25 rounded z-50">¡Cita Calendario!</span>
                        
                        <svg className="w-8 h-8 text-slate-900" viewBox="0 0 25 25" fill="currentColor">
                          <path d="M0,0 h7 v7 h-7 z M1,1 v5 h5 v-5 z M2,2 h3 v3 h-3 z" />
                          <path d="M18,0 h7 v7 h-7 z M19,1 v5 h5 v-5 z M20,2 h3 v3 h-3 z" />
                          <path d="M0,18 h7 v7 h-7 z M1,19 v5 h5 v-5 z M2,20 h3 v3 h-3 z" />
                          <rect x="9" y="1" width="2" height="2" />
                          <rect x="13" y="2" width="1" height="4" />
                          <rect x="15" y="0" width="2" height="2" />
                          <rect x="10" y="5" width="2" height="1" />
                          <rect x="9" y="10" width="3" height="3" />
                          <rect x="14" y="9" width="4" height="2" />
                          <rect x="22" y="10" width="2" height="4" />
                          <rect x="2" y="10" width="4" height="3" />
                          <rect x="10" y="15" width="2" height="2" />
                          <rect x="16" y="13" width="3" height="4" />
                          <rect x="20" y="19" width="4" height="2" />
                          <rect x="10" y="21" width="5" height="3" />
                          <rect x="22" y="22" width="2" height="2" />
                          <rect x="16" y="20" width="2" height="3" />
                        </svg>
                        {/* Tiny scanner action feedback overlay */}
                        <div className="absolute inset-0 bg-blue-500/8 opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center rounded">
                          <div className="w-full h-[1.5px] bg-red-500 animate-bounce" />
                        </div>
                      </a>

                    </div>

                  </div>

                  {/* Faded bottom label: POLICÍA NACIONAL DE PARAGUAY */}
                  <div className="flex justify-between items-center text-[5.5px] text-slate-400 mt-1 uppercase tracking-wider relative z-10">
                    <span className={`text-[5px] tracking-wider font-bold px-1.5 py-0.5 rounded transition-all duration-500 ${isUvMode ? 'text-indigo-300 bg-indigo-950/40' : 'text-[#9e1f3b] bg-[#9e1f3b]/5'}`}>
                      POLICÍA NACIONAL DE PARAGUAY
                    </span>
                    <span className={`font-mono text-[5.8px] tracking-wide font-extrabold uppercase select-none transition-all duration-500 ${isUvMode ? 'text-purple-400/40' : 'text-slate-500'}`}>REVERSO / BACK</span>
                  </div>

                  {/* BOTTOM THIRD BANNER: Giant Textured "PARAGUAY" letters (Matches physical card back beautifully!) */}
                  <div className="relative w-full h-[45px] sm:h-[50px] xl:h-[55px] mt-1.5 border-t border-slate-350/45 overflow-hidden flex items-center justify-center z-10 transition-colors duration-500">
                    
                    {/* Security microprint bg line pattern behind giant word */}
                    <div className="absolute inset-0 opacity-[0.25] flex flex-col justify-around pointer-events-none">
                      <div className="w-full h-[1px] border-b border-dotted border-blue-500" />
                      <div className="w-full h-[1px] border-b border-dotted border-blue-500" />
                      <div className="w-full h-[1px] border-b border-dotted border-blue-500" />
                    </div>

                    {/* Giant outlined/line-filled PARAGUAY text */}
                    <svg className="w-full h-full" viewBox="0 0 280 45">
                      <defs>
                        {/* Micro security line filling pattern for the text */}
                        <pattern id="paraguay-word-engraving" width="3" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                          <line x1="0" y1="0" x2="0" y2="6" stroke={isUvMode ? "#67e8f9" : "#0ea5e9"} strokeWidth="0.6" opacity={isUvMode ? "0.9" : "0.5"} />
                        </pattern>
                      </defs>
                      <text 
                        x="50%" 
                        y="34" 
                        fontSize="32" 
                        fontWeight="900" 
                        fontFamily="sans-serif" 
                        textAnchor="middle" 
                        letterSpacing="10" 
                        fill="url(#paraguay-word-engraving)" 
                        stroke={isUvMode ? "#c084fc" : "#0038A8"} 
                        strokeWidth="0.32" 
                        opacity={isUvMode ? "0.85" : "0.58"}
                        className="tracking-widest uppercase font-sans"
                      >
                        PARAGUAY
                      </text>
                    </svg>

                  </div>

                </motion.div>

              </div>

              {/* Overlapping interactive guide indicator */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-6 sm:mt-8 lg:mt-6 xl:mt-8 flex items-center justify-center space-x-2 text-slate-300 text-[10px] uppercase font-bold tracking-widest text-center bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 shadow-sm w-fit mx-auto select-none"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>💡 Pasa el cursor o toca una cédula para traerla al frente</span>
              </motion.div>



            </div>

          </div>

        </div>
      </section>

      {/* BEFORE SERVICES Section: ¿Por qué elegir Paraguay? */}
      <section id="porque-paraguay" className="py-24 bg-slate-950 border-t border-slate-900 relative">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/2 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#0038A8]/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold md:text-sm">Paraguay: El Secreto de Sudamérica</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              ¿Por qué elegir Paraguay?
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-2" />
            <p className="text-slate-300 font-light text-base leading-relaxed">
              Descubre los múltiples beneficios que convierten a Paraguay en el imán de mayor crecimiento para inversores, jubilados, nómadas y familias extranjeras que buscan iniciar una nueva vida con amplias libertades civiles y económicas.
            </p>
          </div>

          {/* 4 Cards with Premium Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyParaguayCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative group overflow-hidden"
              >
                {/* Visual Accent Hover Effect line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/20 group-hover:via-amber-400 group-hover:to-amber-300/20 transition-all duration-500" />
                
                <div className="space-y-4">
                  {/* Premium customized icon container */}
                  <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-inner group-hover:translate-x-1 group-hover:scale-105 transition-all text-amber-400">
                    {card.icon}
                  </div>
                  
                  <span className="inline-block text-[10px] tracking-wider uppercase font-semibold text-amber-400/90 bg-amber-400/5 px-2.5 py-1 rounded-full border border-amber-500/10">
                    {card.badge}
                  </span>

                  <h3 className="text-xl font-serif font-semibold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center justify-between">
                  <span className="text-[11px] font-sans text-slate-300 font-medium">
                    {card.highlight}
                  </span>
                  <div className="text-amber-500 opacity-60 group-hover:translate-x-1 group-hover:opacity-100 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION: ¿POR QUÉ ELEGIRNOS? */}
      <section id="porque-elegirnos" className="py-24 bg-gradient-to-b from-slate-950 to-[#0a0f1d] border-t border-slate-900 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="inline-block bg-slate-900/85 text-amber-300 text-[11px] font-bold tracking-widest uppercase px-4.5 py-1.5 rounded-full border border-amber-500/25">
              ¿POR QUÉ ELEGIRNOS?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              La Consultora que <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent italic font-serif font-bold">te Acompaña</span>
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-slate-200 font-light text-base leading-relaxed">
              Más que un servicio, somos tu equipo de confianza en Paraguay.
            </p>
          </div>

          {/* Grid Layout conforming to Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Key advantages with premium emphasis on competitive edge */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Item 1: Sin Presencia Permanente (Emphasized!) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_25px_rgba(245,158,11,0.06)]"
              >
                {/* Highlight Glow or Accent */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start space-x-5">
                  <div className="p-3.5 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-300 shrink-0 mt-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Globe className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-sans font-extrabold text-white tracking-tight">
                        Sin Presencia Permanente
                      </h3>
                      <span className="text-[10px] bg-amber-400 text-slate-950 font-black tracking-wider uppercase px-2.5 py-0.5 rounded shadow">
                        NUESTRA VENTAJA REINA 🔥
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm font-light leading-relaxed">
                      No necesitas quedarte en Paraguay durante todo el proceso. Gestionamos tu trámite de punta a punta mientras vos seguís adelante con tus proyectos y vida en tu país de origen. <strong className="text-amber-400 font-semibold">Cero interrupción de tus actividades.</strong>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Item 2: Tiempo Récord (Emphasized!) */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-blue-500/10 via-[#0284c7]/5 to-transparent border-2 border-[#0284c7]/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_25px_rgba(2,132,199,0.06)]"
              >
                <div className="flex items-start space-x-5">
                  <div className="p-3.5 bg-[#0284c7]/20 rounded-xl border border-[#0284c7]/30 text-[#0284c7] shrink-0 mt-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-sans font-extrabold text-white tracking-tight">
                        Tiempo Récord
                      </h3>
                      <span className="text-[10px] bg-[#0284c7]/30 text-[#38bdf8] border border-[#0284c7]/40 font-bold tracking-wider uppercase px-2.5 py-0.5 rounded">
                        ENTREGA VELOZ ⚡
                      </span>
                    </div>
                    <p className="text-slate-200 text-sm font-light leading-relaxed">
                      Conocemos cada paso administrativo al detalle. Tu radicación y cédula se resuelven de forma óptima en el menor plazo real posible gracias a nuestro seguimiento de alta prioridad.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Item 3: 100% Legal y Seguro */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 group hover:border-slate-700 transition-all duration-300">
                <div className="flex items-start space-x-5">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-amber-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-sans font-bold text-white tracking-tight">
                      100% Legal y Seguro
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Trabajamos con abogados matriculados ante la Corte Suprema de Justicia y profesionales gestores de impecable trayectoria. Todo se procesa de forma transparente y legal en las dependencias públicas paraguayas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 4: Atención Personalizada */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 group hover:border-slate-700 transition-all duration-300">
                <div className="flex items-start space-x-5">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-amber-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-sans font-bold text-white tracking-tight">
                      Atención Personalizada
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Cada cliente cuenta con un gestor ejecutivo dedicado para su expediente, disponible de manera constante para resolver dudas en tiempo real y hacer el camino libre de complicaciones.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: "Tu Éxito es Nuestra Prioridad" callout card */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
              <div className="bg-gradient-to-b from-[#0f1b2f] to-[#0a111e] border-2 border-slate-800 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden flex flex-col justify-between h-full min-h-[360px] shadow-2xl">
                {/* Decorative glowing gradient blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />
                
                <div className="my-auto space-y-8 relative z-10">
                  {/* Huge glowing checklist badge */}
                  <div className="mx-auto w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center border-2 border-amber-500/25 shadow-[0_0_30px_rgba(245,158,11,0.06)] group">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-400 to-amber-500/85 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Check className="w-7 h-7 text-slate-950 stroke-[3]" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight">
                      Tu Éxito es Nuestra Prioridad
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed font-light">
                      Más de <strong className="text-amber-300 font-bold">1.500 extranjeros</strong> ya confían en AZ Consultora para radicarse en Paraguay de forma simple y planificada. Vos también podés.
                    </p>
                  </div>
                </div>

                {/* Golden pill badge button in bottom right corner of card matching mockup layout */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center xl:justify-end gap-3.5 relative z-10 font-sans">
                  <a 
                    href="#contacto"
                    className="inline-flex items-center justify-center space-x-2 bg-slate-950/80 border border-slate-700/80 hover:bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full transition-all active:scale-95 duration-200"
                  >
                    <span>✓ Dejar Mensaje</span>
                  </a>
                  <a 
                    href="https://calendar.app.google/koWzK2QNpGhTTSgj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-450 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all active:scale-95 duration-200"
                  >
                    <Calendar className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                    <span>Agendar en Calendario</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* CORE SERVICES Section */}
      <section id="servicios" className="py-24 bg-slate-900 border-t border-slate-950 relative">
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-amber-500/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold md:text-sm">Servicios Premium</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Gestión Integral <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent italic font-serif">para Extranjeros</span>
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-slate-200 font-light text-base leading-relaxed">
              Ofrecemos soluciones completas para que puedas radicarte y emprender en Paraguay de manera legal, rápida y segura.
            </p>
          </div>

          {/* Service Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const isSelected = selectedService === service.id;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-gradient-to-b from-[#0f192b] to-[#0b1220] border-2 border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all duration-300"
                >
                  <div className="space-y-6">
                    
                    {/* Header of the service card */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-amber-400 group-hover:scale-105 group-hover:border-amber-500/20 transition-all duration-300">
                        {service.icon}
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-amber-400 transition-all duration-300" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-sans font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed font-sans">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Bullet Items with fine gold checks (✓) matching the mock up perfectly */}
                    <ul className="space-y-3.5 text-xs text-slate-300 border-t border-slate-800/80 pt-5">
                      {service.items.slice(0, 4).map((item, itemIdx) => {
                        const isAllCaps = item === item.toUpperCase() && item.length > 15;
                        return (
                          <li key={itemIdx} className="flex items-start space-x-2.5">
                            <span className="text-amber-400 font-extrabold select-none text-[13px] leading-none shrink-0 mt-[2px]">✓</span>
                            <span className={`leading-relaxed text-xs tracking-wide ${
                              isAllCaps 
                                ? "text-slate-100 font-black tracking-wider text-[11px] block leading-normal pt-0.5" 
                                : "text-slate-300"
                            }`}>
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Extra detail info container inside card */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 mt-2 border-t border-slate-800 space-y-4"
                        >
                          <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                            {service.longDescription}
                          </p>
                          {service.items.length > 4 && (
                            <div className="space-y-2">
                              <span className="text-[11px] font-semibold uppercase text-amber-400 tracking-wider">Cobertura Expandida:</span>
                              <ul className="space-y-2 text-xs">
                                {service.items.slice(4).map((item, epIdx) => (
                                  <li key={epIdx} className="flex items-start space-x-2">
                                    <span className="text-amber-400 font-extrabold select-none text-xs">✓</span>
                                    <span className="text-slate-300">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Dynamic outlined pill action trigger buttons representing exact branding layout */}
                  <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button 
                      onClick={() => setSelectedService(isSelected ? null : service.id)}
                      className="text-amber-400 hover:text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 group/btn border border-amber-500/25 hover:border-amber-400/60 bg-slate-900/60 hover:bg-slate-900 px-4 py-2 rounded-full transition-all active:scale-95 shadow-md shrink-0"
                    >
                      <span>{isSelected ? "Ocultar Detalle -" : (service.detailLabel || "Ver detalle →")}</span>
                    </button>
                    
                    <a 
                      href={`${whatsappLink}?text=${encodeURIComponent(`Hola, estuve viendo el servicio "${service.title}" en su web y me gustaría programar una asesoría bancaria/migratoria.`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[11px] bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 px-3.5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      Consulta Rápida
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Featured Section: Residencia Permanente para Inversionistas (SUACE) */}
          <div className="mt-16 bg-[#0c1424] border-2 border-slate-800 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md border border-blue-500/30">
                  SERVICIO DESTACADO
                </span>
                
                <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight leading-tight">
                  Residencia Permanente para Inversionistas
                </h3>
                
                <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed">
                  Acompañamos a inversores internacionales que desean radicarse en Paraguay mediante el programa <strong className="font-bold text-amber-300">**SUACE**</strong>. Estructuramos la validación de su proyecto y aceleramos la radicación permanente.
                </p>

                <div className="pt-2">
                  <a 
                    href="#proceso" 
                    className="inline-flex items-center justify-center bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm tracking-wide px-7 py-4 rounded-xl shadow-lg transition-all active:scale-95 duration-200"
                  >
                    Consultar Requisitos
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-[#0c1424]/20 group-hover:bg-transparent transition-all duration-300" />
                  <img 
                    src={suaceInvestorMeeting} 
                    alt="Reunión de Negocios e Inversión SUACE en Paraguay" 
                    className="w-full h-auto object-cover aspect-[16/10] group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* SECTION: ¿CÓMO FUNCIONA? */}
      <section id="como-funciona" className="py-24 bg-[#0a0f1d] border-t border-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="inline-block bg-slate-900/85 text-amber-300 text-[11px] font-bold tracking-widest uppercase px-4.5 py-1.5 rounded-full border border-amber-500/25">
              ¿CÓMO FUNCIONA?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Tu Camino Hacia la <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent italic font-serif font-bold">Residencia</span>
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-slate-200 font-light text-base leading-relaxed">
              Un proceso simple y transparente. Nos encargamos de todo para que vos solo disfrutes de tu nueva vida en Paraguay.
            </p>
          </div>

          {/* Connected timeline steps */}
          <div className="relative">
            {/* Horizontal Line (Desktop only) */}
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-slate-800/80 z-0" />

            {/* Grid Container for Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              
              {/* STEP 1 */}
              <div className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] border-2 border-amber-200 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-slate-950 font-black text-lg">1</span>
                </div>
                <div className="space-y-2 max-w-[240px]">
                  <h4 className="text-white text-lg font-bold tracking-wide">
                    Consulta Inicial
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    Evaluamos tu caso de forma gratuita y te explicamos los requisitos y plazos de tu trámite.
                  </p>
                 </div>
              </div>

              {/* STEP 2 */}
              <div className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] border-2 border-amber-200 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-slate-950 font-black text-lg">2</span>
                </div>
                <div className="space-y-2 max-w-[240px]">
                  <h4 className="text-white text-lg font-bold tracking-wide">
                    Documentación
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    Te guiamos en la recolección y preparación de todos los documentos necesarios.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] border-2 border-amber-200 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-slate-950 font-black text-lg">3</span>
                </div>
                <div className="space-y-2 max-w-[240px]">
                  <h4 className="text-white text-lg font-bold tracking-wide">
                    Gestión
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    Realizamos todos los trámites, ante Migraciones, y organismos pertinentes, para conseguir la documentación solicitada.
                  </p>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] border-2 border-amber-200 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-slate-950 font-black text-lg">4</span>
                </div>
                <div className="space-y-2 max-w-[240px]">
                  <h4 className="text-white text-lg font-bold tracking-wide">
                    ¡Listo!
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    Recibís tu residencia, cédula y toda la documentación. ¡Bienvenido a Paraguay!
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ROADMAP & COMPREHENSIVE REQUIREMENTS SECTION */}
      <section id="proceso" className="py-24 bg-slate-950 border-t border-slate-900 relative">

        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/1 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Explanatory roadmap sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold md:text-sm">¿Cómo trabajamos?</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Requisitos y Flujo del Trámite
              </h2>
              <p className="text-slate-300 font-light text-sm leading-relaxed">
                El proceso de mudarse legalmente de país puede sonar abrumador. En AZConsultora nos encargamos del trabajo arduo para entregarte tu resolución y cédula sin estrés.
              </p>


              {/* Trust Guarantees widget */}
              <div className="space-y-5 pt-4">
                <div className="flex items-start space-x-3 bg-slate-900/40 p-4.5 rounded-xl border border-slate-800">
                  <div className="p-1 px-2 rounded bg-amber-500/10 text-amber-400 font-extrabold text-xs shrink-0 select-none mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Resguardo Jurídico Seguro</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed font-light">Operamos con estricto apego a la Ley de Migraciones 6984/22 de la República del Paraguay.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-900/40 p-4.5 rounded-xl border border-slate-800">
                  <div className="p-1 px-2 rounded bg-[#0284c7]/10 text-[#38bdf8] font-extrabold text-xs shrink-0 select-none mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Tarifas Claras Sin Sorpresas</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed font-light">Aranceles fijos para la tramitación de tu documentación establecidos de antemano. Absoluta tranquilidad desde el inicio.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-slate-900/40 p-4.5 rounded-xl border border-slate-800">
                  <div className="p-1 px-2 rounded bg-[#059669]/10 text-emerald-400 font-extrabold text-xs shrink-0 select-none mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Acompañamiento Físico de Élite</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed font-light">Te recibimos en el aeropuerto y te respaldamos presencialmente en cada oficina pública en Asunción.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Requirements Checker widget */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Asistente Interactivo de Trámites</span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold mt-1">Guía Personalizada de Requisitos</h3>
                <p className="text-slate-400 text-xs mt-1">Selecciona tus datos para descubrir los documentos exactos que necesitas preparar.</p>
              </div>

              {/* Selector tabs for user origin */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
                <button
                  onClick={() => setUserOrigin('general')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    userOrigin === 'general' 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Demás Países (Europeos / Norteamericanos)
                </button>
                
                <button
                  onClick={() => setUserOrigin('mercosur')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    userOrigin === 'mercosur' 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sudamericanos (MERCOSUR)
                </button>
              </div>

              {/* Display Result requirements according to selection */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-5 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    {requirementsData[userOrigin].title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed font-light">
                    {requirementsData[userOrigin].subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">Documentación Necesaria:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {requirementsData[userOrigin].documents.map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-850 text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          {dIdx + 1}
                        </div>
                        <span className="text-xs leading-normal">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prefilled call to action with customized messaging */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl gap-4">
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">¿Quieres cotizar tu caso {userOrigin === 'mercosur' ? "Mercosur" : "Internacional"}?</p>
                  <p className="text-[11px] text-slate-400">Te asesoramos sobre la documentación y los requisitos necesarios.</p>
                </div>
                <a 
                  href={`${whatsappLink}?text=${encodeURIComponent(`Hola AZConsultora, soy ciudadano de un país ${userOrigin === 'mercosur' ? 'Mercosur' : 'fuera del Mercosur'}. Me gustaría conocer los aranceles vigentes para la Residencia y Cédula de Identidad en Paraguay.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wider transition-all shadow-md shrink-0 flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TRUST REASSURANCE BENTO SECTION */}
      <section className="py-16 bg-slate-900 border-t border-b border-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Visual Abstract Overlay */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs text-amber-400 tracking-wider font-semibold uppercase">Estricta confidencialidad</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                Garantía por Contrato & Transparencia Total
              </h3>
              <p className="text-slate-300 font-light text-sm max-w-2xl leading-relaxed">
                Nuestros honorarios se pactan de forma transparente y cerrada. Sin deudas ocultas ni sorpresas de último momento. Firmamos un acuerdo formal de servicios profesionales detallando cada tasa del gobierno de Paraguay, servicios del escribano, traductor oficial jurado bilingüe de la corte y gestor.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="text-xs bg-slate-900 text-amber-200 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sin anticipos totales de alto riesgo</span>
                </span>
                <span className="text-xs bg-slate-900 text-amber-200 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Traducciones oficiales juradas por ley</span>
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 relative">
              <div className="font-serif text-5xl font-extrabold text-amber-400 tracking-tight">
                99.8%
              </div>
              <p className="text-white text-xs font-semibold tracking-wide uppercase">Tasa de Expedientes Aprobados</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Hemos tramitado con éxito residencias para ciudadanos de más de 35 países.
              </p>
              <div className="text-[10px] text-slate-400/60 uppercase tracking-widest border-t border-slate-800 pt-3">
                AZCONSULTORA PARAGUAY
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: OPINIONES Y TESTIMONIOS */}
      <section id="testimonios" className="py-24 bg-[#0a0f1d] border-t border-slate-900 relative">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-amber-500/3 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-blue-500/2 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="inline-block bg-slate-900/85 text-amber-300 text-[11px] font-bold tracking-widest uppercase px-4.5 py-1.5 rounded-full border border-amber-500/25">
              TESTIMONIOS REALES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              ¿Por qué nos eligen <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent italic font-serif font-bold">en todo el mundo</span>?
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-slate-200 font-light text-base leading-relaxed">
              Descubrí la experiencia de empresarios, profesionales de tecnología e inversores internacionales que ya obtuvieron su radicación segura con AZ Consultora.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/35 hover:shadow-xl hover:shadow-amber-500/2"
              >
                <div className="space-y-4">
                  {/* Stars rating and badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(testimonial.rating)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{testimonial.date}</span>
                  </div>

                  {/* Body Text */}
                  <div className="relative">
                    <Quote className="w-8 h-8 text-amber-500/10 absolute -top-3 -left-2 pointer-events-none" />
                    <p className="text-slate-300 text-xs leading-relaxed font-light italic relative z-10 pl-2">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-850 my-5 pt-4 flex items-center space-x-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-md`}>
                    {testimonial.avatar}
                  </div>
                  {/* Identity */}
                  <div className="min-w-0">
                    <h5 className="text-white font-bold text-xs truncate flex items-center gap-1.5">
                      <span>{testimonial.name}</span>
                      <span className="text-[11px] shrink-0" title={testimonial.country}>
                        {testimonial.country === "Alemania" && "🇩🇪"}
                        {testimonial.country === "Brasil" && "🇧🇷"}
                        {testimonial.country === "España" && "🇪🇸"}
                        {testimonial.country === "Estados Unidos" && "🇺🇸"}
                      </span>
                    </h5>
                    <p className="text-[10px] text-slate-400 truncate font-light mt-0.5">{testimonial.role}</p>
                    <p className="text-[9px] text-amber-400 font-bold tracking-wider uppercase mt-0.5">Cliente Verificado</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xs text-slate-400 font-light">
              Más de <strong className="text-white font-bold">1.500 familias y empresarios</strong> han confiado en nuestro servicio jurídico premium.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION: PREGUNTAS FRECUENTES (FAQ) ACCORDION */}
      <section id="preguntas-frecuentes" className="py-24 bg-slate-950 border-t border-b border-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/2 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block bg-slate-900/85 text-amber-300 text-[11px] font-bold tracking-widest uppercase px-4.5 py-1.5 rounded-full border border-amber-500/25">
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Preguntas Frecuentes
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-slate-300 font-light text-sm max-w-2xl mx-auto leading-relaxed">
              Encontrá respuestas técnicas inmediatas sobre el marco legal, plazos, impuestos y requisitos para el traslado óptimo a Paraguay.
            </p>
          </div>

          {/* FAQ Accordion Grid List */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className={`bg-slate-900/50 border border-slate-850 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeFaq === index 
                    ? 'border-amber-500/35 bg-slate-900/90 shadow-lg shadow-amber-500/2' 
                    : 'hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors cursor-pointer"
                  aria-expanded={activeFaq === index}
                >
                  <span className={`text-white font-serif font-bold text-sm sm:text-[15px] leading-snug pr-4 select-none ${
                    activeFaq === index ? 'text-amber-400' : ''
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg bg-slate-950/60 transition-transform duration-300 ${
                    activeFaq === index ? 'rotate-180 text-amber-400' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-xs text-slate-300 font-light leading-relaxed border-t border-slate-800/50 pt-4 bg-slate-950/15">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Quick legal disclaimer */}
          <div className="text-center mt-12 bg-slate-900/30 p-4 border border-slate-850 rounded-xl max-w-2xl mx-auto">
            <p className="text-[10px] text-slate-400 leading-relaxed font-light">
              <strong className="text-slate-300 font-semibold uppercase tracking-wider text-[9px] block mb-1">Nota de Cumplimiento Legal:</strong>
              Las respuestas contenidas en esta sección se basan estrictamente en la Ley de Migraciones N° 6984/22 y resoluciones directas de la Dirección General de Migraciones y el Ministerio de Relaciones Exteriores del Paraguay. Para una asesoría jurídicamente vinculante sobre tu caso particular, solicítanos una reunión formal.
            </p>
          </div>

        </div>
      </section>

      {/* COMPREHENSIVE CONTACT & ADSOR ADVISOR FORM */}
      <section id="contacto" className="py-24 bg-slate-950 relative">
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Information panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold md:text-sm">¿Hablamos?</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Inicia tu Cambio de Vida
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded-full my-2" />
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  Completa el formulario oficial para reservar tu cita o comunícate directamente con nuestro equipo ejecutivo bilingüe a través del teléfono habilitado. Te responderemos en un lapso inferior a las 2 horas hábiles.
                </p>
              </div>

              {/* Direct corporate indicators */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="flex-1">
                    <span className="text-slate-400 block uppercase text-[10px] tracking-wider">Teléfono de Enlace Directo</span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-0.5">
                      <a href="tel:+595991857037" className="text-white font-mono font-bold text-base hover:text-amber-300 transition-colors hover:underline">
                        +595 991 857 037
                      </a>
                      <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:text-emerald-300 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                        <span>Enviar WhatsApp →</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block uppercase text-[10px] tracking-wider">Oficina Corporativa Central</span>
                    <span className="text-white font-medium text-xs">
                      Cerro Cora 247, Edificio Alfal I, 6to C. Asunción, Paraguay
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block uppercase text-[10px] tracking-wider">Horario de Atención Integral</span>
                    <span className="text-white font-medium text-xs">
                      Lunes a Viernes: 08:30 a 18:00 (Hora local Paraguay)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 text-xs">
                <p className="text-slate-400 italic">
                  &ldquo;Acompañar al cliente no es solamente realizar trámites; es asegurarnos de que se sienta seguro, valorado y plenamente apoyado en Paraguay desde el minuto uno.&rdquo;
                </p>
                <span className="block text-amber-400 font-semibold mt-2 text-right">— AZConsultora Directoría Jurídica</span>
              </div>
            </div>

            {/* Premium secure contact form */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">Reserva de Consultas</span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-semibold">Formulario de Contacto Oficial</h3>
                <p className="text-slate-400 text-xs mt-1">Ingresa tus datos verídicos bajo estricta ley de confidencialidad.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-slate-300 font-semibold">Nombre y Apellido *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      placeholder="Ej. Alexander Müller"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-slate-300 font-semibold">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      placeholder="Ej. muller@dominio.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-slate-300 font-semibold">Número de Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      required
                      placeholder="Ej. +34 600 000 000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="serviceRequested" className="text-slate-300 font-semibold">Servicio que requiere Consultar</label>
                    <select 
                      id="serviceRequested"
                      name="serviceRequested"
                      value={formData.serviceRequested}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-300 focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option value="Servicio de Migraciones">Servicio de Migraciones</option>
                      <option value="Cédula de Identidad">Cédula de Identidad</option>
                      <option value="Residencia Fiscal (RUC)">Residencia Fiscal (RUC)</option>
                      <option value="Apertura de Empresas">Apertura de Empresas</option>
                      <option value="Apertura Bancaria">Apertura Bancaria</option>
                      <option value="Servicios Adicionales">Servicios Adicionales</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="text-slate-300 font-semibold">Detalles de tu Solicitud / Dudas Generales</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe nacionalidad, cantidad de personas que se trasladarán, etc..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200 cursor-pointer shadow-lg active:scale-99"
                  >
                    {formSubmitted ? (
                      <span className="flex items-center space-x-2 animate-pulse">
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Abriendo canal seguro de WhatsApp...</span>
                      </span>
                    ) : (
                      <>
                        <span>Enviar Solicitud e Iniciar WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2.5 leading-normal">
                    * Al hacer clic, serás contactado inmediatamente y redirigido a una API de chat oficial con nuestro escribano para máxima celeridad.
                  </p>
                </div>
              </form>

            </div>

          </div>

        </div>
      </section>

      {/* Standard Footer */}
      <footer id="app-footer" className="mt-auto bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <span className="font-serif text-slate-950 font-bold text-baseClassName">AZ</span>
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-wide">AZConsultora</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Asesoramiento corporativo integral y trámites de radicación paraguaya de primer nivel con más de 50 años de experiencia comercial y discreción técnica.
            </p>
            <div className="flex items-center space-x-3 text-slate-300">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/40 hover:bg-slate-900 text-slate-300 hover:text-emerald-400 transition-all flex items-center gap-2 shadow-sm">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-xs font-bold">{formattedPhone}</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Servicios</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Servicio de Migraciones</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Cédula de Identidad</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Residencia Fiscal (RUC)</a></li>
              <li><a href="#servicios" className="hover:text-amber-400 transition-colors">Apertura de Empresas</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Accesos Rápidos</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Portal de Inicio</a></li>
              <li><a href="#porque-paraguay" className="hover:text-amber-400 transition-colors">Por qué Paraguay</a></li>
              <li><a href="#proceso" className="hover:text-amber-400 transition-colors">Requisitos del Trámite</a></li>
              <li><a href="#contacto" className="hover:text-amber-400 transition-colors">Agendar Consultoría</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Marco Legal PY</h4>
            <p className="text-[10px] leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-850">
              Todos los trámites ante la Dirección General de Migraciones de la República del Paraguay se realizan de acuerdo estricto a lo normado por la Ley de Migraciones N° 6984/2022.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AZConsultora S.A. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-amber-400 transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Términos del Servicio</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors underline">Asistencia Directa</a>
          </div>
        </div>
      </footer>

      {/* Share with Clients Real Intelligent Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Dark glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-slate-905 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 z-[110] overflow-hidden"
            >
              {/* Gold brand glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-slate-950 font-black" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-serif font-bold text-lg">Enlace para Clientes</h3>
                    <p className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">AZConsultora Network</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300 text-xs leading-relaxed text-left">
                  Genera enlaces personalizados para tus contactos o potenciales clientes. Al abrir este enlace, se configurarán de forma automática los requisitos indicados de su perfil de origen (Mercosur o Internacional).
                </p>

                {/* Sub-selector tabs inside modal */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-850">
                  <button
                    onClick={() => setShareConfig('general')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${shareConfig === 'general' ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    🌍 Internacionales (General)
                  </button>
                  <button
                    onClick={() => setShareConfig('mercosur')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${shareConfig === 'mercosur' ? 'bg-amber-400 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    🤝 Países Mercosur
                  </button>
                </div>

                {/* Simulated dynamic Preview URL display inside code block */}
                <div className="space-y-1.5">
                  <span className="text-[10.5px] uppercase font-bold tracking-widest text-slate-400 block text-left">Dirección del Enlace:</span>
                  <div className="flex items-center space-x-2 bg-slate-950/90 border border-slate-800 rounded-xl p-3">
                    <Link className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-mono text-slate-200 select-all truncate flex-1 text-left">
                      {getShareLink(shareConfig)}
                    </span>
                    <button
                      onClick={() => handleCopyLink(shareConfig)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-amber-400 border border-slate-800 hover:border-amber-500/30 rounded-lg text-[11px] font-bold tracking-wide transition-all uppercase flex items-center space-x-1 shrink-0 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </button>
                  </div>
                </div>

                {/* Toast feedback status inside modal */}
                {shareFeedbackMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium text-center"
                  >
                    {shareFeedbackMsg}
                  </motion.div>
                )}

                {/* QR Code and sharing block */}
                <div className="flex flex-col sm:flex-row gap-6 items-center p-4 bg-slate-950/30 border border-slate-850 rounded-xl">
                  {/* High Quality Client Scan QR using dynamic API */}
                  <div className="w-[125px] h-[125px] bg-white p-2 rounded-lg flex items-center justify-center shrink-0 shadow-lg select-all">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=0f172a&data=${encodeURIComponent(getShareLink(shareConfig))}`}
                      alt="Código QR de Enlace" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="text-left space-y-3 flex-1">
                    <h4 className="text-white font-bold text-xs">Escaneo Directo o Compartir Rápido</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tu cliente puede simplemente escanear el código QR con la cámara de su teléfono móvil para abrir la presentación inmediatamente.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* WhatsApp Share trigger */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                          `¡Hola! Te comparto la plataforma interactiva de Radicación Paraguaya y Simulación de Cédula de AZConsultora: ${getShareLink(shareConfig)}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-[10px] font-bold uppercase rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Telegram Share trigger */}
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(getShareLink(shareConfig))}&text=${encodeURIComponent(
                          `Plataforma de Radicación en Paraguay - AZConsultora`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] border border-[#0088cc]/30 text-[10px] font-bold uppercase rounded-lg transition-colors"
                      >
                        Telegram
                      </a>

                      {/* Email Share trigger */}
                      <a
                        href={`mailto:?subject=${encodeURIComponent(
                          'AZConsultora: Trámite de Radicación y Cédula de Identidad en Paraguay'
                        )}&body=${encodeURIComponent(
                          `Hola,\n\nTe comparto el portal interactivo oficial de AZConsultora con todos los requisitos actualizados según la ley 6984/22 y el simulador interactivo de Cédula Biométrica:\n\n${getShareLink(shareConfig)}\n\nSaludos cordiales.`
                        )}`}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 text-[10px] font-bold uppercase rounded-lg transition-colors"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
