import React, { useState, useEffect, useCallback } from "react";
import { Newspaper, CheckCircle, FileText } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import postService from "../../services/postService";
import categoryService from "../../services/categoryService";
import tagService from "../../services/tagService";
import usePaginatedList from "../../hooks/usePaginatedList";
import useModal from "../../hooks/useModal";
import useToast from "../../hooks/useToast";
import useConfirm from "../../hooks/useConfirm";

import Toast from "../../components/shared/Toast";
import Modal from "../../components/shared/Modal";
import ConfirmModal from "../../components/shared/ConfirmModal";
import Pagination from "../../components/shared/Pagination";
import EmptyState from "../../components/shared/EmptyState";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatCards } from "../../components/shared/StatCards";
import { TableCard } from "../../components/shared/TableCard";

import PostList from "./PostList";
import PostForm from "./PostForm";
import PostFilters from "./PostFilters";
import PostPreviewModal from "../../components/shared/PostPreviewModal";
import RejectReasonModal from "../../components/shared/RejectReasonModal";

// ── Constantes ────────────────────────────────────────────
const EMPTY_FORM = {
    title: "",
    excerpt: "",
    content: "",
    cover_image: null,
    cover_preview: null,
    category_ids: [],
    tag_ids: [],
};

const buildStats = (meta, items) => [
    {
        label: "Total posts",
        value: meta?.total ?? 0,
        Icon: Newspaper,
        color: "#0ea5e9",
        bg: "#e0f2fe",
    },
    {
        label: "Publiés",
        value: items.filter((p) => p.status === "published").length,
        Icon: CheckCircle,
        color: "#10b981",
        bg: "#d1fae5",
    },
    {
        label: "Brouillons",
        value: items.filter((p) => p.status === "draft").length,
        Icon: FileText,
        color: "#f59e0b",
        bg: "#fef3c7",
    },
];

const buildMultipartForm = (data) => {
    const fd = new FormData();
    if (data.title) fd.append("title", data.title);
    if (data.content) fd.append("content", data.content);
    if (data.excerpt) fd.append("excerpt", data.excerpt);
    if (data.cover_image instanceof File)
    fd.append("cover_image", data.cover_image);
    (data.category_ids ?? []).forEach((c) => fd.append("category_ids[]", c.id ?? c.ref),);
    (data.tag_ids ?? []).forEach((t) => fd.append("tag_ids[]", t.id ?? t.ref));
    return fd;
};

