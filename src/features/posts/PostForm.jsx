import React, { useState } from "react";
import { X } from "lucide-react";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import CoverUpload from "../../components/shared/CoverUpload";

    const labelStyle = {
    display: "block",
    fontSize: ".8rem",
    fontWeight: 600,
    color: "#475569",
    marginBottom: ".4rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    };

    // ── Sous-composant : sélecteur multiple avec chips ───────
    const ChipSelector = ({ label, selected, options, onAdd, onRemove, chipColor, badgeBg }) => {
        const [search, setSearch] = useState('');
        const [open,   setOpen]   = useState(false);

        const filtered = options
            .filter(o => !selected.find(s => (s.ref ?? s.id) === (o.ref ?? o.id)))
            .filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

        const handleAdd = (item) => {
            onAdd(item);
            setSearch('');
        };

        const handleBlur = () => {
            // Délai pour laisser le clic sur un item se déclencher avant fermeture
            setTimeout(() => setOpen(false), 150);
        };

        return (
            <div style={{ position: 'relative' }}>
                <label style={labelStyle}>{label}</label>

                {/* Zone chips + input recherche */}
                <div style={{
                    border: `1.5px solid ${open ? '#38bdf8' : '#e2e8f0'}`,
                    borderRadius: '.75rem',
                    padding: '.5rem .75rem',
                    background: '#f8fafc',
                    minHeight: '2.75rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '.4rem',
                    alignItems: 'center',
                    transition: 'border-color .2s',
                    cursor: 'text',
                }}
                    onClick={() => { setOpen(true); }}
                >
                    {/* Chips sélectionnés */}
                    {selected.map(item => (
                        <span key={item.ref ?? item.id} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.3rem',
                            background: badgeBg,
                            color: chipColor,
                            padding: '.2rem .65rem .2rem .75rem',
                            borderRadius: '1rem',
                            fontSize: '.78rem',
                            fontWeight: 600,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            flexShrink: 0,
                        }}>
                            {item.name}
                            <button
                                onMouseDown={e => e.preventDefault()} /// - évite blur avant onRemove
                                onClick={e => { e.stopPropagation(); onRemove(item); }}
                                style={{
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', color: chipColor,
                                    padding: 0, display: 'flex',
                                    alignItems: 'center', opacity: .7,
                                }}
                            >
                                <X size={12} />
                            </button>
                        </span>
                    ))}

                    {/* Input recherche */}
                    <input
                        value={search}
                        onChange={e => { setSearch(e.target.value); setOpen(true); }}
                        onFocus={() => setOpen(true)}
                        onBlur={handleBlur}
                        placeholder={selected.length === 0 ? `Rechercher ${label.toLowerCase()}…` : ''}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            fontSize: '.82rem',
                            color: '#1e293b',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            flex: 1,
                            minWidth: 100,
                        }}
                    />
                </div>

                {/* Dropdown des résultats */}
                {open && (
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + .35rem)',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '.75rem',
                        boxShadow: '0 8px 24px rgba(0,0,0,.1)',
                        zIndex: 100,
                        maxHeight: 220,
                        overflowY: 'auto',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        {filtered.length === 0 ? (
                            <div style={{
                                padding:  '1rem',
                                fontSize: '.82rem',
                                color:    '#94a3b8',
                                textAlign: 'center',
                            }}>
                                {search
                                    ? `Aucun résultat pour "${search}"`
                                    : 'Tous les éléments sont sélectionnés'
                                }
                            </div>
                        ) : (
                            filtered.map(item => (
                                <div
                                    key={item.ref ?? item.id}
                                    onMouseDown={e => e.preventDefault()} // évite blur avant onClick
                                    onClick={() => handleAdd(item)}
                                    style={{
                                        padding: '.65rem 1rem',
                                        fontSize: '.85rem',
                                        color: '#1e293b',
                                        cursor: 'pointer',
                                        transition: 'background .15s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '.6rem',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f0f7ff'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {/* Pastille couleur */}
                                    <span style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: chipColor,
                                        flexShrink: 0,
                                    }} />
                                    {item.name}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        );
    };

    // ── PostForm ──────────────────────────────────────────────
    const PostForm = ({ formData, onChange, categories = [], tags = [] }) => {
    const set = (key, value) => onChange({ ...formData, [key]: value });

    const handleCoverFile = (file) =>
    onChange({
        ...formData,
        cover_image: file,
        cover_preview: URL.createObjectURL(file),
    });

    const addCategory = (cat) =>
    set("category_ids", [...(formData.category_ids ?? []), cat]);
    const removeCategory = (cat) =>
    set(
        "category_ids",
        (formData.category_ids ?? []).filter((c) => c.ref !== cat.ref),
    );
    const addTag = (tag) => set("tag_ids", [...(formData.tag_ids ?? []), tag]);
    const removeTag = (tag) =>
    set(
        "tag_ids",
        (formData.tag_ids ?? []).filter((t) => t.ref !== tag.ref),
    );

    return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {/* Titre — utilise Input de ui/ */}
        <Input
        label="Titre"
        value={formData.title ?? ""}
        onChange={(e) => set("title", e.target.value)}
        placeholder="Titre de l'article…"
        required
        />

        {/* Extrait — textarea */}
        <TextArea
        label="Extrait"
        value={formData.excerpt ?? ""}
        onChange={(e) => set("excerpt", e.target.value)}
        placeholder="Courte description de l'article…"
        rows={2}
        />

        {/* Contenu */}
        <TextArea
        label="Contenu"
        value={formData.content ?? ""}
        onChange={(e) => set("content", e.target.value)}
        placeholder="Corps de l'article…"
        rows={8}
        required
        />

        {/* Catégories + Tags */}
        <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
        >
        <ChipSelector
            label="Catégories"
            selected={formData.category_ids ?? []}
            options={categories}
            onAdd={addCategory}
            onRemove={removeCategory}
            chipColor="#0284c7"
            badgeBg="#e0f2fe"
        />
        <ChipSelector
            label="Tags"
            selected={formData.tag_ids ?? []}
            options={tags}
            onAdd={addTag}
            onRemove={removeTag}
            chipColor="#059669"
            badgeBg="#d1fae5"
        />
        </div>

        {/* Cover image */}
        <CoverUpload
        preview={formData.cover_preview}
        onFile={handleCoverFile}
        onClear={() =>
            onChange({ ...formData, cover_image: null, cover_preview: null })
        }
        />
    </div>
    );
    };

    export default PostForm;
