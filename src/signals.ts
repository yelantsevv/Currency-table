import { computed, signal, effect } from '@preact/signals-react';
import { webSocket } from 'rxjs/webSocket';

const streamPairs = [
  'EURUSDT', 'BTCUSDT', 'ETHUSDT',
  'LTCUSDT', 'BNBUSDT', 'XRPUSDT',
  'ADAUSDT', 'SOLUSDT', 'DOGEUSDT',
  'TRXUSDT', 'LINKUSDT', 'NEARUSDT',
  'ATOMUSDT', 'FILUSDT', 'TONUSDT'
];

const prices: Record<string, ReturnType<typeof signal>> = {};

for (const symbol of streamPairs) {
  prices[symbol] = signal<number | 'Loading...'>('Loading...');
}

const url = `wss://stream.binance.com:9443/stream?streams=${streamPairs.map(p => `${p.toLowerCase()}@trade`).join('/')}`;

const socket$ = webSocket<{ stream: string; data: { p: string; s: string } }>({ url });

socket$
  .subscribe({
    next: ({ data }) => {
      const symbol = data.s;
      const price = parseFloat(data.p);
      if (prices[symbol]) {
        prices[symbol].value = price;
      }
    },
    error: (err) => console.error('WebSocket error:', err),
    complete: () => console.log('WebSocket closed')
  });

const rates = {
  USDT: signal(1),
  ...Object.fromEntries(
    streamPairs.map((pair) => {
      const base = pair.replace('USDT', '');
      return [base, prices[pair]];
    })
  )
} as const;

export const currencyList = Object.keys(rates);

export const pythagorasTable = computed(() => {
  const table: Record<string, Record<string, string>> = {};

  for (const base of currencyList) {
    const baseRate = +rates[base as keyof typeof rates];
    table[base] = {};

    for (const quote of currencyList) {
      const quoteRate = +rates[quote as keyof typeof rates];
      const rate = baseRate / quoteRate;
      table[base][quote] = rate.toFixed(8);
    }
  }
  return table;
});


const prevRates: Record<string, Record<string, ReturnType<typeof signal<number | null>>>> = {};
const trendCache: Record<string, string> = {};

for (const from of currencyList) {
  prevRates[from] = {};
  for (const to of currencyList) {
    prevRates[from][to] = signal<number | null>(null);
  }
}

export const cell = (from: string, to: string) => {
  const display = signal<string>('-');

  effect(() => {
    const rateRaw = pythagorasTable.value[from][to];
    const rate = +rateRaw;

    if (isNaN(rate)) {
      display.value = '-';
      return;
    }

    const prevSignal = prevRates[from][to];
    const prev = prevSignal.value as number;

    if (prev === null) {
      display.value = rate.toFixed(8);
    } else {
      const epsilon = 1e-8;
      let trend = trendCache[`${from}-${to}`] || ' ⏺';
      if (Math.abs(rate - prev) > epsilon) {
        trend = rate > prev ? '▲' : '🔻';
        trendCache[`${from}-${to}`] = trend;
      }

      display.value = `${trend} ${+rate}`;
    }

    prevSignal.value = rate;

  });

  return computed(() => display);
};