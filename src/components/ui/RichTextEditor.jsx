import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';

/// ─ Icônes SVG inline
const Icon = ({ d, size = 14, viewBox = "0 0 24 24" }) => (
    <svg width={size} height={size} viewBox={viewBox} fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {Array.isArray(d)
            ? d.map((path, i) => <path key={i} d={path} />)
            : <path d={d} />
        }
    </svg>
);

const ICONS = {
    bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
    italic: "M19 4h-9M14 20H5M15 4L9 20",
    underline: ["M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3", "M4 21h16"],
    strike: ["M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.1 2.4 3.1 2.9l4.1 1", "M11.9 12.3c2.4.6 4.1 1.6 4.1 3.7 0 2.9-2.7 3.8-6.4 3.8-2.4 0-4.5-.6-6.2-1.2", "M4 12h16"],
    h1: ["M4 12h8", "M4 6v12", "M12 6v12", "M21 18h-4a2 2 0 0 1 0-4h2a2 2 0 0 0 0-4h-4"],
    h2: ["M4 12h8", "M4 6v12", "M12 6v12", "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2-4-1"],
    h3: ["M4 12h8", "M4 6v12", "M12 6v12", "M17 10h3", "M20 14h-2a2 2 0 0 0 0 4h2"],
    quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
    ul: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    ol: ["M10 6h11", "M10 12h11", "M10 18h11", "M4 6h1v4", "M4 10H6", "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"],
    alignLeft: ["M3 6h18", "M3 12h12", "M3 18h15"],
    alignCenter: ["M3 6h18", "M7 12h10", "M4 18h16"],
    alignRight: ["M3 6h18", "M9 12h12", "M6 18h15"],
    alignJust: ["M3 6h18", "M3 12h18", "M3 18h18"],
    highlight: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
    unlink: ["M18.84 12.25l1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71", "M5.17 11.75l-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71", "M8 2v4", "M2 8h4", "M16 22v-4", "M22 16h-4"],
    undo: "M3 7v6h6 M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
    redo: "M21 7v6h-6 M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13",
    hr: "M3 12h18",
    code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
};

