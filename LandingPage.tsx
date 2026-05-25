import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, BarChart3, CheckCircle2, FileText, Search, ArrowRight } from 'lucide-react';
import logo from './assets/isotek-logo.png';
import aboutImg from './assets/about-executive.png';
import { supabase } from './lib/supabase';

interface CompanyLogo {
    id: string;
    name: string;
    logo_url: string | null;
}

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [companyLogos, setCompanyLogos] = useState<CompanyLogo[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchCompanyLogos = async () => {
            try {
                const { data, error } = await supabase
                    .from('company_info')
                    .select('id, name, logo_url')
                    .neq('logo_url', '')
                    .not('logo_url', 'is', null)
                    .limit(6);

                if (!error && data) setCompanyLogos(data);
            } catch (err) {
                console.error('Erro ao buscar logos:', err);
            }
        };
        fetchCompanyLogos();
    }, []);

    const handleLoginClick = () => navigate('/login');

    const scrollToSection = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[oklch(98%_0.005_220)] text-[oklch(20%_0.01_220)] font-sans antialiased selection:bg-[oklch(75%_0.18_150)] selection:text-white">
            
            {/* NAVBAR - Architectural Style */}
            <header
                className={`fixed w-full z-50 transition-all duration-300 border-b ${
                    isScrolled 
                    ? 'bg-[oklch(98%_0.005_220)]/90 backdrop-blur-md py-3 border-[oklch(80%_0.01_220)]' 
                    : 'bg-transparent py-5 border-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-12">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('inicio')}>
                        <img src={logo} alt="Isotek Logo" className="h-7 w-auto" />
                    </div>

                    <nav className="hidden md:flex items-center gap-10">
                        {['Início', 'Sobre Nós', 'Método', 'Contato'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item === 'Início' ? 'inicio' : item === 'Sobre Nós' ? 'sobre' : item === 'Método' ? 'funcionalidades' : 'contato')}
                                className="text-xs font-bold uppercase tracking-widest text-[oklch(60%_0.01_220)] hover:text-[oklch(60%_0.15_220)] transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={handleLoginClick}
                            className="px-5 py-2 bg-[oklch(60%_0.15_220)] text-white text-xs font-bold uppercase tracking-tighter rounded-sm hover:brightness-110 transition-all"
                        >
                            Entrar
                        </button>
                    </nav>

                    <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute w-full bg-white border-b border-[oklch(80%_0.01_220)] animate-industrial">
                        <div className="px-6 py-8 space-y-6">
                            {['Início', 'Sobre Nós', 'Método', 'Contato'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item === 'Início' ? 'inicio' : item === 'Sobre Nós' ? 'sobre' : item === 'Método' ? 'funcionalidades' : 'contato')}
                                    className="block w-full text-left text-sm font-bold uppercase tracking-widest text-[oklch(20%_0.01_220)]"
                                >
                                    {item}
                                </button>
                            ))}
                            <button
                                onClick={handleLoginClick}
                                className="w-full py-4 bg-[oklch(60%_0.15_220)] text-white font-bold uppercase rounded-sm"
                            >
                                Entrar na Plataforma
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO - Asymmetric & Impactful */}
            <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-7 animate-industrial">
                        <div className="inline-block px-3 py-1 mb-6 border border-[oklch(60%_0.15_220)] text-[oklch(60%_0.15_220)] text-[10px] font-black uppercase tracking-[0.2em]">
                            Engenharia de Conformidade
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-[oklch(20%_0.01_220)]">
                            A precisão da <br />
                            <span className="text-[oklch(60%_0.15_220)]">qualidade digital.</span>
                        </h1>
                        <p className="max-w-prose text-lg md:text-xl text-[oklch(60%_0.01_220)] leading-relaxed mb-12">
                            Substitua processos obsoletos e pilhas de papel por um ecossistema de gestão de conformidade rigoroso, auditável e eficiente. Feito para quem não aceita margens de erro.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleLoginClick}
                                className="px-8 py-4 bg-[oklch(60%_0.15_220)] text-white font-bold rounded-sm hover:brightness-110 transition-all flex items-center gap-3 group"
                            >
                                Agendar Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 border border-[oklch(60%_0.01_220)] font-bold rounded-sm hover:bg-[oklch(95%_0.005_220)] transition-all">
                                Ver Casos
                            </button>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5 relative animate-industrial" style={{ animationDelay: '0.2s' }}>
                        <div className="aspect-[4/5] bg-[oklch(85%_0.05_220)] border border-[oklch(60%_0.15_220)] relative p-4">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient([oklch(60%_0.15_220)]_1px, transparent_1px), linear-gradient(90deg, [oklch(60%_0.15_220)]_1px, transparent_1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="relative h-full w-full bg-white border border-[oklch(20%_0.01_220)] shadow-2xl p-6">
                                <div className="h-4 w-1/3 bg-gray-100 mb-6 rounded-sm"></div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-12 w-full border border-gray-100 flex items-center px-3 gap-3 group-hover:border-[oklch(60%_0.15_220)] transition-colors">
                                            <div className="h-3 w-3 rounded-full bg-[oklch(75%_0.18_150)]"></div>
                                            <div className="h-2 w-1/2 bg-gray-50 rounded-sm"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOBRE - Breaking the symmetry */}
            <section id="sobre" className="py-24 bg-[oklch(20%_0.01_220)] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 relative">
                            <div className="relative z-10 overflow-hidden border border-white/20">
                                <img src={aboutImg} alt="Executive Audit" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[oklch(60%_0.15_220)] p-6 border border-white/20 z-20 hidden md:block">
                                <div className="text-3xl font-black">10+</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Anos de Experiência</div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-8">
                            <div className="inline-block px-3 py-1 bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest">
                                Quem Somos
                            </div>
                            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-none">
                                Mais que um software, <br />
                                <span className="text-[oklch(75%_0.18_150)]">seu parceiro de conformidade.</span>
                            </h2>
                            <p className="max-w-prose text-lg text-white/70 leading-relaxed">
                                A Isotek une tecnologia de ponta e expertise normativa para guiar sua empresa rumo à excelência. 
                                Eliminamos a complexidade para que você possa focar no que realmente importa: 
                                a qualidade do seu produto e a satisfação do seu cliente.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'Auditorias Ágeis', desc: 'Redução de 60% no tempo de coleta' },
                                    { title: 'Risco Zero', desc: 'Compliance total com normas ISO' }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-3 mb-3">
                                            <CheckCircle2 className="text-[oklch(75%_0.18_150)]" size={20} />
                                            <span className="font-bold text-sm uppercase tracking-wide">{item.title}</span>
                                        </div>
                                        <p className="text-sm text-white/50">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MÉTODO - Linear Industrial Flow */}
            <section id="funcionalidades" className="py-24 bg-[oklch(98%_0.005_220)] relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <div className="inline-block px-3 py-1 mb-4 border border-[oklch(60%_0.15_220)] text-[oklch(60%_0.15_220)] text-[10px] font-black uppercase tracking-[0.2em]">
                            Metodologia
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">O Método Isotek</h2>
                    </div>

                    <div className="space-y-px bg-[oklch(80%_0.01_220)] border border-[oklch(80%_0.01_220)]">
                        {[
                            { step: '01', title: 'Diagnóstico', content: 'Identifique gaps nos seus processos atuais com nossa ferramenta de análise inteligente e mapeamento de riscos automático.' },
                            { step: '02', title: 'Implementação', content: 'Digitalize documentos, centralize indicadores e treine sua equipe com nossa plataforma intuitiva e trilhas de aprendizado.' },
                            { step: '03', title: 'Certificação', content: 'Receba auditores com confiança total, acesso rápido a evidências e garanta seu selo de qualidade ISO 9001 de forma simplificada.' },
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white p-8 md:p-12 transition-all hover:bg-[oklch(96%_0.005_220)] cursor-crosshair"
                            >
                                <div className="grid md:grid-cols-12 gap-8 items-start">
                                    <div className="md:col-span-1 text-4xl font-black text-[oklch(60%_0.15_220)] opacity-20 group-hover:opacity-100 transition-opacity">
                                        {item.step}
                                    </div>
                                    <div className="md:col-span-11">
                                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[oklch(60%_0.15_220)] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="max-w-prose text-[oklch(60%_0.01_220)] leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEPOIMENTO - High Contrast */}
            <section className="py-24 bg-[oklch(20%_0.01_220)] text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="mb-12 inline-block p-4 border border-white/20 bg-white/5">
                        <FileText size={32} className="text-[oklch(75%_0.18_150)]" />
                    </div>
                    <blockquote className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-12">
                        "A Isotek transformou nossa auditoria interna, que antes era um pesadelo de planilhas, em um processo fluido e organizado."
                    </blockquote>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center text-white font-black">
                            JD
                        </div>
                        <div>
                            <div className="font-bold text-lg uppercase tracking-widest">João Doria</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest font-bold">CEO, Indústria Tech</div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[oklch(60%_0.15_220)] opacity-10 skew-x-12 translate-x-20"></div>
            </section>

            {/* TRUSTED LOGOS */}
            {companyLogos.length > 0 && (
                <section className="py-24 bg-white border-y border-[oklch(80%_0.01_220)]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[oklch(60%_0.01_220)] mb-4">Confiança Industrial</h2>
                            <div className="h-1 w-12 bg-[oklch(60%_0.15_220)] mx-auto"></div>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                            {companyLogos.map((company) => (
                                <div key={company.id} className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                                    {company.logo_url ? (
                                        <img src={company.logo_url} alt={company.name} className="h-8 md:h-10 w-auto object-contain" />
                                    ) : (
                                        <span className="text-sm font-bold uppercase tracking-widest">{company.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FOOTER - Architectural Split */}
            <footer id="contato" className="flex flex-col md:flex-row min-h-[600px] border-t border-[oklch(80%_0.01_220)]">
                <div className="w-full md:w-1/2 bg-[oklch(20%_0.01_220)] text-white p-12 lg:p-24 flex flex-col justify-between">
                    <div>
                        <img src={logo} alt="Isotek Logo" className="h-10 w-auto brightness-0 invert mb-12" />
                        <p className="max-w-prose text-white/60 text-lg leading-relaxed mb-16">
                            Elevando o padrão de qualidade da sua empresa com tecnologia de ponta, processos simplificados e foco total na excelência operacional.
                        </p>
                        <nav className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {['Início', 'Sobre Nós', 'Método', 'Contato'].map(link => (
                                <button 
                                    key={link} 
                                    onClick={() => scrollToSection(link === 'Início' ? 'inicio' : link === 'Sobre Nós' ? 'sobre' : link === 'Método' ? 'funcionalidades' : 'contato')}
                                    className="text-left text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-12">
                        © 2024 Isotek Systems. Premium Quality Management.
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-[oklch(60%_0.15_220)] text-white p-12 lg:p-24 relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10 max-w-md">
                        <div className="inline-block px-3 py-1 bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest mb-6">
                            Newsletter
                        </div>
                        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
                            Mantenha a sua <br />excelência em dia.
                        </h3>
                        <p className="text-white/70 mb-10 text-lg max-w-prose">
                            Junte-se a mais de 5.000 líderes que já recebem nossas estratégias exclusivas de gestão.
                        </p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="E-mail corporativo"
                                className="w-full px-6 py-4 rounded-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all"
                            />
                            <button className="w-full py-4 bg-white text-[oklch(20%_0.01_220)] font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-sm">
                                Assinar Agora
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
                        <CheckCircle2 size={400} />
                    </div>
                </div>
            </footer>
        </div>
    );
};
