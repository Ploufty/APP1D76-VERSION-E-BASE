/* Apps1D76 — script commun des outils (UI de référence, à charger dans le <head>) :
     <script src="../../accueil/outil.js"></script>
   1. Réglages d'affichage partagés avec l'accueil (thème, contraste, taille du texte, animations), appliqués avant l'affichage
   2. Bouton de thème (#theme-toggle), panneau « Affichage » ajouté à côté, étapes repliables (.step-header)
   3. Outils pour la page : Outil.esc (échappement), Outil.telecharger, Outil.word (export .docx sans dépendance) */
(() => {
  'use strict';
  const d = document, root = d.documentElement;

  /* ================= 1. RÉGLAGES D'AFFICHAGE (même stockage et mêmes valeurs que l'accueil) ================= */
  const KEY = 'apps1d-prefs', DEF = { theme: 'auto', text: '100', motion: 'auto', contrast: false };
  const VALEURS = { theme: ['auto', 'light', 'dark'], text: ['100', '115', '130'], motion: ['auto', 'on', 'reduce'] };
  const nettoyer = p => ({ // on ne garde que des valeurs connues (stockage local modifiable par l'utilisateur)
    theme: VALEURS.theme.includes(p?.theme) ? p.theme : DEF.theme,
    text: VALEURS.text.includes(String(p?.text)) ? String(p.text) : DEF.text,
    motion: VALEURS.motion.includes(p?.motion) ? p.motion : DEF.motion,
    contrast: p?.contrast === true
  });
  let prefs;
  try { prefs = nettoyer(JSON.parse(localStorage.getItem(KEY))); } catch { prefs = { ...DEF }; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch { /* navigation privée */ } };
  const mq = q => window.matchMedia ? matchMedia(q) : { matches: false };
  const darkMq = mq('(prefers-color-scheme: dark)'), motionMq = mq('(prefers-reduced-motion: reduce)');

  function appliquer() {
    const dark = prefs.theme === 'dark' || (prefs.theme === 'auto' && darkMq.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.motion = prefs.motion === 'reduce' || (prefs.motion === 'auto' && motionMq.matches) ? 'reduce' : 'full';
    root.dataset.contrast = prefs.contrast ? 'high' : 'normal';
    root.style.setProperty('--text-scale', prefs.text / 100);
    d.getElementById('theme-toggle')?.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
    const meta = d.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#11111b' : '#000091';
  }
  appliquer();
  darkMq.addEventListener?.('change', () => prefs.theme === 'auto' && appliquer());
  motionMq.addEventListener?.('change', () => prefs.motion === 'auto' && appliquer());

  /* ================= 2. BOUTON DE THÈME, PANNEAU « AFFICHAGE » ET ÉTAPES ================= */
  // Le panneau est ajouté automatiquement à côté du bouton de thème (.outil-header .actions) : rien à écrire dans la page
  const choix = (nom, titre, options) => `<fieldset><legend>${titre}</legend><div class="seg">${options.map(([v, t, c]) =>
    `<label><input type="radio" name="${nom}" value="${v}"><span${c ? ` class="${c}"` : ''}>${t}</span></label>`).join('')}</div></fieldset>`;
  const PANNEAU = `<form method="dialog" class="settings">
    <div class="settings-head">
      <h2 id="settings-title">Paramètres d'affichage</h2>
      <button type="submit" class="icon-btn" value="close" aria-label="Fermer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    </div>
    ${choix('theme', 'Thème', [['light', 'Clair'], ['dark', 'Sombre'], ['auto', 'Système']])}
    ${choix('text', 'Taille du texte', [['100', 'Normale'], ['115', 'Grande', 't115'], ['130', 'Très grande', 't130']])}
    ${choix('motion', 'Animations', [['on', 'Activées'], ['reduce', 'Réduites'], ['auto', 'Système']])}
    <label class="switch"><input type="checkbox" name="contrast"><span>Contraste renforcé</span></label>
    <div class="settings-foot">
      <button type="button" class="btn btn-ghost" data-reset>Réinitialiser</button>
      <button type="submit" class="btn" value="close">Fermer</button>
    </div>
  </form>`;
  const ENGRENAGE = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';

  d.addEventListener('DOMContentLoaded', () => {
    appliquer();
    d.getElementById('theme-toggle')?.addEventListener('click', () => {
      prefs.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      save(); appliquer();
    });

    const actions = d.querySelector('.outil-header .actions');
    if (!actions || !window.HTMLDialogElement) return;
    const ouvrir = d.createElement('button');
    ouvrir.type = 'button'; ouvrir.className = 'icon-btn btn-affichage'; ouvrir.setAttribute('aria-haspopup', 'dialog');
    ouvrir.innerHTML = ENGRENAGE + '<span class="btn-label">Affichage</span>';
    actions.append(ouvrir);
    const dlg = d.createElement('dialog');
    dlg.id = 'settings'; dlg.setAttribute('aria-labelledby', 'settings-title'); dlg.innerHTML = PANNEAU;
    d.body.append(dlg);
    const form = dlg.querySelector('form');
    const synchro = () => {
      ['theme', 'text', 'motion'].forEach(n => { const r = form.querySelector(`[name="${n}"][value="${prefs[n]}"]`); if (r) r.checked = true; });
      form.contrast.checked = prefs.contrast;
    };
    ouvrir.addEventListener('click', () => { synchro(); dlg.showModal(); });
    form.addEventListener('change', e => {
      const t = e.target;
      prefs = nettoyer({ ...prefs, [t.name]: t.type === 'checkbox' ? t.checked : t.value });
      save(); appliquer();
    });
    form.querySelector('[data-reset]').addEventListener('click', () => { prefs = { ...DEF }; save(); appliquer(); synchro(); });
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // clic sur le fond = fermer
  });
  // Étape repliable : <button class="step-header" aria-expanded="true|false"> suivi de son .step-body
  d.addEventListener('click', e => {
    const h = e.target.closest?.('.step-header');
    if (h) h.setAttribute('aria-expanded', h.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });

  /* ================= 3. OUTILS POUR LA PAGE ================= */
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function telecharger(blob, nom) {
    const a = d.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = nom;
    d.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // Archive .zip sans compression (suffisant pour un .docx)
  function zip(fichiers) {
    const T = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) n = n & 1 ? 0xEDB88320 ^ (n >>> 1) : n >>> 1; return n >>> 0; });
    const crc = o => { let c = -1; for (const b of o) c = T[(c ^ b) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
    const u16 = v => [v & 255, (v >>> 8) & 255], u32 = v => [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255];
    const enc = new TextEncoder(), locaux = [], central = [];
    let pos = 0;
    for (const [nom, texte] of fichiers) {
      const n = enc.encode(nom), o = enc.encode(texte);
      const commun = [...u16(0x0800), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc(o)), ...u32(o.length), ...u32(o.length), ...u16(n.length), ...u16(0)];
      const entete = new Uint8Array([...u32(0x04034b50), ...u16(20), ...commun]);
      locaux.push(entete, n, o);
      central.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...commun, ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(pos)]), n);
      pos += entete.length + n.length + o.length;
    }
    const taille = central.reduce((s, b) => s + b.length, 0);
    const fin = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(fichiers.length), ...u16(fichiers.length), ...u32(taille), ...u32(pos), ...u16(0)]);
    return new Blob([...locaux, ...central, fin], { type: 'application/zip' });
  }

  /* Document Word (.docx) à partir de blocs :
       { titre: 'Texte' }                 grand titre bleu
       { texte: 'Texte', discret: true }   paragraphe (gris et petit si discret)
       { tableau: { entetes: ['A', 'B'], lignes: [[cellule, cellule]], largeurs: [1, 3] } }
     Une cellule est un texte ('\n' = retour à la ligne), un morceau { texte, gras, couleur, fond, taille },
     ou une liste de morceaux affichés à la suite. Couleurs en hexadécimal ('#1D4ED8').
     Options : { paysage: true }. Exemple : Outil.word('planning.docx', [{ titre: 'Planning' }], { paysage: true }) */
  function word(nom, blocs, { paysage = false } = {}) {
    const x = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const hex = c => String(c).replace('#', '').toUpperCase();
    const run = m => {
      m = typeof m === 'object' ? m : { texte: m };
      return `<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>${m.gras ? '<w:b/>' : ''}`
        + `${m.couleur ? `<w:color w:val="${hex(m.couleur)}"/>` : ''}<w:sz w:val="${(m.taille || 10) * 2}"/>`
        + `${m.fond ? `<w:shd w:val="clear" w:color="auto" w:fill="${hex(m.fond)}"/>` : ''}</w:rPr>`
        + `<w:t xml:space="preserve">${x(m.texte)}</w:t></w:r>`;
    };
    const para = (morceaux, apres = 0) => `<w:p><w:pPr><w:spacing w:before="0" w:after="${apres}"/></w:pPr>${morceaux.map(run).join(run(' '))}</w:p>`;
    const cellule = c => typeof c === 'string' ? c.split('\n').map(l => para([l])).join('')
      : para(Array.isArray(c) ? c : [c]);
    const [W, H] = paysage ? [16838, 11906] : [11906, 16838], marge = 850, utile = W - 2 * marge;
    const bord = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(b => `<w:${b} w:val="single" w:sz="4" w:space="0" w:color="C8C8D8"/>`).join('');

    const tableau = ({ entetes, lignes, largeurs }) => {
      const poids = largeurs || entetes.map(() => 1), total = poids.reduce((a, b) => a + b, 0);
      const w = poids.map(p => Math.floor(utile * p / total));
      const tc = (contenu, i, fond) => `<w:tc><w:tcPr><w:tcW w:w="${w[i]}" w:type="dxa"/>${fond ? `<w:shd w:val="clear" w:color="auto" w:fill="${fond}"/>` : ''}<w:vAlign w:val="center"/></w:tcPr>${contenu}</w:tc>`;
      return `<w:tbl><w:tblPr><w:tblW w:w="${utile}" w:type="dxa"/><w:tblBorders>${bord}</w:tblBorders>`
        + `<w:tblCellMar><w:top w:w="70" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="70" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr>`
        + `<w:tblGrid>${w.map(v => `<w:gridCol w:w="${v}"/>`).join('')}</w:tblGrid>`
        + `<w:tr><w:trPr><w:tblHeader/></w:trPr>${entetes.map((e, i) => tc(para([{ texte: e, gras: true, couleur: 'FFFFFF' }]), i, '000091')).join('')}</w:tr>`
        + lignes.map((l, r) => `<w:tr><w:trPr><w:cantSplit/></w:trPr>${l.map((c, i) => tc(cellule(c), i, r % 2 ? 'F6F6FB' : '')).join('')}</w:tr>`).join('')
        + `</w:tbl><w:p/>`;
    };

    const corps = blocs.map(b => b.titre != null ? para([{ texte: b.titre, gras: true, taille: 20, couleur: '000091' }], 60)
      : b.tableau ? tableau(b.tableau)
      : para([b.discret ? { texte: b.texte, couleur: '555566', taille: 9 } : { texte: b.texte }], 200)).join('');

    const docx = zip([
      ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'],
      ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
      ['word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${corps}`
        + `<w:sectPr><w:pgSz w:w="${W}" w:h="${H}"${paysage ? ' w:orient="landscape"' : ''}/><w:pgMar w:top="${marge}" w:right="${marge}" w:bottom="${marge}" w:left="${marge}" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`]
    ]);
    telecharger(new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), nom);
  }

  window.Outil = { esc, telecharger, word };
})();