/// ─ Page
const PostsPage = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const list = usePaginatedList(
        (p) => postService.getAll(p, { search, status }),
        [search, status],
    );

    const modal = useModal();
    const { toasts, toast, removeToast } = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [previewPost, setPreviewPost] = useState(null);
    const [previewOpen, setPreviewOpen]  = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [rejecting, setRejecting] = useState(false);

    // Charger catégories et tags une seule fois
        useEffect(() => {
            categoryService.getAll().then((r) => setCategories(r.data?.data ?? [])).catch(() => {});
            tagService.getAll().then((r) => setTags(r.data?.data ?? [])).catch(() => {});
        }, []);

    // ── Handlers ──────────────────────────────────────────
    const handleOpenCreate = useCallback(() => {
        setFormData(EMPTY_FORM);
        modal.openCreate();
    }, [modal]);

    const handleOpenEdit = useCallback(async (post) => {
        try {
            // Appeler show pour récupérer le content complet
            const response = await postService.getForEdit(post.ref);
            const fullPost = response.data.data;

            setFormData({
                title: fullPost.title,
                excerpt: fullPost.excerpt ?? '',
                content: fullPost.content ?? '',
                cover_image: null,
                cover_preview: fullPost.cover_image ?? null,
                category_ids: fullPost.categories ?? [],
                tag_ids: fullPost.tags ?? [],
            });
            modal.openEdit(fullPost);
        } catch (e) {
            toast.error('Impossible de charger le post.', e);
        }
    }, [modal]);

  const handleSubmit = async () => {
    if (!formData.title?.trim() || !formData.content?.trim()) {
      toast.error("Le titre et le contenu sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const fd = buildMultipartForm(formData);
      if (modal.editing) {
        await postService.update(modal.editing.ref, fd);
        toast.success("Post mis à jour avec succès");
      } else {
        await postService.create(fd);
        toast.success("Post créé avec succès");
      }
      modal.close();
      list.reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (post) => {
    confirm({
      title: "Supprimer le post",
      description: `Vous êtes sur le point de supprimer "${post.title}". Cette action est irréversible.`,
      onConfirm: async () => {
        await postService.delete(post.ref);
        toast.success("Post supprimé avec succès");
        list.reload();
      },
    });
  };

  /// ─ Ouvrir la preview
  const handleOpenPreview = async (post) => {
        try {
            const response = await postService.getForEdit(post.ref);
            setPreviewPost(response.data.data);
            setPreviewOpen(true);
        } catch (e) {
            toast.error('Impossible de charger le post.', e);
        }
    };

    /// ─ Publier depuis la preview
    const handlePublishFromPreview = async () => {
        if (!previewPost) return;
        setPublishing(true);
        try {
            await postService.publish(previewPost.ref);
            toast.success(`"${previewPost.title}" publié avec succès`);
            setPreviewOpen(false);
            setPreviewPost(null);
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setPublishing(false);
        }
    };

    /// ─ Ouvrir le modal de motif de rejet
    const handleOpenReject = () => {
        setPreviewOpen(false); // fermer preview
        setRejectOpen(true);   // ouvrir saisie motif
    };

    /// ─ Confirmer le rejet avec motif
    const handleConfirmReject = async (reason) => {
        if (!previewPost) return;
        setRejecting(true);
        try {
            await postService.reject(previewPost.ref, reason);
            toast.success(`"${previewPost.title}" rejeté`);
            setRejectOpen(false);
            setPreviewPost(null);
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setRejecting(false);
        }
    };

    /// - handlePublish et handleReject directs (depuis liste) restent pour rétrocompatibilité
    const handlePublish = async (post) => {
        try {
            await postService.publish(post.ref);
            toast.success(`"${post.title}" publié avec succès`);
            list.reload();
        } catch (e) { toast.error(e.message); }
    };

    const handleReject = async (post) => {
        // Charger le post complet puis ouvrir la preview → rejet
        await handleOpenPreview(post);
    };

  return (
    <AdminLayout>
      <PageHeader
        title="Posts"
        count={list.meta?.total}
        actionLabel="Nouveau post"
        onAction={handleOpenCreate}
      />

      <StatCards stats={buildStats(list.meta, list.items)} />

      <PostFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <TableCard>
        {list.loading ? (
          <LoadingRows />
        ) : list.items.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="Aucun post trouvé"
            description={
              search || status
                ? "Aucun résultat pour ces filtres."
                : "Commencez par rédiger votre premier article."
            }
          />
        ) : (
          <PostList
            items={list.items}
            onPreview={handleOpenPreview}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onReject={handleReject}
          />
        )}
        <Pagination
          meta={list.meta}
          page={list.page}
          onPageChange={list.setPage}
        />
      </TableCard>

      {/* Modal création / édition */}
      <Modal
        open={modal.open}
        title={modal.editing ? "Modifier le post" : "Nouveau post"}
        onClose={modal.close}
        onSubmit={handleSubmit}
        submitting={submitting}
        size="lg"
      >
        <PostForm
          formData={formData}
          onChange={setFormData}
          categories={categories}
          tags={tags}
        />
      </Modal>

      {/* Modal confirmation suppression */}
      <ConfirmModal
        open={confirmState.open}
        title={confirmState.title}
        description={confirmState.description}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        loading={confirmLoading}
      />

      {/* Preview post */}
        <PostPreviewModal
            open={previewOpen}
            post={previewPost}
            onClose={() => { setPreviewOpen(false); setPreviewPost(null); }}
            onPublish={handlePublishFromPreview}
            onReject={handleOpenReject}
            publishing={publishing}
            rejecting={rejecting}
        />

        {/* Saisie motif de rejet */}
        <RejectReasonModal
            open={rejectOpen}
            postTitle={previewPost?.title ?? ''}
            onConfirm={handleConfirmReject}
            onCancel={() => { setRejectOpen(false); setPreviewOpen(true); }} // retour à la preview
            loading={rejecting}
        />

      <Toast toasts={toasts} removeToast={removeToast} />
    </AdminLayout>
  );
};

// ── Skeleton loader ───────────────────────────────────────
const LoadingRows = () => (
  <div
    style={{
      padding: "1rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: ".75rem",
    }}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        style={{
          height: "3.5rem",
          borderRadius: ".5rem",
          background:
            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
          animationDelay: `${i * 0.08}s`,
        }}
      />
    ))}
    <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
  </div>
);

export default PostsPage;
