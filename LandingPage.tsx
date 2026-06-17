import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    ArrowRight,
    Check,
    FileCheck2,
    ShieldAlert,
    ListChecks,
    BarChart3,
    GitBranch,
    CalendarCheck,
    Quote,
} from 'lucide-react';
import { supabase } from './lib/supabase';
import heroPhoneMockup from './assets/hero-phone-mockup.png';
import brandSymbol from './assets/brand-symbol.png';
import brandLogo from './assets/brand-logo.png';
import avatarJoaoDoria from './assets/avatar-joao-doria.png';
import avatarSofia from './assets/avatar-sofia.png';
import avatarCarlos from './assets/avatar-carlos.png';

interface CompanyLogo {
    id: string;
    name: string;
    logo_url: string | null;
}

const NAV_LINKS = [
    { label: 'Recursos', id: 'recursos' },
    { label: 'Como funciona', id: 'como-funciona' },
    { label: 'Depoimentos', id: 'depoimentos' },
    { label: 'Contato', id: 'contato' },
];

// Logo Component utilizing the official brand-logo image
export const IsotekLogo: React.FC<{ light?: boolean; className?: string; height?: number }> = ({ light = false, className = '', height = 28 }) => {
    return (
        <img
            src={brandLogo}
            alt="Isotek"
            style={{ height }}
            className={`w-auto object-contain transition-all duration-300 ${light ? 'brightness-0 invert' : ''} ${className}`}
        />
    );
};

// ---------------------------------------------------------------------------
// Capability cell (bento grid) — clean line icons, varied sizes, no gradients
// ---------------------------------------------------------------------------
const Capability: React.FC<{
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    className?: string;
}> = ({ icon: Icon, title, children, className = '' }) => (
    <div
        className={`group relative flex flex-col rounded-2xl bg-brand-card border border-white/[0.07] p-7 transition-all duration-300 hover:border-brand-teal/40 hover:-translate-y-1 ${className}`}
    >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal ring-1 ring-inset ring-brand-teal/20 transition-colors group-hover:bg-brand-teal/15">
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-white/70">{children}</p>
    </div>
);

// ---------------------------------------------------------------------------
// PDCA step — a real ordered sequence, so numbered markers carry meaning
// ---------------------------------------------------------------------------
const PdcaStep: React.FC<{ num: string; phase: string; children: React.ReactNode }> = ({ num, phase, children }) => (
    <div className="relative flex flex-col gap-3 sm:flex-1">
        <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-semibold text-brand-teal">{num}</span>
            <span className="text-lg font-bold text-white">{phase}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-white/65">{children}</p>
    </div>
);

