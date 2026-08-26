import { describe, it, expect } from 'vitest';
import { calculateAuditEarnings } from './finance';

/**
 * Suíte de teste do cálculo de repasses financeiros entre plataforma e auditores.
 * Valores de referência: GATEWAY_PERCENT = 3,99% + R$ 1,00 fixo por transação.
 * Este cálculo envolve dinheiro real de terceiros — regressão aqui é incidente financeiro.
 */
describe('calculateAuditEarnings', () => {
    // Cenário base: auditoria no preço padrão (R$ 1.200), auditor Bronze (65%)
    it('calcula gateway, base líquida e split para auditoria padrão (Bronze)', () => {
        const r = calculateAuditEarnings(1200);

        // Gateway: 1200 * 0,0399 + 1,00 = 48,88
        expect(r.gatewayCost).toBeCloseTo(48.88, 6);
        // Base líquida: 1200 - 48,88 = 1151,12
        expect(r.netBasis).toBeCloseTo(1151.12, 6);
        // Split Bronze (65%): 1151,12 * 0,65
        expect(r.auditorShare).toBeCloseTo(748.228, 6);
        expect(r.platformShare).toBeCloseTo(402.892, 6);
        expect(r.auditorRate).toBe(0.65);
        expect(r.auditorLevel).toBe('Bronze');
    });

    it('garante o invariante contábil: auditorShare + platformShare = netBasis', () => {
        for (const gross of [0, 1, 500.37, 1200, 99999.99]) {
            const r = calculateAuditEarnings(gross);
            expect(r.auditorShare + r.platformShare).toBeCloseTo(r.netBasis, 9);
            expect(r.auditorShare).toBeGreaterThanOrEqual(0);
            expect(r.platformShare).toBeGreaterThanOrEqual(0);
        }
    });

    it('aplica taxa personalizada em percentual e rotula como Personalizada', () => {
        const r = calculateAuditEarnings(1200, 'bronze', 72.5);
        expect(r.auditorRate).toBeCloseTo(0.725, 10);
        expect(r.auditorLevel).toBe('Personalizada');
        expect(r.auditorShare).toBeCloseTo(r.netBasis * 0.725, 6);
    });

    it('é insensível a caixa no nível do auditor', () => {
        const r = calculateAuditEarnings(1000, 'DIAMOND');
        expect(r.auditorRate).toBe(0.9);
        expect(r.auditorLevel).toBe('Diamante');
    });

    it('usa Bronze como fallback para nível desconhecido', () => {
        const r = calculateAuditEarnings(1000, 'nivel_inexistente');
        expect(r.auditorRate).toBe(0.65);
        expect(r.auditorLevel).toBe('Bronze');
    });

    it('trata valor bruto zero sem gerar repasse negativo (taxa fixa absorvida)', () => {
        const r = calculateAuditEarnings(0);
        // Gateway seria 0 * 3,99% + 1,00 = 1,00 > 0 -> base líquida clampada em 0
        expect(r.netBasis).toBe(0);
        expect(r.auditorShare).toBe(0);
        expect(r.platformShare).toBe(0);
    });

    it('retorna o bruto informado intacto para rastreabilidade', () => {
        expect(calculateAuditEarnings(777.77).grossTotal).toBe(777.77);
    });
});
