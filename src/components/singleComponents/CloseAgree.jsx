import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "../../style/deleteBlogComponent.css";
import useBlogsStore from "../../app/blogSlice.js";
const API_BASE_URL = "https://obbaramarket-backend.onrender.com";

export default function CloseAgree(props) {
  const { blogId, deleteAlert, setDeleteAlert } = props;
  const API_COMPLETE = `${API_BASE_URL}/api/obbaramarket/delete/blog/${blogId}`;
  const fetchBlogs = useBlogsStore((state) => state.fetchBlogs);
  const [manageButtonInfo, setManageButtonInfo] = useState(false);
  const [data, setData] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  const handleCancelBlogDelete = () => {
    setDeleteAlert(!deleteAlert);
  };

  const handleDeleteBlogFetch = async () => {
    try {
      setManageButtonInfo(true);
      setButtonDisabled(true);

      const response = await Promise.race([
        fetch(API_COMPLETE, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 30000)
        ),
      ]);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "La respuesta de la red no fue correcta");
      }

      setData(responseData);
      fetchBlogs();
    } catch (error) {
      if (error.message === "Timeout") {
        setShowTimeoutMessage(true);
      } else {
        setData({ error: error.message });
      }
    } finally {
      setManageButtonInfo(false);
      setButtonDisabled(false);
    }
  };
  return (
    <div className="DeleteBlogComponentMainContainer">
      <div className="DeleteBlogComponentContainer">
        <div className="DeleteIconContainer">
          <div>
            <IoIosWarning className="warningIcon" />
          </div>
        </div>
        <div className="DeleteMessageContainer">
          <h4>
            {" "}
            <span>
              <MdDelete />
            </span>{" "}
            Eliminar Blog
          </h4>
          <p>{`Estás a punto de eliminar el blog con el ID: ${blogId}`}</p>
          <p>Una vez eliminado no podras recuperarlo.</p>
        </div>
        <div className="DeleteOpcions">
          <button className="NoDeleteButtom" onClick={handleCancelBlogDelete}>
            No, quédatelo
          </button>
          <button
            className="DeleteBlogButtom"
            onClick={handleDeleteBlogFetch}
            disabled={buttonDisabled || manageButtonInfo}
          >
            {manageButtonInfo ? "Eliminando" : "Sí, eliminar"}
          </button>
        </div>
        <div className="messageFetch">
          {manageButtonInfo && !showTimeoutMessage && (
            <p className="waitingServer">Enviando solicitud...</p>
          )}
          {showTimeoutMessage && (
            <p className="serverTimeout">Servidor apagado, espera...</p>
          )}
          {data && !data.error && (
            <p className="fetchSuccess">Blog eliminado correctamente.</p>
          )}
          {data && data.error && <p className="fetchError">{data.error}</p>}
        </div>
      </div>
    </div>
  );
}
