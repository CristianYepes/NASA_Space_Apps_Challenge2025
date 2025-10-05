import React, { useEffect, useMemo, useState } from 'react';

type Exoplanet = {
  planet_name: string;
  host_star?: string;
  biosignature_score?: number;
  habitability_score?: number;
  detectability_score?: number;
  biosignature_potential?: number;
  stellar_activity?: number;
  radius_earth?: number;
  mass_earth?: number;
  orbital_period?: number;
};

interface RankingAsideProps {
  onTopChange?: (topPlanetName: string) => void;
}

const columns: Array<{ key: keyof Exoplanet; label: string }> = [
  { key: 'planet_name', label: 'Planet' },
  { key: 'biosignature_score', label: 'BioSig' },
];

function safeNumber(value: any): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function RankingAside({ onTopChange }: RankingAsideProps) {
  const [rows, setRows] = useState<Exoplanet[]>([]);

  useEffect(() => {
    // Dataset proporcionado por el usuario (nombre y biosignature_score)
    const providedRows: Exoplanet[] = [
      { planet_name: 'TOI-2285 b', biosignature_score: 900 },
      { planet_name: 'TOI-6002 b', biosignature_score: 900 },
      { planet_name: 'TOI-2095 c', biosignature_score: 900 },
      { planet_name: 'TOI-5799 c', biosignature_score: 900 },
      { planet_name: 'LP 890-9 c', biosignature_score: 900 },
      { planet_name: 'K2-3 d', biosignature_score: 900 },
      { planet_name: 'Kepler-235 e', biosignature_score: 850 },
      { planet_name: 'TOI-406.01', biosignature_score: 850 },
      { planet_name: 'K2-3 d', biosignature_score: 850 },
      { planet_name: 'Kepler-205 c', biosignature_score: 850 }
    ];
    setRows(providedRows);
  }, []);

  // Sin ordenamiento: respetar el orden recibido
  const sorted = rows;

  useEffect(() => {
    if (sorted.length && onTopChange) onTopChange(sorted[0].planet_name);
  }, [sorted, onTopChange]);

  // Orden fijo: sin manejadores de click

  return (
    <aside className="ranking-aside">
      <h3 className="ranking-title">Ranking de Exoplanetas</h3>
      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={String(col.key)}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, idx) => (
              <tr key={r.planet_name} className={idx === 0 ? 'top-row' : ''}>
                <td>{r.planet_name}</td>
                <td>{r.biosignature_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}

function parseCsv(text: string): Exoplanet[] {
  const [header, ...lines] = text.split(/\r?\n/).filter(Boolean);
  const headers = header.split(',').map(h => h.trim());
  return lines.map(line => {
    const parts = splitCsvLine(line);
    const obj: any = {};
    headers.forEach((h, i) => (obj[h] = parts[i]));
    // normalize numeric fields
    ['biosignature_score','habitability_score','detectability_score','biosignature_potential','stellar_activity','radius_earth','mass_earth','orbital_period']
      .forEach(k => { if (obj[k] !== undefined) obj[k] = Number(obj[k]); });
    return obj as Exoplanet;
  });
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result.map(s => s.trim());
}

function getFallbackRows(): Exoplanet[] {
  return [
    { planet_name: 'TOI-2285 b', host_star: 'TOI-2285', biosignature_score: 900, habitability_score: 350, detectability_score: 300, biosignature_potential: 250, stellar_activity: 0, radius_earth: 174, mass_earth: 195, orbital_period: 2726955 },
    { planet_name: 'TOI-6002 b', host_star: 'TOI-6002', biosignature_score: 900, habitability_score: 350, detectability_score: 300, biosignature_potential: 200, stellar_activity: 50, radius_earth: 165, mass_earth: 0, orbital_period: 10904821 },
    { planet_name: 'TOI-2095 c', host_star: 'TOI-2095', biosignature_score: 900, habitability_score: 350, detectability_score: 300, biosignature_potential: 250, stellar_activity: 0, radius_earth: 133, mass_earth: 74, orbital_period: 2817232 },
  ];
}