/// ─ Bouton toolbar
const ToolBtn = ({ onClick, active, title, children, disabled }) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        disabled={disabled}
        title={title}
        style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            borderRadius: '0.4rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            background: active ? '#e0f2fe' : 'transparent',
            color: active ? '#0284c7' : '#475569',
            transition: 'background .15s, color .15s',
            flexShrink: 0,
        }}
        onMouseEnter={(e) => { if (!active && !disabled) e.currentTarget.style.background = '#f1f5f9'; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
        {children}
    </button>
);

/// ─ Séparateur toolbar
const Sep = () => (
    <div style={{ width: 1, height: '1.25rem', background: '#e2e8f0', margin: '0 .2rem', flexShrink: 0 }} />
);

/// ─ RichTextEditor
const RichTextEditor = ({ value, onChange, placeholder = "Corps de l'article…" }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                codeBlock: false, // on garde code inline seulement
            }),
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder }),
            Highlight.configure({ multicolor: false }),
            Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
            TextStyle,
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    /// - Sync valeur externe (ex: reset form)
    useEffect(() => {
        if (!editor) return;
        if (value === '' && editor.getHTML() !== '<p></p>') {
            editor.commands.clearContent();
        }
    }, [value, editor]);

    if (!editor) return null;

    const addLink = () => {
        const prev = editor.getAttributes('link').href || '';
        const url  = window.prompt('URL du lien :', prev);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().unsetLink().run();
        } else {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div>
            <label style={{
                display: 'block',
                fontSize: '.8rem',
                fontWeight: 600,
                color: '#475569',
                marginBottom: '.4rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                Contenu <span style={{ color: '#ef4444' }}>*</span>
            </label>

            {/* Wrapper éditeur */}
            <div style={{
                border: '1.5px solid #e2e8f0',
                borderRadius: '.75rem',
                overflow: 'hidden',
                background: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'border-color .2s',
            }}
                onFocusCapture={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
                onBlurCapture={(e)  => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
                {/* ── Toolbar ── */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '.15rem',
                    padding: '.5rem .65rem',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    alignItems: 'center',
                }}>
                    {/* Formatage texte */}
                    <ToolBtn title="Gras (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                        <Icon d={ICONS.bold} />
                    </ToolBtn>
                    <ToolBtn title="Italique (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
                        <Icon d={ICONS.italic} />
                    </ToolBtn>
                    <ToolBtn title="Souligné (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
                        <Icon d={ICONS.underline} />
                    </ToolBtn>
                    <ToolBtn title="Barré" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
                        <Icon d={ICONS.strike} />
                    </ToolBtn>
                    <ToolBtn title="Code inline" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')}>
                        <Icon d={ICONS.code} />
                    </ToolBtn>
                    <ToolBtn title="Surligner" onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')}>
                        <Icon d={ICONS.highlight} />
                    </ToolBtn>

                    <Sep />

                    {/* Titres */}
                    <ToolBtn title="Titre 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
                        <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '-.5px' }}>H1</span>
                    </ToolBtn>
                    <ToolBtn title="Titre 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
                        <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '-.5px' }}>H2</span>
                    </ToolBtn>
                    <ToolBtn title="Titre 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
                        <span style={{ fontSize: '.7rem', fontWeight: 800, letterSpacing: '-.5px' }}>H3</span>
                    </ToolBtn>

                    <Sep />

                    {/* Listes */}
                    <ToolBtn title="Liste à puces" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
                        <Icon d={ICONS.ul} />
                    </ToolBtn>
                    <ToolBtn title="Liste numérotée" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
                        <Icon d={ICONS.ol} />
                    </ToolBtn>
                    <ToolBtn title="Citation" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
                        <Icon d={ICONS.quote} />
                    </ToolBtn>
                    <ToolBtn title="Séparateur horizontal" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <Icon d={ICONS.hr} />
                    </ToolBtn>

                    <Sep />

                    {/* Alignement */}
                    <ToolBtn title="Aligner à gauche" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
                        <Icon d={ICONS.alignLeft} />
                    </ToolBtn>
                    <ToolBtn title="Centrer" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
                        <Icon d={ICONS.alignCenter} />
                    </ToolBtn>
                    <ToolBtn title="Aligner à droite" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
                        <Icon d={ICONS.alignRight} />
                    </ToolBtn>
                    <ToolBtn title="Justifier" onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })}>
                        <Icon d={ICONS.alignJust} />
                    </ToolBtn>

                    <Sep />

                    {/* Lien */}
                    <ToolBtn title="Insérer un lien" onClick={addLink} active={editor.isActive('link')}>
                        <Icon d={ICONS.link} />
                    </ToolBtn>
                    <ToolBtn title="Supprimer le lien" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
                        <Icon d={ICONS.unlink} />
                    </ToolBtn>

                    <Sep />

                    {/* Historique */}
                    <ToolBtn title="Annuler (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
                        <Icon d={ICONS.undo} />
                    </ToolBtn>
                    <ToolBtn title="Rétablir (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
                        <Icon d={ICONS.redo} />
                    </ToolBtn>
                </div>

                {/* ── Zone d'édition ── */}
                <EditorContent
                    editor={editor}
                    style={{ minHeight: '260px' }}
                />
            </div>

            {/* Styles CSS injectés */}
            <style>{`
                .tiptap {
                    padding: 1rem 1.1rem;
                    min-height: 260px;
                    outline: none;
                    font-size: .9rem;
                    line-height: 1.7;
                    color: #1e293b;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .tiptap p { margin: 0 0 .75em; }
                .tiptap p:last-child { margin-bottom: 0; }
                .tiptap h1 { font-size: 1.6rem; font-weight: 800; margin: 1.2em 0 .5em; color: #0f172a; }
                .tiptap h2 { font-size: 1.3rem; font-weight: 700; margin: 1em 0 .45em; color: #0f172a; }
                .tiptap h3 { font-size: 1.1rem; font-weight: 700; margin: .9em 0 .4em; color: #0f172a; }
                .tiptap strong { font-weight: 700; color: #0f172a; }
                .tiptap em { font-style: italic; }
                .tiptap u  { text-decoration: underline; }
                .tiptap s  { text-decoration: line-through; color: #94a3b8; }
                .tiptap code {
                    background: #f1f5f9;
                    color: #0284c7;
                    padding: .1em .4em;
                    border-radius: .35rem;
                    font-family: 'Fira Code', 'Courier New', monospace;
                    font-size: .85em;
                }
                .tiptap mark { background: #fef08a; border-radius: .2rem; padding: .05em .2em; }
                .tiptap blockquote {
                    border-left: 3px solid #38bdf8;
                    padding-left: 1rem;
                    margin: .75em 0;
                    color: #64748b;
                    font-style: italic;
                }
                .tiptap hr {
                    border: none;
                    border-top: 2px solid #e2e8f0;
                    margin: 1.25em 0;
                }
                .tiptap ul { list-style: disc; padding-left: 1.5rem; margin: .5em 0; }
                .tiptap ol { list-style: decimal; padding-left: 1.5rem; margin: .5em 0; }
                .tiptap li { margin: .2em 0; }
                .tiptap a  { color: #0284c7; text-decoration: underline; cursor: pointer; }
                .tiptap a:hover { color: #0369a1; }
                .tiptap .is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #94a3b8;
                    pointer-events: none;
                    height: 0;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;