# Design

## Atmosphere

Engenharia da conformidade, moderna e ágil. Superfícies escuras (navy profundo) que transmitem rigor e confiança, cortadas por um teal vivo que carrega energia e ação. A sensação é de um produto técnico que respira: limpo, preciso, sem o peso burocrático do setor. "Qualidade sem burocracia" traduzida em ar, contraste forte e um único acento confiante.

## Color

Estratégia: **Committed** — o navy domina as superfícies de alto impacto (herói, seções de produto, rodapé) e o teal é a voz da marca (CTA, destaques, detalhes). Sem hedging com neutros mornos.

| Token | Valor | Papel |
|---|---|---|
| `--color-brand-navy` | `#012B51` | Superfície escura primária, texto sobre claro |
| `#021f3a` | `#021f3a` | Navy mais profundo (rodapé, contraste) |
| `--color-brand-card` | `#081424` | Cards sobre navy |
| `--color-brand-teal` | `#0FDBAB` | Acento primário, CTA, foco |
| `--color-accent` (verde) | `#8CE67E` | Acento secundário, gradiente do símbolo |
| Branco / `slate-50` | `#ffffff` / `#f8fafc` | Superfícies claras |

Contraste: texto de corpo sobre navy usa branco a ≥80% de opacidade (mínimo para AA). Teal é acento, **não** texto de corpo sobre claro (falha de contraste). Botão primário = teal com texto navy (alto contraste), nunca teal-sobre-branco para texto.

## Typography

Família única committed: **Poppins** (400–900), via Google Fonts. Hierarquia por contraste de peso e escala, não por troca de fontes.

- Display/H1: `clamp(2.5rem, 6vw, 4.5rem)`, peso 800, `tracking-tight`, `text-wrap: balance`.
- H2 de seção: `clamp(1.75rem, 3.5vw, 2.75rem)`, peso 800.
- Corpo: 1rem–1.125rem, peso 400–500, linha ≤ 70ch.
- Labels/kicker: uso **pontual** (não em toda seção). Maiúsculas reservadas a rótulos curtos (≤4 palavras) e badges.

## Components

- **Botão primário:** teal `#0FDBAB`, texto navy, peso 700, `rounded-lg`, hover `brightness-110`, sombra suave. Rótulo verbo+objeto ("Agendar demo").
- **Botão secundário:** contorno claro sobre navy / contorno navy sobre claro, fundo transparente.
- **Cards:** sobre navy usam `--color-brand-card` com borda `white/5`, hover eleva (`-translate-y`) e acende borda teal. Evitar grade de cards idênticos: variar tamanho/peso (layout bento) onde possível.
- **Símbolo de marca** (`brand-symbol.png`): marca d'água decorativa de baixa opacidade atrás de heróis/seções.
- **Mockup de produto** (`hero-phone-mockup.png`): visual de produto principal no herói.

## Layout

- Container central `max-w-7xl`, padding lateral `px-6`.
- Ritmo de espaçamento variado com `clamp()`; seções respiram (`py-24`+) em telas grandes.
- Grids responsivos sem breakpoints: `repeat(auto-fit, minmax(280px, 1fr))` quando cards forem o recurso certo.
- Composição assimétrica permitida no herói e na seção de produto (texto + mockup).

## Motion

- Curva assinatura: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo), classe `.animate-industrial` (fade + translateY 10px).
- Entrada orquestrada no carregamento; sem fade-on-scroll repetido em toda seção.
- **`prefers-reduced-motion: reduce`** desliga transforms/animações (crossfade ou estado final imediato). Obrigatório.

## Bans (específicos desta marca)

- Eyebrow em maiúsculas com tracking acima de cada seção (usar no máximo um kicker nomeado e deliberado).
- Grade de 4 cards idênticos (ícone + título + texto).
- Ícones preenchidos com gradiente como decoração padrão.
- Prova social falsa: logos de marcas reais que não são clientes, depoimentos fabricados misturando idiomas.
- `alert()` como feedback de formulário — usar estado de sucesso inline.
