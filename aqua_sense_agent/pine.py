from pinecone import Pinecone
import os
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("INDEX_NAME", "dummy for now -index")
USER_INDEX = os.getenv("USER_INDEX", "dummy for now -user-index")
RETREVAL_NAME=os.getenv("RETREVAL_NAME","retreval-index")

if not PINECONE_API_KEY:
    raise ValueError("⚠️ Please set the PINECONE_API_KEY environment variable")


pc = Pinecone(api_key=PINECONE_API_KEY)

if not pc.has_index(INDEX_NAME):
    pc.create_index_for_model(
        name=INDEX_NAME,
        cloud="aws",
        region="us-east-1",
        embed={
            "model": "llama-text-embed-v2",
            "field_map": {"text": "chunk_text"}
        }
    )
    print(f"✅ Created Pinecone index '{INDEX_NAME}'")
else:
    print(f"✅ Pinecone index '{INDEX_NAME}' already exists")
if not pc.has_index(USER_INDEX):
    pc.create_index_for_model(
        name=USER_INDEX,
        cloud="aws",
        region="us-east-1",
        embed={
            "model": "llama-text-embed-v2",
            "field_map": {"text": "chunk_text"}
        }
    )
    print(f"✅ Created Pinecone index '{USER_INDEX}'")
else:
    print(f"✅ Pinecone index '{USER_INDEX}' already exists")

if not pc.has_index(RETREVAL_NAME):
    pc.create_index_for_model(
        name=RETREVAL_NAME,
        cloud="aws",
        region="us-east-1",
        embed={
            "model": "llama-text-embed-v2",
            "field_map": {"text": "chunk_text"}
        }
    )
    print(f"✅ Created Pinecone index '{RETREVAL_NAME}'")
else:
    print(f"✅ Pinecone index '{RETREVAL_NAME}' already exists")
users_index = pc.Index(USER_INDEX)


vectorstore = PineconeVectorStore(
    index=pc.Index(RETREVAL_NAME),
    text_key="chunk_text",   
    embedding="llama-text-embed-v2" 
)
r1 = vectorstore.as_retriever(search_kwargs={"k": 3})
retriever =pc.Index(RETREVAL_NAME)
index = pc.Index(INDEX_NAME)
print(f"✅ Pinecone index '{INDEX_NAME}' is ready to use.")
print("Pinecone index stats:", index.describe_index_stats())
