import React, { useState } from "react";
import { Mail, Code2, BookOpen, Users } from "lucide-react";
import HomeLayout from "../../layouts/HomeLayout";
import Button from "../../components/ui/Button";

const SKILLS = [
    { label: "Laravel", color: "#ef4444" },
    { label: "React", color: "#38bdf8" },
    { label: "Spring Boot", color: "#10b981" },
    { label: "Docker", color: "#0284c7" },
    { label: "PostgreSQL", color: "#6366f1" },
    { label: "TypeScript", color: "#f59e0b" },
];

const STATS = [
    { Icon: BookOpen, value: "48+", label: "Articles publiés" },
    { Icon: Users, value: "12k+", label: "Lecteurs mensuels" },
    { Icon: Code2, value: "5 ans", label: "d'expérience" },
];
const AboutPage = () => {
    const [activeCategory, setActiveCategory] = useState("Tous");

    return (
        <HomeLayout
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        >
        {/* Hero auteur */}
        <div
        style={{
            background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
            border: "1px solid #bae6fd",
            borderRadius: "1.25rem",
            padding: "2rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
        }}
        >
        <div
            style={{
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #38bdf8, #0284c7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "white",
            fontFamily: "'Lora', serif",
            flexShrink: 0,
            }}
        >
            AB
        </div>
        <div style={{ flex: 1 }}>
            <h1
            style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#0c4a6e",
                marginBottom: ".35rem",
            }}
            >
            Admin Blog
            </h1>
            <p
            style={{
                fontSize: ".85rem",
                color: "#64748b",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.6,
            }}
            >
            Développeur passionné & rédacteur tech. Je partage mes découvertes
            sur le développement web moderne.
            </p>
        </div>
        </div>

        {/* Stats */}
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
        }}
        >
        {STATS.map((stat) => (
            <div
            key={stat.label}
            style={{
                background: "white",
                border: "1px solid #f1f5f9",
                borderRadius: "1rem",
                padding: "1.25rem",
                textAlign: "center",
            }}
            >
            <stat.Icon
                size={20}
                color="#0284c7"
                style={{ margin: "0 auto .5rem" }}
            />
            <p
                style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#0c4a6e",
                }}
            >
                {stat.value}
            </p>
            <p
                style={{
                fontSize: ".75rem",
                color: "#94a3b8",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
            >
                {stat.label}
            </p>
            </div>
        ))}
        </div>

        {/* À propos */}
        <div
        style={{
            background: "white",
            border: "1px solid #f1f5f9",
            borderRadius: "1rem",
            padding: "1.75rem",
            marginBottom: "1.5rem",
        }}
        >
        <h2
            style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#0c4a6e",
            marginBottom: "1rem",
            }}
        >
            À propos du blog
        </h2>
        <p
            style={{
            fontSize: ".9rem",
            color: "#64748b",
            lineHeight: 1.8,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: "1rem",
            }}
        >
            MonBlog est un espace dédié aux développeurs qui souhaitent
            approfondir leurs connaissances sur Laravel, React, Spring Boot,
            Docker et les bonnes pratiques du développement web moderne.
        </p>
        <p
            style={{
            fontSize: ".9rem",
            color: "#64748b",
            lineHeight: 1.8,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            Chaque article est rédigé avec soin pour être à la fois accessible aux
            débutants et utile aux développeurs confirmés.
        </p>
        </div>

        {/* Compétences */}
        <div
        style={{
            background: "white",
            border: "1px solid #f1f5f9",
            borderRadius: "1rem",
            padding: "1.75rem",
            marginBottom: "1.5rem",
        }}
        >
        <h2
            style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#0c4a6e",
            marginBottom: "1rem",
            }}
        >
            Technologies couvertes
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
            {SKILLS.map(({ label, color }) => (
            <span
                key={label}
                style={{
                padding: ".35rem .9rem",
                borderRadius: "2rem",
                fontSize: ".8rem",
                fontWeight: 600,
                color,
                background: `${color}15`,
                border: `1.5px solid ${color}30`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
            >
                {label}
            </span>
            ))}
        </div>
        </div>

        {/* Contact */}
        <div
        style={{
            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
            borderRadius: "1rem",
            padding: "1.75rem",
            textAlign: "center",
        }}
        >
        <h2
            style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "white",
            marginBottom: ".5rem",
            }}
        >
            Une question ? Un sujet à traiter ?
        </h2>
        <p
            style={{
            fontSize: ".85rem",
            color: "rgba(255,255,255,.8)",
            marginBottom: "1.25rem",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            N'hésitez pas à me contacter.
        </p>
        <Button
            variant="secondary"
            size="sm"
            style={{
            background: "rgba(255,255,255,.2)",
            color: "white",
            border: "1.5px solid rgba(255,255,255,.4)",
            display: "inline-flex",
            gap: ".5rem",
            }}
        >
            <Mail size={15} />
            contact@monblog.com
        </Button>
        </div>
    </HomeLayout>
    );
};

export default AboutPage;