const TESTIMONIALS = [
    {
        quote: 'A Isotek transformou nossa auditoria interna. Saímos do pesadelo de planilhas para um processo fluido e organizado, com tudo rastreável.',
        name: 'João Doria',
        role: 'CEO',
        company: 'Indústria Tech',
        avatar: avatarJoaoDoria,
    },
    {
        quote: 'A rastreabilidade dos processos e o controle de versão dos documentos chegaram a um nível que a gente não tinha como manter no papel.',
        name: 'Sofia Kovalevsky',
        role: 'Diretora de Qualidade',
        company: 'TechCorp',
        avatar: avatarSofia,
    },
    {
        quote: 'Reduzimos o tempo de preparação para auditorias externas em mais de 70%. A documentação fica pronta o ano inteiro, não só na véspera.',
        name: 'Carlos Drummond',
        role: 'Gerente de Compliance',
        company: 'Meta Indústria',
        avatar: avatarCarlos,
    },
];

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [companyLogos, setCompanyLogos] = useState<CompanyLogo[]>([]);

    // Demo request form
    const [demo, setDemo] = useState({ name: '', email: '', company: '' });
    const [demoSent, setDemoSent] = useState(false);

    // Footer newsletter
    const [footerEmail, setFooterEmail] = useState('');
    const [footerSent, setFooterSent] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pausa o vídeo ambiente do hero quando o usuário prefere movimento reduzido
    const heroVideoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => {
            const video = heroVideoRef.current;
            if (!video) return;
            if (mq.matches) video.pause();
            else video.play().catch(() => {});
        };
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
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
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-brand-navy font-sans antialiased selection:bg-brand-teal selection:text-brand-navy">

            {/* ============================= NAVBAR ============================= */}
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/90 backdrop-blur-md py-3.5 border-b border-gray-200/80 shadow-sm'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <button
                        type="button"
                        className="flex items-center gap-2"
                        onClick={() => scrollToSection('inicio')}
                        aria-label="Ir para o início"
                    >
                        <IsotekLogo light={!isScrolled} height={28} />
                    </button>

                    <nav className="hidden items-center gap-9 md:flex">
                        {NAV_LINKS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-colors ${
                                    isScrolled ? 'text-brand-navy/80 hover:text-brand-teal' : 'text-white/80 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}

                        <span className={`h-5 w-px ${isScrolled ? 'bg-gray-200' : 'bg-white/20'}`} aria-hidden="true" />

                        <button
                            onClick={handleLoginClick}
                            className={`text-sm font-medium transition-colors ${
                                isScrolled ? 'text-brand-navy/80 hover:text-brand-teal' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => scrollToSection('demo')}
                            className="rounded-lg bg-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-sm transition-all hover:brightness-105 hover:shadow-md"
                        >
                            Agendar demo
                        </button>
                    </nav>

                    <button
                        className={`p-2 transition-colors md:hidden ${isScrolled ? 'text-brand-navy' : 'text-white'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="absolute left-0 top-full w-full border-b border-gray-200 bg-white shadow-lg md:hidden">
                        <div className="space-y-1 px-6 py-5">
                            {NAV_LINKS.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full rounded-lg px-2 py-3 text-left text-base font-medium text-brand-navy transition-colors hover:bg-slate-50 hover:text-brand-teal"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={handleLoginClick}
                                className="block w-full rounded-lg px-2 py-3 text-left text-base font-medium text-brand-navy transition-colors hover:bg-slate-50 hover:text-brand-teal"
                            >
                                Entrar
                            </button>
                            <button
                                onClick={() => scrollToSection('demo')}
                                className="mt-2 w-full rounded-lg bg-brand-teal py-3.5 text-base font-semibold text-brand-navy"
                            >
                                Agendar demo
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* ============================= HERO ============================= */}
            <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden bg-brand-navy px-6 pb-24 pt-32 lg:pb-32 lg:pt-44">
                {/* Ambient video background (navy/teal gradient loop) */}
                <video
                    ref={heroVideoRef}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 motion-reduce:hidden"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/videos/hero-poster.jpg"
                    aria-hidden="true"
                >
                    <source src="/videos/hero-loop.webm" type="video/webm" />
                    <source src="/videos/hero-loop.mp4" type="video/mp4" />
                </video>
                {/* Navy scrim keeps white text at AA contrast over the video */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-brand-navy/55 to-brand-navy" aria-hidden="true" />

                {/* Decorative orbital rings */}
                <div className="pointer-events-none absolute right-[-12%] top-[-8%] z-0 h-[620px] w-[620px] opacity-25">
                    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" aria-hidden="true">
                        <circle cx="100" cy="100" r="80" stroke="#0FDBAB" strokeWidth="0.8" strokeDasharray="4 6" />
                        <circle cx="100" cy="100" r="96" stroke="#8CE67E" strokeWidth="0.6" />
                    </svg>
                </div>
                {/* Radial depth glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

                <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <span className="reveal reveal-1 inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-1.5 text-sm font-medium text-brand-teal">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" aria-hidden="true" />
                            SGQ baseado na ISO 9001:2015
                        </span>

                        <h1 className="reveal reveal-2 mt-6 text-balance text-[length:clamp(2.6rem,6vw,3.85rem)] font-extrabold leading-[1.05] tracking-tight text-white">
                            A sua ISO 9001 sempre pronta para auditoria.
                        </h1>

                        <p className="reveal reveal-3 mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                            A Isotek reúne documentos, riscos, não conformidades, auditorias e indicadores em uma só plataforma.
                            Sua empresa para de correr atrás de planilha e passa a gerir a qualidade de forma contínua, no ciclo PDCA.
                        </p>

                        <div className="reveal reveal-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <button
                                onClick={() => scrollToSection('demo')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-teal px-7 py-3.5 text-base font-semibold text-brand-navy shadow-lg shadow-brand-teal/20 transition-all hover:brightness-105 hover:shadow-xl hover:shadow-brand-teal/25"
                            >
                                Agendar demo
                                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => scrollToSection('recursos')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
                            >
                                Ver os recursos
                            </button>
                        </div>

                        {/* Honest trust line — product facts, not fake logos */}
                        <ul className="reveal reveal-4 mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/65">
                            {['Ciclo PDCA completo', 'Portal do auditor', 'Multiempresa e multiunidade'].map((item) => (
                                <li key={item} className="inline-flex items-center gap-2">
                                    <Check className="h-4 w-4 text-brand-teal" strokeWidth={2.5} aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product mockup + brand symbol watermark */}
                    <div className="reveal reveal-3 relative flex min-h-[420px] items-center justify-center lg:col-span-6 lg:min-h-[620px]">
                        <div className="pointer-events-none absolute -z-0 flex h-[80vh] max-h-[540px] items-center justify-center lg:max-h-[680px]">
                            <img src={brandSymbol} alt="" aria-hidden="true" className="h-full w-auto object-contain opacity-50" />
                        </div>
                        <img
                            src={heroPhoneMockup}
                            alt="Painel da Isotek em um celular, mostrando o progresso de um projeto de qualidade"
                            className="relative h-[70vh] max-h-[480px] w-auto object-contain transition-transform duration-500 hover:scale-[1.03] lg:max-h-[620px]"
                        />
                    </div>
                </div>
            </section>

            {/* ===================== TRUST / CREDENTIALS ===================== */}
            <section className="border-y border-gray-100 bg-slate-50 py-10">
                <div className="mx-auto max-w-7xl px-6">
                    {companyLogos.length > 0 ? (
                        <>
                            <p className="mb-7 text-center text-sm font-medium text-brand-navy/50">
                                Empresas que gerenciam a qualidade com a Isotek
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
                                {companyLogos.map((company) => (
                                    <div key={company.id} className="opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                                        {company.logo_url ? (
                                            <img src={company.logo_url} alt={company.name} className="h-7 w-auto object-contain md:h-8" />
                                        ) : (
                                            <span className="text-sm font-bold uppercase tracking-wide text-brand-navy/60">{company.name}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
                            {['ISO 9001:2015', 'Ciclo PDCA', 'ISO 19011 (auditorias)', 'Multiempresa', 'LGPD'].map((item, i) => (
                                <React.Fragment key={item}>
                                    {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-brand-navy/20 sm:block" aria-hidden="true" />}
                                    <span className="text-sm font-semibold text-brand-navy/55">{item}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ========================= RECURSOS ========================= */}
            <section id="recursos" className="bg-brand-navy py-24 lg:py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-balance text-[length:clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                            Tudo o que a norma pede, em um sistema só
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-white/70">
                            Cada requisito da ISO 9001 vira uma rotina simples de operar. Sem retrabalho, sem papel solto, sem perder o controle das versões.
                        </p>
                    </div>

                    {/* Bento grid: varied spans break the identical-card reflex */}
                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        <Capability icon={FileCheck2} title="Gestão de documentos (GED)" className="lg:col-span-2 reveal reveal-1">
                            Controle de versão, fluxo de aprovação e distribuição. Cada documento com histórico, responsável e data, pronto para mostrar ao auditor a qualquer momento.
                        </Capability>
                        <Capability icon={ShieldAlert} title="Riscos e oportunidades" className="reveal reveal-2">
                            Matriz de riscos com plano de ação e acompanhamento. Antecipe problemas antes que virem não conformidade.
                        </Capability>
                        <Capability icon={GitBranch} title="Não conformidades e ações corretivas" className="reveal reveal-3">
                            Registre o desvio, investigue a causa raiz com os 5 porquês e verifique a eficácia da ação tomada.
                        </Capability>
                        <Capability icon={ListChecks} title="Auditorias internas e externas" className="reveal reveal-4">
                            Planeje, conduza por checklist (ISO 19011) e trate as constatações em um fluxo único, do apontamento à resposta.
                        </Capability>
                        <Capability icon={BarChart3} title="Indicadores e análise crítica" className="reveal reveal-4">
                            KPIs em tempo real e reuniões de análise crítica embasadas em dados, não em achismo.
                        </Capability>
                    </div>
                </div>
            </section>

            {/* ======================= COMO FUNCIONA (PDCA) ======================= */}
            <section id="como-funciona" className="relative overflow-hidden bg-brand-navy-deep py-24 lg:py-28">
                <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] opacity-[0.07]">
                    <img src={brandSymbol} alt="" aria-hidden="true" className="h-full w-full object-contain" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-balance text-[length:clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                            Como a Isotek organiza sua qualidade
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-white/70">
                            A plataforma segue o ciclo PDCA da ISO 9001, do planejamento estratégico à melhoria contínua. Cada etapa tem seu lugar.
                        </p>
                    </div>

                    <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:gap-6">
                        <PdcaStep num="01" phase="Planejar">
                            Contexto, partes interessadas, matriz de riscos, objetivos e política da qualidade.
                        </PdcaStep>
                        <span className="hidden h-px flex-none self-start sm:mt-3 sm:block sm:w-8 sm:bg-gradient-to-r sm:from-brand-teal/40 sm:to-transparent" aria-hidden="true" />
                        <PdcaStep num="02" phase="Executar">
                            Documentos, treinamentos, fornecedores e controle de produção sempre sob controle.
                        </PdcaStep>
                        <span className="hidden h-px flex-none self-start sm:mt-3 sm:block sm:w-8 sm:bg-gradient-to-r sm:from-brand-teal/40 sm:to-transparent" aria-hidden="true" />
                        <PdcaStep num="03" phase="Verificar">
                            Auditorias, indicadores de desempenho e análise crítica pela direção.
                        </PdcaStep>
                        <span className="hidden h-px flex-none self-start sm:mt-3 sm:block sm:w-8 sm:bg-gradient-to-r sm:from-brand-teal/40 sm:to-transparent" aria-hidden="true" />
                        <PdcaStep num="04" phase="Agir">
                            Não conformidades, ações corretivas e melhoria contínua que fecham o ciclo.
                        </PdcaStep>
                    </div>
                </div>
            </section>

            {/* ========================= DEPOIMENTOS ========================= */}
            {/* NOTE: depoimentos ilustrativos. Substituir por cases reais (com autorização) antes de publicar. */}
            <section id="depoimentos" className="border-b border-gray-100 bg-white py-24 lg:py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-balance text-[length:clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-brand-navy">
                            Quem já tirou a qualidade do papel
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-brand-navy/65">
                            Gestores e diretores de qualidade que trocaram planilhas soltas por um processo único e rastreável.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {TESTIMONIALS.map((t) => (
                            <figure
                                key={t.name}
                                className="flex h-full flex-col rounded-2xl border border-gray-100 bg-slate-50/70 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/30 hover:shadow-lg hover:shadow-brand-navy/5"
                            >
                                <Quote className="h-7 w-7 text-brand-teal/40" aria-hidden="true" />
                                <blockquote className="mt-4 flex-grow text-[15px] leading-relaxed text-brand-navy/85">
                                    {t.quote}
                                </blockquote>
                                <figcaption className="mt-7 flex items-center gap-4 border-t border-gray-200/70 pt-6">
                                    <img src={t.avatar} alt={t.name} className="h-12 w-12 flex-shrink-0 rounded-full object-cover" />
                                    <div className="min-w-0">
                                        <div className="truncate font-bold text-brand-navy">{t.name}</div>
                                        <div className="truncate text-sm text-brand-navy/55">
                                            {t.role}, {t.company}
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ DEMO CTA ============================ */}
            <section id="demo" className="relative overflow-hidden bg-brand-navy py-24 lg:py-28">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[130px]" />
                <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
                    <div>
                        <h2 className="text-balance text-[length:clamp(1.75rem,3.5vw,2.6rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                            Veja a Isotek funcionando na sua operação
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-white/75">
                            Agende uma demonstração de 30 minutos. Mostramos como migrar seus controles atuais e deixar a sua
                            empresa pronta para a próxima auditoria, sem virar um projeto eterno.
                        </p>
                        <ul className="mt-8 space-y-3 text-white/75">
                            {['Demonstração guiada com seus próprios processos', 'Sem cartão de crédito, sem compromisso', 'Resposta da nossa equipe em até 1 dia útil'].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Check className="mt-0.5 h-5 w-5 flex-none text-brand-teal" strokeWidth={2.5} aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-brand-card p-8 shadow-2xl shadow-black/20">
                        {demoSent ? (
                            <div className="flex flex-col items-center py-10 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal ring-1 ring-inset ring-brand-teal/30">
                                    <CalendarCheck className="h-7 w-7" aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 text-xl font-bold text-white">Pedido recebido!</h3>
                                <p className="mt-2 text-white/70">
                                    Nossa equipe entra em contato em breve para agendar a sua demonstração.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setDemoSent(true);
                                }}
                                className="space-y-4"
                            >
                                <h3 className="text-lg font-bold text-white">Agende sua demonstração</h3>
                                <div>
                                    <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium text-white/80">
                                        Nome
                                    </label>
                                    <input
                                        id="demo-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        value={demo.name}
                                        onChange={(e) => setDemo({ ...demo, name: e.target.value })}
                                        placeholder="Seu nome"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-white/80">
                                        E-mail corporativo
                                    </label>
                                    <input
                                        id="demo-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={demo.email}
                                        onChange={(e) => setDemo({ ...demo, email: e.target.value })}
                                        placeholder="voce@suaempresa.com.br"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="demo-company" className="mb-1.5 block text-sm font-medium text-white/80">
                                        Empresa
                                    </label>
                                    <input
                                        id="demo-company"
                                        type="text"
                                        autoComplete="organization"
                                        value={demo.company}
                                        onChange={(e) => setDemo({ ...demo, company: e.target.value })}
                                        placeholder="Nome da empresa"
                                        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-teal"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-teal py-3.5 text-base font-semibold text-brand-navy shadow-lg shadow-brand-teal/20 transition-all hover:brightness-105"
                                >
                                    Agendar demo
                                    <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ============================= FOOTER ============================= */}
            <footer id="contato" className="flex min-h-[460px] flex-col lg:flex-row">
                {/* Left — navy */}
                <div className="relative flex w-full flex-col justify-between overflow-hidden bg-brand-navy-deep p-12 text-white lg:w-1/2 lg:p-20">
                    <div className="relative z-10">
                        <IsotekLogo light height={32} className="mb-9" />
                        <p className="mb-11 max-w-md text-base leading-relaxed text-white/70">
                            Gestão da qualidade baseada na ISO 9001:2015. Processos organizados, documentação rastreável e foco
                            na melhoria contínua, sem a burocracia de sempre.
                        </p>
                        <nav className="grid max-w-xs grid-cols-2 gap-y-3" aria-label="Navegação do rodapé">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-left text-sm font-medium text-white/55 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={handleLoginClick}
                                className="text-left text-sm font-medium text-white/55 transition-colors hover:text-white"
                            >
                                Entrar
                            </button>
                        </nav>
                    </div>
                    <div className="relative z-10 mt-12 text-sm text-white/40">
                        © {new Date().getFullYear()} Isotek. Gestão da qualidade ISO 9001.
                    </div>
                </div>

                {/* Right — teal */}
                <div className="relative flex w-full flex-col justify-center overflow-hidden bg-brand-teal p-12 text-brand-navy lg:w-1/2 lg:p-20">
                    <div className="relative z-10 max-w-md">
                        <h3 className="text-balance text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                            Receba boas práticas de gestão da qualidade
                        </h3>
                        <p className="mb-8 mt-4 font-medium text-brand-navy/75">
                            Conteúdos práticos sobre ISO 9001, auditorias e melhoria contínua direto no seu e-mail.
                        </p>

                        {footerSent ? (
                            <p className="flex items-center gap-2 rounded-lg bg-brand-navy/10 px-5 py-4 font-semibold text-brand-navy">
                                <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                                Inscrição confirmada. Obrigado!
                            </p>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setFooterSent(true);
                                    setFooterEmail('');
                                }}
                                className="space-y-3"
                            >
                                <label htmlFor="footer-email" className="sr-only">
                                    E-mail corporativo
                                </label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="E-mail corporativo"
                                    value={footerEmail}
                                    onChange={(e) => setFooterEmail(e.target.value)}
                                    className="w-full rounded-lg border border-brand-navy/20 bg-brand-navy/5 px-5 py-3.5 font-medium text-brand-navy placeholder:text-brand-navy/55 transition-all focus:border-transparent focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-brand-navy"
                                />
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-brand-navy py-3.5 font-semibold text-white shadow-md transition-all hover:bg-brand-navy/90"
                                >
                                    Assinar
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};
