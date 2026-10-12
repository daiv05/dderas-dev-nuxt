"""Genera app/data/embedding-space.json a partir de scripts/.cache/site-text.json."""

import json
from pathlib import Path

import numpy as np
import umap
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "scripts" / ".cache" / "site-text.json"
TARGET = ROOT / "app" / "data" / "embedding-space.json"
MODEL = "all-MiniLM-L6-v2"
EDGE_NEIGHBORS = 3
QUERY_NEIGHBORS = 5


def top_k(similarities: np.ndarray, k: int, exclude: int | None = None) -> list[int]:
    """Devuelve los índices de las k similitudes más altas, excluyendo opcionalmente un índice."""
    order = np.argsort(-similarities)
    return [int(i) for i in order if i != exclude][:k]


def main() -> None:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    items = data["items"]
    queries = data["queries"]

    model = SentenceTransformer(MODEL)
    vectors = model.encode([item["text"] for item in items], normalize_embeddings=True)
    query_vectors = model.encode(queries, normalize_embeddings=True)

    reducer = umap.UMAP(n_components=3, n_neighbors=15, min_dist=0.1, metric="cosine", random_state=42)
    coords = reducer.fit_transform(vectors)
    query_coords = reducer.transform(query_vectors)

    center = coords.mean(axis=0)
    scale = float(np.linalg.norm(coords - center, axis=1).max()) or 1.0
    coords = (coords - center) / scale
    query_coords = (query_coords - center) / scale

    similarity = vectors @ vectors.T
    edges: set[tuple[int, int]] = set()
    for i in range(len(items)):
        for j in top_k(similarity[i], EDGE_NEIGHBORS, exclude=i):
            edges.add((min(i, j), max(i, j)))

    points = [
        {
            "id": item["id"],
            "label": item["label"],
            "cluster": item["cluster"],
            "href": item["href"],
            "weight": item["weight"],
            "position": [round(float(v), 4) for v in coords[i]],
        }
        for i, item in enumerate(items)
    ]

    resolved_queries = [
        {
            "text": text,
            "position": [round(float(v), 4) for v in query_coords[n]],
            "neighbors": top_k(vectors @ query_vectors[n], QUERY_NEIGHBORS),
        }
        for n, text in enumerate(queries)
    ]

    TARGET.write_text(
        json.dumps(
            {"version": 1, "points": points, "edges": sorted([list(e) for e in edges]), "queries": resolved_queries},
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    print(f"points: {len(points)}, edges: {len(edges)}, queries: {len(resolved_queries)}")


if __name__ == "__main__":
    main()
