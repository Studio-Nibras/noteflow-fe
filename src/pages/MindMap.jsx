import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";
import * as htmlToImage from "html-to-image";

import { generateQuiz } from "../services/quizApi";
import { getMindMap } from "../services/workspaceApi";

import MindMapHeader from "../components/mindmap/MindMapHeader";
import MindMapCanvas from "../components/mindmap/MindMapCanvas";
import MindMapBottomDock from "../components/mindmap/MindMapBottomDock";

import { buildGraph } from "../components/mindmap/graph/GraphBuilder";
import { applyLayout } from "../components/mindmap/layouts";

export default function MindMap() {
  const navigate = useNavigate();
  const reactFlowRef = useRef(null);

  const workspaceId = useMemo(() => localStorage.getItem("workspaceId"), []);
  const editedMindMapKey = useMemo(
    () => `edited-mindmap-${workspaceId}`,
    [workspaceId],
  );

  const [layoutStyle, setLayoutStyle] = useState("flow");
  const [graphData, setGraphData] = useState(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [loadingMindMap, setLoadingMindMap] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMindMap = async () => {
      if (!workspaceId) {
        setError("Workspace tidak ditemukan.");
        setLoadingMindMap(false);
        return;
      }

      try {
        const response = await getMindMap(workspaceId);
        localStorage.removeItem(editedMindMapKey);

        if (!response?.data?.mindMap) {
          throw new Error("Data mind map tidak lengkap.");
        }

        setGraphData(response.data.mindMap);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal memuat mind map.",
        );
      } finally {
        setLoadingMindMap(false);
      }
    };

    fetchMindMap();
  }, [workspaceId, editedMindMapKey]);

  useEffect(() => {
    const rawEdited = localStorage.getItem(editedMindMapKey);
    let editedMindMap = null;

    if (rawEdited) {
      try {
        editedMindMap = JSON.parse(rawEdited);
      } catch (err) {
        editedMindMap = null;
      }
    }

    if (editedMindMap?.nodes?.length && editedMindMap?.edges?.length) {
      setNodes(editedMindMap.nodes);
      setEdges(editedMindMap.edges);
      return;
    }

    if (!graphData) {
      return;
    }

    const { nodes: rawNodes = [], edges: rawEdges = [] } =
      buildGraph(graphData);

    const layoutedNodes = applyLayout(rawNodes, rawEdges, layoutStyle);

    const styledEdges = rawEdges.map((edge) => ({
      ...edge,
      type: layoutStyle === "bubble" ? "straight" : "smoothstep",
    }));

    setNodes(layoutedNodes);
    setEdges(styledEdges);
  }, [graphData, layoutStyle, editedMindMapKey]);

  useEffect(() => {
    if (!nodes.length) return;

    localStorage.setItem(
      editedMindMapKey,
      JSON.stringify({
        nodes,
        edges,
      }),
    );
  }, [nodes, edges, editedMindMapKey]);

  const handleGenerateQuiz = async () => {
    if (loadingQuiz) return;

    if (!workspaceId) {
      alert("Workspace tidak ditemukan.");
      return;
    }

    try {
      setLoadingQuiz(true);
      await generateQuiz({ workspaceId });
      navigate("/quiz/solo");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal generate quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleExportPNG = async () => {
    if (!reactFlowRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(reactFlowRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "mindmap.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Gagal export PNG.");
    }
  };

  if (loadingMindMap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat mind map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div className="h-[calc(100vh-64px)] flex flex-col">
        <MindMapHeader onExport={handleExportPNG} />

        <MindMapCanvas
          ref={reactFlowRef}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <MindMapBottomDock
            layoutStyle={layoutStyle}
            setLayoutStyle={setLayoutStyle}
            onGenerateQuiz={handleGenerateQuiz}
            loadingQuiz={loadingQuiz}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
