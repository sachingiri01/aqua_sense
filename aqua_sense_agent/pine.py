# from pinecone import Pinecone, ServerlessSpec
# import os
# from dotenv import load_dotenv
# from langchain_pinecone import PineconeVectorStore

# load_dotenv()

# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# # INDEX_NAME = os.getenv("INDEX_NAME", "dummy for now -index")
# # USER_INDEX = os.getenv("USER_INDEX", "dummy for now -user-index")
# RETREVAL_NAME=os.getenv("POLICY_INDEX_NAME","policystore")

# if not PINECONE_API_KEY:
#     raise ValueError("⚠️ Please set the PINECONE_API_KEY environment variable")


# pc = Pinecone(api_key=PINECONE_API_KEY)

# # if not pc.has_index(INDEX_NAME):
# #     pc.create_index_for_model(
# #         name=INDEX_NAME,
# #         cloud="aws",
# #         region="us-east-1",
# #         embed={
# #             "model": "llama-text-embed-v2",
# #             "field_map": {"text": "chunk_text"}
# #         }
# #     )
# #     print(f"✅ Created Pinecone index '{INDEX_NAME}'")
# # else:
# #     print(f"✅ Pinecone index '{INDEX_NAME}' already exists")
# # if not pc.has_index(USER_INDEX):
# #     pc.create_index_for_model(
# #         name=USER_INDEX,
# #         cloud="aws",
# #         region="us-east-1",
# #         embed={
# #             "model": "llama-text-embed-v2",
# #             "field_map": {"text": "chunk_text"}
# #         }
# #     )
# #     print(f"✅ Created Pinecone index '{USER_INDEX}'")
# # else:
# #     print(f"✅ Pinecone index '{USER_INDEX}' already exists")

# if not pc.has_index(RETREVAL_NAME):
#     pc.create_index_for_model(
#         name=RETREVAL_NAME,
#         cloud="aws",
#         region="us-east-1",
#         embed={
#             "model": "llama-text-embed-v2",
#             "field_map": {"text": "chunk_text"}
#         }
#     )
#     print(f"✅ Created Pinecone index '{RETREVAL_NAME}'")
# else:
#     print(f"✅ Pinecone index '{RETREVAL_NAME}' already exists")
# # users_index = pc.Index(USER_INDEX)


# vectorstore = PineconeVectorStore(
#     index=pc.Index(RETREVAL_NAME),
#     text_key="chunk_text",   
#     embedding="llama-text-embed-v2" 
# )
# r1 = vectorstore.as_retriever(search_kwargs={"k": 3})
# retriever =pc.Index(RETREVAL_NAME)
# # index = pc.Index(RETREVAL_NAME)
# # print(f"✅ Pinecone index '{INDEX_NAME}' is ready to use.")
# print("Pinecone index stats:", retriever.describe_index_stats())

# import os
# import pinecone
# from dotenv import load_dotenv
# from langchain.vectorstores import Pinecone as LangchainPinecone
# from langchain.embeddings import HuggingFaceEmbeddings

# load_dotenv()

# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# INDEX_NAME = os.getenv("POLICY_INDEX_NAME", "policystore")

# # ❗ MUST BE EXACT from your Pinecone HOST:
# PINECONE_ENV = "aped-4627-b74a"
# # PINECONE_ENV = os.getenv("PINECONE_ENVIRONMENT", "us-east-1")

# if not PINECONE_API_KEY:
#     raise ValueError("⚠️ Missing PINECONE_API_KEY")

# # ---------------------------
# #  INIT OLD PINECONE CLIENT
# # ---------------------------
# pinecone.init(
#     api_key=PINECONE_API_KEY,
#     environment=PINECONE_ENV    # 👈 FIXED!
# )

# # ---------------------------
# #  CREATE INDEX IF NEEDED
# # ---------------------------
# if INDEX_NAME not in pinecone.list_indexes():
#     pinecone.create_index(
#         name=INDEX_NAME,
#         metric="cosine",
#         dimension=1024   # from your Pinecone dashboard
#     )
#     print(f"Created index {INDEX_NAME}")
# else:
#     print(f"Index already exists: {INDEX_NAME}")

# # connect to index
# index = pinecone.Index(INDEX_NAME)

# # ---------------------------
# #  LangChain VectorStore
# # ---------------------------
# embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# vectorstore = LangchainPinecone(
#     index=index,
#     embedding_function=embedding_model.embed_query,
#     text_key="chunk_text"
# )

# # retriever to be used in chat_worker
# r1 = vectorstore.as_retriever(search_kwargs={"k": 3})
# retriever = index

# # Debug
# print("Pinecone index stats:", index.describe_index_stats())

# from pinecone import Pinecone
# from langchain_pinecone import PineconeVectorStore
# from langchain_community.embeddings import HuggingFaceEmbeddings
# import os
# from dotenv import load_dotenv

# load_dotenv()

# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# RETREVAL_NAME = os.getenv("POLICY_INDEX_NAME", "policystore")

# pc = Pinecone(api_key=PINECONE_API_KEY)
# index = pc.Index(RETREVAL_NAME)

# # ✅ THIS NAME MUST BE "embedding"
# embedding = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )

# vectorstore = PineconeVectorStore(
#     index=index,
#     text_key="chunk_text",
#     embedding=embedding
# )
# raw_index = index

# # ✅ retriever exists
# retriever = vectorstore.as_retriever(search_kwargs={"k": 3})



from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_community.embeddings import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("POLICY_INDEX_NAME", "policystore")

# -----------------------------
# Init Pinecone Client
# -----------------------------
pc = Pinecone(api_key=PINECONE_API_KEY)

# -----------------------------
# Embedding Model (384 DIM)
# -----------------------------
embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

EMBEDDING_DIM = 384  

# -----------------------------
# Auto-create index if missing
# -----------------------------
existing_indexes = [i["name"] for i in pc.list_indexes()]

if INDEX_NAME not in existing_indexes:
    pc.create_index(
        name=INDEX_NAME,
        dimension=EMBEDDING_DIM,   
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

# -----------------------------
# Connect to Index
# -----------------------------
index = pc.Index(INDEX_NAME)

# -----------------------------
# LangChain Vector Store
# -----------------------------
vectorstore = PineconeVectorStore(
    index=index,
    text_key="chunk_text",
    embedding=embedding
)

# -----------------------------
# Retriever (✅ ONLY THIS IS USED)
# -----------------------------
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
# -----------------------------
# Optional raw index (if ever needed)
# -----------------------------
raw_index = index
