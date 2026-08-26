import { describe, it, expect } from 'vitest';
import {
    formatCNPJ,
    formatDate,
    getStatusColor,
    getStatusLabel,
    daysUntil,
    isDateNear,
    isDateOverdue,
} from './format';
import { formatCurrency } from './finance';

/**
 * Utilitários de formatação alimentam documentos oficiais do SGQ (CNPJs de
 * empresas/unidades/fornecedores) e a interface inteira. Erro aqui aparece
 * direto para o cliente e quebra rastreabilidade normativa.
 */
describe('formatCNPJ', () => {
    it('formata CNPJ completo de 14 dígitos', () => {
        expect(formatCNPJ('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('funciona como máscara de input (entrada parcial)', () => {
        expect(formatCNPJ('')).toBe('');
        expect(formatCNPJ('1')).toBe('1');
        expect(formatCNPJ('123')).toBe('12.3');
        expect(formatCNPJ('123456789')).toBe('12.345.678/9');
    });

    it('remove caracteres não numéricos e é idempotente', () => {
        const once = formatCNPJ('12.345.678/0001-95');
        expect(once).toBe('12.345.678/0001-95');
        expect(formatCNPJ(once)).toBe(once);
    });

    it('trunca entradas acima de 14 dígitos', () => {
        // Primeiros 14 dígitos: 12345678901234
        expect(formatCNPJ('123456789012345678')).toBe('12.345.678/9012-34');
    });

    it('retorna vazio para entrada sem dígitos', () => {
        expect(formatCNPJ('abc-def')).toBe('');
    });
});

describe('formatDate', () => {
    it('formata data no padrão brasileiro', () => {
        const d = new Date(2026, 7, 26); // 26/08/2026 (mês é 0-indexed)
        expect(formatDate(d)).toBe('26/08/2026');
    });

    it('aceita string ISO', () => {
        expect(formatDate(new Date(2026, 0, 15))).toBe('15/01/2026');
    });

    it('retorna "-" para data inválida', () => {
        expect(formatDate('data-invalida')).toBe('-');
    });
});

describe('formatCurrency', () => {
    it('formata valores em BRL', () => {
        const out = formatCurrency(1234.56);
        expect(out.replace(/\u00a0/g, ' ')).toContain('1.234,56');
        expect(out).toContain('R$');
    });
});

describe('status helpers', () => {
    it('mapeia status conhecido para classe de cor e tradução', () => {
        expect(getStatusColor('closed')).toContain('green');
        expect(getStatusLabel('closed')).toBe('Concluída');
    });

    it('tem fallback seguro para status desconhecido', () => {
        expect(getStatusColor('status_fantasma')).toBe('bg-gray-100 text-gray-800');
        expect(getStatusLabel('status_fantasma')).toBe('status_fantasma');
    });
});

describe('helpers de prazo', () => {
    it('classifica data futura próxima dentro do limite de 7 dias', () => {
        const em3dias = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        expect(isDateNear(em3dias)).toBe(true);
        expect(isDateOverdue(em3dias)).toBe(false);
        const dias = daysUntil(em3dias);
        expect(dias).toBeGreaterThanOrEqual(2);
        expect(dias).toBeLessThanOrEqual(4);
    });

    it('classifica data futura distante como fora do near window', () => {
        const em30dias = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        expect(isDateNear(em30dias)).toBe(false);
        expect(isDateOverdue(em30dias)).toBe(false);
    });

    it('marca data passada como vencida', () => {
        const ha5dias = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
        expect(isDateOverdue(ha5dias)).toBe(true);
        expect(isDateNear(ha5dias)).toBe(false);
        expect(daysUntil(ha5dias)).toBeLessThan(0);
    });
});
