import { useState } from "react";

const MOODS = [
  { id: "angry", emoji: "😤", label: "angry / irritable" },
  { id: "anxious", emoji: "😰", label: "anxious / worried" },
  { id: "sad", emoji: "😢", label: "sad / emotional" },
  { id: "numb", emoji: "😶", label: "flat / numb" },
  { id: "good", emoji: "😊", label: "calm / content" },
  { id: "motivated", emoji: "✨", label: "motivated / clear" },
  { id: "foggy", emoji: "🌫️", label: "foggy / scattered" },
  { id: "overwhelmed", emoji: "🌊", label: "overwhelmed" },
];

const ENERGIES = [
  { id: "drained", label: "completely drained" },
  { id: "low", label: "low & tired" },
  { id: "medium", label: "okay-ish" },
  { id: "high", label: "energised" },
];

const SYMPTOMS = [
  "cramps", "bloating", "breast tenderness", "headache",
  "acne flare", "hair shedding", "can't sleep", "sugar cravings",
  "period started", "spotting", "clear discharge",
];

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffe4ec 0%, #ffd6e7 40%, #fce4f3 70%, #f8d7f0 100%)",
    fontFamily: "'Nunito', sans-serif",
    padding: "0",
  },
  inner: { maxWidth: 560, margin: "0 auto", padding: "2rem 1.25rem 3rem" },
  header: { textAlign: "center", marginBottom: "2rem" },
  flowerRow: { fontSize: 28, letterSpacing: 6, marginBottom: 8 },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#b5426a",
    margin: "0 0 6px",
    lineHeight: 1.2,
  },
  subtitle: { fontSize: 13, color: "#c97097", margin: 0 },
  card: {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    border: "1.5px solid rgba(255,182,212,0.5)",
    padding: "1.25rem 1.25rem",
    marginBottom: "1rem",
    boxShadow: "0 4px 24px rgba(181,66,106,0.07)",
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#d4709a",
    marginBottom: 10,
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
  },
  moodBtn: (selected) => ({
    border: selected ? "2px solid #e8739f" : "1.5px solid rgba(232,115,159,0.3)",
    background: selected ? "rgba(255,182,212,0.45)" : "rgba(255,255,255,0.5)",
    borderRadius: 16,
    padding: "10px 4px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.18s",
    transform: selected ? "scale(1.04)" : "scale(1)",
  }),
  moodEmoji: { fontSize: 22, display: "block", marginBottom: 4 },
  moodLabel: { fontSize: 10, color: "#c06090", lineHeight: 1.3 },
  energyRow: { display: "flex", gap: 7 },
  energyBtn: (selected) => ({
    flex: 1,
    border: selected ? "2px solid #e8739f" : "1.5px solid rgba(232,115,159,0.3)",
    background: selected ? "rgba(255,182,212,0.45)" : "rgba(255,255,255,0.5)",
    borderRadius: 14,
    padding: "9px 4px",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: selected ? 700 : 400,
    color: selected ? "#b5426a" : "#c97097",
    transition: "all 0.18s",
    fontFamily: "'Nunito', sans-serif",
    transform: selected ? "scale(1.03)" : "scale(1)",
  }),
  symptomsWrap: { display: "flex", flexWrap: "wrap", gap: 7 },
  symptomPill: (selected) => ({
    border: selected ? "2px solid #e8739f" : "1.5px solid rgba(232,115,159,0.3)",
    background: selected ? "rgba(255,182,212,0.5)" : "rgba(255,255,255,0.5)",
    borderRadius: 20,
    padding: "5px 13px",
    fontSize: 12,
    cursor: "pointer",
    color: selected ? "#b5426a" : "#c97097",
    fontWeight: selected ? 700 : 400,
    transition: "all 0.18s",
    fontFamily: "'Nunito', sans-serif",
  }),
  analyzeBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: 18,
    border: "none",
    background: "linear-gradient(135deg, #e8739f 0%, #d4508a 100%)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 18px rgba(212,80,138,0.3)",
    transition: "opacity 0.15s, transform 0.1s",
  },
  loadingCard: {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    border: "1.5px solid rgba(255,182,212,0.5)",
    padding: "2.5rem 1.25rem",
    textAlign: "center",
    color: "#c97097",
    fontSize: 14,
    boxShadow: "0 4px 24px rgba(181,66,106,0.07)",
  },
  resultCard: {
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    border: "1.5px solid rgba(255,182,212,0.5)",
    overflow: "hidden",
    marginBottom: "1rem",
    boxShadow: "0 4px 24px rgba(181,66,106,0.08)",
  },
  phaseHeader: {
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: 14,
    borderBottom: "1px solid rgba(255,182,212,0.35)",
  },
  phaseDot: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "rgba(255,182,212,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0,
    border: "1.5px solid rgba(232,115,159,0.3)",
  },
  phaseName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    color: "#b5426a",
    fontWeight: 700,
  },
  phaseSub: { fontSize: 12, color: "#c97097", marginTop: 2 },
  phaseBody: { padding: "1.25rem" },
  pcosNote: {
    background: "rgba(255,227,240,0.7)",
    borderRadius: 14,
    padding: "10px 14px",
    fontSize: 13,
    color: "#b5426a",
    marginBottom: "1rem",
    lineHeight: 1.6,
    border: "1px solid rgba(232,115,159,0.25)",
  },
  why: {
    fontSize: 13,
    color: "#c06090",
    lineHeight: 1.65,
    marginBottom: "1rem",
  },
  recoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 },
  recoBlock: {
    background: "rgba(255,227,240,0.45)",
    borderRadius: 16,
    padding: "12px 14px",
    border: "1px solid rgba(232,115,159,0.2)",
  },
  recoTitle: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#d4709a",
    marginBottom: 8,
  },
  recoItem: {
    fontSize: 12,
    color: "#b5426a",
    padding: "3px 0",
    borderBottom: "1px solid rgba(232,115,159,0.15)",
    lineHeight: 1.45,
  },
  resetBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: 18,
    border: "2px solid rgba(232,115,159,0.5)",
    background: "rgba(255,255,255,0.6)",
    color: "#d4709a",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    marginBottom: "1rem",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    color: "#d4a0b8",
    lineHeight: 1.6,
    marginTop: "0.5rem",
  },
  errorCard: {
    background: "rgba(255,255,255,0.72)",
    borderRadius: 20,
    border: "1.5px solid rgba(232,115,159,0.4)",
    padding: "1rem 1.25rem",
    color: "#b5426a",
    fontSize: 13,
    marginBottom: "1rem",
  },
};

