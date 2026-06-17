import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck, BarChart3, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import brandSymbol from '../../assets/brand-symbol.png';
import avatarCarlos from '../../assets/avatar-carlos.png';

const features = [
    { icon: ShieldCheck, title: 'Conformidade ISO 9001', desc: 'Auditorias e não-conformidades em um só lugar.' },
    { icon: BarChart3, title: 'Indicadores em tempo real', desc: 'KPIs do SGQ atualizados automaticamente.' },
    { icon: FileText, title: 'GED integrado', desc: 'Controle de documentos com versionamento.' },
];

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const { session, role } = useAuth();

    useEffect(() => {
        if (session && role) {
            if (role === 'auditor') {
                navigate('/app/auditor-portal', { replace: true });
            } else {
                navigate('/app/dashboard', { replace: true });
            }
        }
    }, [session, role, navigate]);

    // Form Fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // LOGIN LOGIC
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error('Erro Login:', error.message);
                if (error.message.includes('Email not confirmed')) {
                    toast.error('Seu email ainda não foi confirmado. Entre em contato com o administrador.');
                } else {
                    toast.error(`Falha no login: ${error.message}`);
                }
                setIsLoading(false);
                return;
            }

            if (data.session && data.user) {
                // Fetch user role from profiles
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                // Redirect based on role
                if (profileData?.role === 'auditor') {
                    navigate('/app/auditor-portal', { replace: true });
                } else {
                    navigate('/app/dashboard', { replace: true });
                }
                return;
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            toast.error('Ocorreu um erro inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-white font-sans">
            {/* ---- Brand panel (hidden on small screens) ---- */}
            <div
                className="relative hidden lg:flex flex-col justify-between overflow-hidden px-15 py-14 text-white"
                style={{ background: 'radial-gradient(120% 120% at 0% 0%, #024c54 0%, #012B51 55%, #021F3A 100%)' }}
            >
                {/* decorative teal glow + watermark symbol */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-32 -right-36 h-[420px] w-[420px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(15,219,171,0.22) 0%, rgba(15,219,171,0) 70%)' }}
                />
                <img
                    src={brandSymbol}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -right-12 w-[360px] opacity-[0.08] -rotate-[8deg]"
                />

                <div className="relative z-10 flex items-center gap-3">
                    <img src={brandSymbol} alt="Isotek" className="h-10 w-10 object-contain" />
                    <span className="text-2xl font-extrabold tracking-tight">Isotek</span>
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-teal">
                        Plataforma SGQ
                    </div>
                    <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-balance">
                        Gestão da qualidade,<br />sem planilhas soltas.
                    </h1>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                        Centralize auditorias, documentos e indicadores do seu Sistema de Gestão da Qualidade.
                    </p>

                    <div className="mt-9 flex flex-col gap-5">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-4">
                                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-xl border border-brand-teal/30 bg-brand-teal/15 text-brand-teal">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <div className="text-[15px] font-bold">{title}</div>
                                    <div className="mt-0.5 text-sm text-white/60">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <img
                        src={avatarCarlos}
                        alt=""
                        className="h-11 w-11 rounded-full border-2 border-brand-teal/50 object-cover"
                    />
                    <div>
                        <p className="text-sm italic leading-relaxed text-white/90">
                            "Reduzimos em 40% o tempo de preparação para auditorias."
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-brand-teal">
                            Carlos Mendes · Gerente da Qualidade
                        </p>
                    </div>
                </div>
            </div>

            {/* ---- Form panel ---- */}
            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-[392px]">
                    {/* Logo — visible on mobile where the brand panel is hidden */}
                    <Link
                        to="/"
                        title="Voltar para Home"
                        className="mb-8 inline-flex items-center justify-center rounded-2xl border border-gray-100 bg-white p-3 shadow-md transition-transform duration-300 hover:scale-105 lg:hidden"
                    >
                        <img src="/logo_isotek.svg" alt="Isotek Logo" className="h-12 w-12 object-contain" />
                    </Link>

                    <h2 className="text-3xl font-extrabold tracking-tight text-[#025159]">
                        Bem-vindo de volta
                    </h2>
                    <p className="mt-2.5 text-base font-medium text-gray-500">
                        Entre com suas credenciais para acessar o painel.
                    </p>

                    <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                E-mail corporativo
                            </label>
                            <div className="relative flex items-center">
                                <span className="pointer-events-none absolute left-3.5 inline-flex text-gray-400">
                                    <Mail size={18} aria-hidden="true" />
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-[#025159] focus:outline-none focus:ring-[3px] focus:ring-[#025159]/15"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-gray-700">
                                Senha
                            </label>
                            <div className="relative flex items-center">
                                <span className="pointer-events-none absolute left-3.5 inline-flex text-gray-400">
                                    <Lock size={18} aria-hidden="true" />
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-11 pr-11 text-sm font-medium text-gray-900 placeholder-gray-400 transition-all focus:border-[#025159] focus:outline-none focus:ring-[3px] focus:ring-[#025159]/15"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 inline-flex items-center text-gray-400 transition-colors hover:text-[#025159] focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label htmlFor="remember-me" className="inline-flex cursor-pointer items-center gap-2 font-medium text-gray-600 hover:text-gray-900">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300"
                                    style={{ accentColor: '#03A6A6' }}
                                />
                                Lembrar-me
                            </label>
                            <a href="#" className="font-semibold text-[#028a8a] transition-colors hover:text-[#025159]">
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#025159] py-3.5 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-[#013636] focus:outline-none focus:ring-4 focus:ring-[#025159]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="mt-3.5 flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                    >
                        <ShieldCheck size={17} /> Entrar com SSO corporativo
                    </button>

                    <p className="mt-7 text-center text-sm text-gray-500">
                        Não tem uma conta?{' '}
                        <Link to="/" className="font-bold text-[#025159] hover:underline">
                            Fale com o comercial
                        </Link>
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        <Lock size={13} /> Protegido por criptografia SSL de 256 bits
                    </div>
                </div>
            </div>
        </div>
    );
};
