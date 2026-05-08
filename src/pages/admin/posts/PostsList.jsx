import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { myroutes } from "../../../routes/routes";
import { usePosts } from "../../../features/posts/hooks/usePosts";
import PostsStats from "../../../features/posts/components/PostsStats";
import PostsToolbar from "../../../features/posts/components/PostsToolbar";
import PostsTable from "../../../features/posts/components/PostsTable";
import DeleteModal from "../../../features/posts/components/DeleteModal";
import { SAMPLE_POSTS } from "../../../features/posts/constants";

const PostsList = () => {
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState(null);
    const postsState = usePosts(SAMPLE_POSTS);

    const handleDelete = (id) => {
    // TODO : appel API
    setDeleteId(null);
    };

    return (
    <AdminLayout>
        <div className="pl-page">
        <PostsStats stats={postsState.stats} />
        <PostsToolbar
            {...postsState}
            onNew={() => navigate(myroutes.post_create)}
        />
        <PostsTable
            {...postsState}
            onDelete={setDeleteId}
            onEdit={(id) => navigate(`${myroutes.post_edit}/${id}`)}
        />
        </div>
        {deleteId && (
        <DeleteModal
            onConfirm={() => handleDelete(deleteId)}
            onCancel={() => setDeleteId(null)}
        />
        )}
    </AdminLayout>
    );
};

export default PostsList;