export default function App() {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggleSymptom = (s) =>
    setSymptoms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const analyze = async () => {
    if (!mood || !energy) {
      setError("please pick a mood and energy level first 🌸");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    const prompt = `You are a warm, PCOS-aware cycle health assistant. The user logged:
- Mood: ${mood}
- Energy: ${energy}
- Symptoms: ${symptoms.length ? symptoms.join(", ") : "none"}

With PCOS, hormones are irregular — elevated androgens cause anger/irritability even in follicular phase. Anovulatory cycles are common.

Respond ONLY in raw JSON (no markdown, no backticks, no explanation outside the JSON):
{
  "phase": "estimated phase name (Follicular / Ovulatory / Luteal / Menstrual / Anovulatory — choose best fit)",
  "phase_emoji": "one emoji",
  "confidence": "low|medium|high",
  "pcos_context": "2 warm validating sentences explaining why this combo makes sense with PCOS — acknowledge their frustration",
  "why_you_feel_this": "2-3 sentences on the hormonal reason behind their specific mood and energy",
  "foods": ["5 specific foods that help today — e.g. pumpkin seeds, not just seeds"],
  "avoid": ["2-3 things to limit today"],
  "movement": ["3 movement suggestions matched to their energy level"],
  "self_care": ["2 self-care or mental health tips for today"]
}`;

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!resp.ok) throw new Error(`API error ${resp.status}`);
      const data = await resp.json();
      const text = (data.content || []).map((c) => c.text || "").join("");
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("no JSON in response");
      const r = JSON.parse(jsonMatch[0]);
      setResult(r);
    } catch (e) {
      setError("something went wrong — " + e.message + ". please try again 🌸");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMood(null); setEnergy(null); setSymptoms([]);
    setResult(null); setError(null);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Nunito:wght@400;700;800&display=swap" rel="stylesheet" />
      <div style={styles.app}>
        <div style={styles.inner}>
          <div style={styles.header}>
            <div style={styles.flowerRow}>🌸 🌷 🌸</div>
            <h1 style={styles.title}>how are you feeling, love?</h1>
            <p style={styles.subtitle}>PCOS-aware · mood-first cycle tracker · made just for you</p>
          </div>

          {!result && (
            <div style={styles.card}>
              <p style={styles.sectionLabel}>your mood right now</p>
              <div style={styles.moodGrid}>
                {MOODS.map((m) => (
                  <button key={m.id} style={styles.moodBtn(mood === m.id)} onClick={() => setMood(m.id)}>
                    <span style={styles.moodEmoji}>{m.emoji}</span>
                    <span style={styles.moodLabel}>{m.label}</span>
                  </button>
                ))}
              </div>

              <p style={{ ...styles.sectionLabel, marginTop: 18 }}>energy level</p>
              <div style={styles.energyRow}>
                {ENERGIES.map((e) => (
                  <button key={e.id} style={styles.energyBtn(energy === e.id)} onClick={() => setEnergy(e.id)}>
                    {e.label}
                  </button>
                ))}
              </div>

              <p style={{ ...styles.sectionLabel, marginTop: 18 }}>what's going on in your body?</p>
              <div style={styles.symptomsWrap}>
                {SYMPTOMS.map((s) => (
                  <button key={s} style={styles.symptomPill(symptoms.includes(s))} onClick={() => toggleSymptom(s)}>
                    {s}
                  </button>
                ))}
              </div>

              {error && <p style={{ color: "#b5426a", fontSize: 13, marginTop: 12, marginBottom: 0 }}>{error}</p>}

              <button
                style={{ ...styles.analyzeBtn, marginTop: 18 }}
                onClick={analyze}
                disabled={loading}
              >
                {loading ? "reading your body..." : "tell me what's happening 🌸"}
              </button>
            </div>
          )}

          {loading && (
            <div style={styles.loadingCard}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🌸</div>
              <p style={{ margin: 0, fontWeight: 700 }}>figuring out your body...</p>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#d4a0b8" }}>this usually takes a few seconds</p>
            </div>
          )}

          {result && !loading && (
            <>
              <div style={styles.resultCard}>
                <div style={styles.phaseHeader}>
                  <div style={styles.phaseDot}>{result.phase_emoji}</div>
                  <div>
                    <div style={styles.phaseName}>{result.phase} Phase</div>
                    <div style={styles.phaseSub}>
                      {result.confidence === "high" ? "strong match" : result.confidence === "medium" ? "likely" : "rough estimate"} · based on your signals
                    </div>
                  </div>
                </div>

                <div style={styles.phaseBody}>
                  <div style={styles.pcosNote}>🌷 {result.pcos_context}</div>
                  <p style={styles.why}>{result.why_you_feel_this}</p>

                  <div style={styles.recoGrid}>
                    <div style={styles.recoBlock}>
                      <div style={styles.recoTitle}>eat today 🍓</div>
                      {result.foods.map((f, i) => (
                        <div key={i} style={{ ...styles.recoItem, ...(i === result.foods.length - 1 ? { borderBottom: "none" } : {}) }}>· {f}</div>
                      ))}
                    </div>
                    <div style={styles.recoBlock}>
                      <div style={styles.recoTitle}>movement 🌿</div>
                      {result.movement.map((m, i) => (
                        <div key={i} style={{ ...styles.recoItem, ...(i === result.movement.length - 1 ? { borderBottom: "none" } : {}) }}>· {m}</div>
                      ))}
                    </div>
                  </div>

                  <div style={{ ...styles.recoGrid, marginTop: 10 }}>
                    <div style={styles.recoBlock}>
                      <div style={styles.recoTitle}>limit today 🚫</div>
                      {result.avoid.map((a, i) => (
                        <div key={i} style={{ ...styles.recoItem, ...(i === result.avoid.length - 1 ? { borderBottom: "none" } : {}) }}>· {a}</div>
                      ))}
                    </div>
                    <div style={styles.recoBlock}>
                      <div style={styles.recoTitle}>care for you 💗</div>
                      {result.self_care.map((s, i) => (
                        <div key={i} style={{ ...styles.recoItem, ...(i === result.self_care.length - 1 ? { borderBottom: "none" } : {}) }}>· {s}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button style={styles.resetBtn} onClick={reset}>← log again</button>
            </>
          )}

     
        </div>
      </div>
    </>
  );
}t
