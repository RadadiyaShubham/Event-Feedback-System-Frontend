import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowRightOnRectangleIcon, HomeIcon } from "@heroicons/react/24/outline";

const BASE_URL = `${process.env.basebackendurl}/api`;

export default function History() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/feedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      setError("Failed to load your feedback history. Please try again.");
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const deleteFeedback = async (id) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${BASE_URL}/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (error) {
      setError("Failed to delete feedback. Please try again.");
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const startEditing = (fb) => {
    setEditingId(fb._id);
    setEditedComment(fb.comment || "");
    setEditedRating(fb.rating);
  };

  const saveEdit = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await axios.put(
        `${BASE_URL}/feedbacks/${editingId}`,
        { comment: editedComment, rating: editedRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      fetchFeedbacks();
    } catch (error) {
      setError("Failed to update feedback. Please try again.");
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center">
            Feedback History
          </h2>
          <div className="flex space-x-4">
            <Link
              to="/feedback"
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your feedback history...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            No feedback submitted yet.
          </p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-gray-800 p-4 rounded-md shadow mb-4 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white">{fb.event}</h3>

              {editingId === fb._id ? (
                <>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editedRating}
                    onChange={(e) => setEditedRating(Number(e.target.value))}
                    className="w-full mt-2 mb-2 p-2 bg-gray-900 border border-gray-600 text-white rounded"
                  />
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full p-2 bg-gray-900 border border-gray-600 text-white rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      disabled={isUpdating}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-70 px-4 py-1 rounded text-white"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      disabled={isUpdating}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-70 px-4 py-1 rounded text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300">Rating: {fb.rating} ★</p>
                  {fb.comment && (
                    <p className="text-sm text-gray-400 mt-1">
                      Comment: {fb.comment}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEditing(fb)}
                      className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded text-black font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFeedback(fb._id)}
                      disabled={isDeleting}
                      className="bg-red-400 hover:bg-red-500 disabled:bg-red-800 disabled:opacity-70 px-3 py-1 rounded text-white"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
