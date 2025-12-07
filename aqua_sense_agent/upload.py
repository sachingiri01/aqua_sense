from pine import retriever
# def upload_text_to_pinecone(raw_text: str, doc_id: str = "User_manual", source: str = "manual", doc_type: str = "general"):
#     """
#     Uploads raw text (split into chunks) into Pinecone with auto-embedding (v3 upsert_records style).
#     """
#     try:
#         def chunk_text(text, chunk_size=500, overlap=50):
#             chunks = []
#             start = 0
#             while start < len(text):
#                 end = start + chunk_size
#                 chunks.append(text[start:end].strip())
#                 start += chunk_size - overlap
#             return chunks

#         chunks = chunk_text(raw_text)

#         records = []
#         for i, chunk in enumerate(chunks):
#             records.append({
#                 "_id": f"{doc_id}-{i}",   # 👈 must be `_id` for v3 upsert_records
#                 "chunk_text": chunk,      # 👈 this will be auto-embedded (because of field_map)
#                 "text": chunk,            # 👈 optional if your field_map uses "text"
#                 "source": source,
#                 "doc_type": doc_type,
#                 "doc_id": doc_id,
#             })

#         # ✅ New SDK style
#         retriever.upsert_records("__default__", records)

#         return {"status": "success", "msg": f"Uploaded {len(chunks)} chunks for {doc_id}"}

#     except Exception as e:
#         return {"status": "error", "msg": str(e)}


from pine import vectorstore  # ✅ Must be imported

def upload_text_to_pinecone(
    raw_text: str,
    doc_id: str = "User_manual",
    source: str = "manual",
    doc_type: str = "general"
):
    """
    Uploads raw text (split into chunks) into Pinecone using LangChain VectorStore.
    Auto-embeds using HuggingFace embeddings (384-dim).
    """

    try:
        # ---------------------------
        # 1. Text Chunking
        # ---------------------------
        def chunk_text(text, chunk_size=500, overlap=50):
            chunks = []
            start = 0

            while start < len(text):
                end = start + chunk_size
                chunk = text[start:end].strip()

                if chunk:
                    chunks.append(chunk)

                start += chunk_size - overlap

            return chunks

        chunks = chunk_text(raw_text)

        if not chunks:
            return {
                "status": "error",
                "msg": "No valid text chunks found to upload."
            }

        # ---------------------------
        # 2. Metadata
        # ---------------------------
        metadatas = []
        for i in range(len(chunks)):
            metadatas.append({
                "doc_id": doc_id,
                "source": source,
                "doc_type": doc_type,
                "chunk_id": f"{doc_id}-{i}"
            })

        # ---------------------------
        # 3. ✅ Upload to Pinecone (CORRECT WAY)
        # ---------------------------
        vectorstore.add_texts(
            texts=chunks,
            metadatas=metadatas
        )

        return {
            "status": "success",
            "msg": f"Uploaded {len(chunks)} chunks for {doc_id}"
        }

    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }



def update_policy_to_pinecone(
    raw_text: str,
    doc_id: str = "User_manual",
    source: str = "manual",
    doc_type: str = "general"
):
    """
    Updates a policy in Pinecone.
    - Deletes existing chunks with same doc_id
    - Re-uploads updated content as fresh embeddings
    """

    try:
        # ---------------------------
        # 1. Text Chunking
        # ---------------------------
        def chunk_text(text, chunk_size=500, overlap=50):
            chunks = []
            start = 0

            while start < len(text):
                end = start + chunk_size
                chunk = text[start:end].strip()

                if chunk:
                    chunks.append(chunk)

                start += chunk_size - overlap

            return chunks

        chunks = chunk_text(raw_text)

        if not chunks:
            return {
                "status": "error",
                "msg": "No valid text chunks found to update."
            }

        # ---------------------------
        # 2. ✅ Delete existing policy by doc_id
        # ---------------------------
        vectorstore.delete(filter={"doc_id": doc_id})

        # ---------------------------
        # 3. Metadata Preparation
        # ---------------------------
        metadatas = []
        for i in range(len(chunks)):
            metadatas.append({
                "doc_id": doc_id,
                "source": source,
                "doc_type": doc_type,
                "chunk_id": f"{doc_id}-{i}"
            })

        # ---------------------------
        # 4. ✅ Re-upload Updated Policy
        # ---------------------------
        vectorstore.add_texts(
            texts=chunks,
            metadatas=metadatas
        )

        return {
            "status": "success",
            "msg": f"Updated {len(chunks)} chunks for policy {doc_id}"
        }

    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }