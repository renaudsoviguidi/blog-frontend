import { Newspaper, FileCheck, FileClock, TrendingUp } from "lucide-react";

const PostsStats = ({ stats }) => (
    <div className="pl-stats">
        {[
            { icon: <Newspaper size={20} color="#0284c7"/>, bg:"#e0f2fe", val: stats.total,     lbl:"Total articles" },
            { icon: <FileCheck  size={20} color="#16a34a"/>, bg:"#dcfce7", val: stats.published, lbl:"Publiés" },
            { icon: <FileClock  size={20} color="#ca8a04"/>, bg:"#fef9c3", val: stats.draft,     lbl:"Brouillons" },
            { icon: <TrendingUp size={20} color="#7c3aed"/>, bg:"#ede9fe",
            val: stats.views.toLocaleString("fr-FR"), lbl:"Vues totales" },
        ].map((s, i) => (
            <div className="pl-stat" key={i}>
                <div className="pl-stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                <div>
                    <div className="pl-stat-val">{s.val}</div>
                    <div className="pl-stat-lbl">{s.lbl}</div>
                </div>
            </div>
        ))}
    </div>
);

export default PostsStats;