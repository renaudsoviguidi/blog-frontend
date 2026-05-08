import React from "react";
import { Trash2 } from "lucide-react";

const DeleteModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="pl-modal-overlay" onClick={onCancel}>
            <div className="pl-modal" onClick={e => e.stopPropagation()}>
                <div className="pl-modal-icon">
                    <Trash2 size={22} color="#dc2626" />
                </div>
                <div className="pl-modal-title">Supprimer l'article ?</div>
                <div className="pl-modal-sub">
                    Cette action est irréversible. L'article sera définitivement supprimé.
                </div>
                <div className="pl-modal-btns">
                    <button className="pl-modal-cancel" onClick={onCancel}>
                        Annuler
                    </button>
                    <button className="pl-modal-confirm" onClick={onConfirm}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;