
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from model import get_llm
from pine import retriever 

# 1. Define the enhanced system prompt
system_prompt = """
You are AquaSense's official AI Assistant.

AquaSense is a smart water-quality monitoring and ML-based prediction platform.
Your job is to help staff, admins, and users understand the platform, run tasks,
explain water parameters, retrieve policies from the knowledge base, and act as
a safe, accurate support agent.

======================================================================
IDENTITY & ROLE
======================================================================
- You represent the AquaSense system.
- You assist staff, admin, and users based on their queries.
- You must always respond with short, simple, and direct answers.
- You must be technically correct and warn users if values seem unsafe.
- You use conversation context to continue tasks and reference past messages.

======================================================================
CORE CAPABILITIES
======================================================================
1. Retrieve information from the knowledge base (Pinecone RAG):
   - Staff policies
   - Staff rights
   - Admin policies
   - Water-quality policies
   - Platform rules
   - ML explanations
   - General water parameter FAQs

2. Assist staff with:
   - Viewing batch history
   - Understanding DO, TDS, pH, turbidity, temperature, conductivity
   - Identifying abnormal readings
   - Interpreting ML predictions
   - Reporting issues to admin

3. Assist admin with:
   - Reviewing escalations
   - Policy lookups
   - Staff rights and rules
   - Platform management guidance

4. Assist general users with:
   - Understanding how the ML model works
   - Understanding how the AquaSense platform works
   - General water-quality questions

   Staff CANNOT:
   - Delete users or batches
   - Override admin decisions
   - Change system rules or policies

D. Issue Reporting Flow
   - Staff reports → Admin receives → Admin resolves → Staff notified

E. Batch History
   - View past records
   - View prediction category
   - See alerts triggered
   - See who uploaded the batch

======================================================================
WATER PARAMETER KNOWLEDGE
======================================================================
You must be able to answer:
- What is TDS?
- What is DO?
- What is pH?
- What is turbidity?
- What makes water safe/unsafe?
- Why did a sample fail?
- Why did ML categorize the batch a certain way?

======================================================================
EXPLAINING THE PLATFORM
======================================================================
You must clearly explain:
- How the ML model works (simple explanation)
- How the AquaSense platform functions
- Why certain parameters matter for classification
- What treatment steps might be required

======================================================================
BEHAVIOR GUIDELINES
======================================================================
1. Always be polite, helpful.
3. Use available context & chat history.
4. If user input is incomplete, try to sense metion im assuming as its not clearly mentioned.
5. If the user asks about:
   - Policies → retrieve from knowledge base (RAG)
   - Staff rights → retrieve from knowledge base (RAG)
   - Water parameter meaning → explain simply
   - ML process → explain simply
6. If a request is outside platform scope, reply:
   "Please contact admin for further assistance."
7. If water values look dangerous, warn the user politely.
8. Never invent new policies; use RAG content if available.

======================================================================

Use all the above rules together to answer every query.
"""

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{chat}")
])

llm = get_llm()
chat_chain = LLMChain(llm=llm, prompt=chat_prompt)

# def chat_work(chat_str: str, history: dict = None, agent_key: str = "knowledge-mentor"):
#     """
#     Handles chat with history and retrieves relevant policies directly from Pinecone (auto-embedding).
#     Returns both assistant response and list of seen policies.
#     """
#     # 1. Rebuild history
#     if history and agent_key in history:
#         message_list = history
#         full_chat = ""
#         for msg in message_list:
#             role = msg.get("type")
#             content = msg.get("content")
#             if role == "user":
#                 full_chat += f"User: {content}\n"
#             elif role == "agent":
#                 full_chat += f"Assistant: {content}\n"
#     else:
#         full_chat = ""

#     # 2. Append current query
#     full_chat += f"User Asking now : {chat_str}"

#     # 3. Query Pinecone (same style as got_only_search_user)
#     results = retriever.search(
#         namespace="__default__",
#         query={"inputs": {"text": chat_str}, "top_k": 3},
#         fields=["chunk_text", "doc_id", "doc_type", "source"]
#     )

#     policy_seen = []
#     context_chunks = ""

#     if results and "result" in results and "hits" in results["result"]:
#         for hit in results["result"]["hits"]:
#             fields = hit.get("fields", {})
#             policy_seen.append({
#                 "doc_id": fields.get("doc_id", ""),
#                 "doc_type": fields.get("doc_type", ""),
#                 "source": fields.get("source", ""),
#             })
#             context_chunks += f"- {fields.get('doc_type','Unknown')}: {fields.get('chunk_text','')}\n"

#     # 4. Inject retrieved context into the prompt
#     augmented_chat = f"""
# Previous conversation:
# {full_chat}

# Relevant policies from database:
# {context_chunks}

# Now answer the user politely and concisely, following the assistant rules.
# """

#     # 5. Get response from LLM
#     response = chat_chain.invoke({"chat": augmented_chat})

#     return {
#         "response": response,
#         "policy_seen": policy_seen
#     }



def chat_work(chat_str: str, history: dict = None, agent_key: str = "knowledge-mentor"):

    # 1. Rebuild History
    if history and agent_key in history:
        message_list = history
        full_chat = ""
        for msg in message_list:
            role = msg.get("type")
            content = msg.get("content")

            if role == "user":
                full_chat += f"User: {content}\n"
            elif role == "agent":
                full_chat += f"Assistant: {content}\n"
    else:
        full_chat = ""

    full_chat += f"User Asking now : {chat_str}\n"

    # ✅ 2. Proper LangChain RAG Search
    docs = retriever.get_relevant_documents(chat_str)

    policy_seen = []
    context_chunks = ""

    for doc in docs:
        meta = doc.metadata or {}

        policy_seen.append({
            "doc_id": meta.get("doc_id", ""),
            "doc_type": meta.get("doc_type", ""),
            "source": meta.get("source", "")
        })

        context_chunks += f"- {meta.get('doc_type', 'Unknown')}: {doc.page_content}\n"

    # 3. Inject Context
    augmented_chat = f"""
Previous conversation:
{full_chat}

Relevant policies from database:
{context_chunks}

Now answer the user politely and concisely, following the assistant rules.
"""

    # 4. LLM Response
    response = chat_chain.invoke({"chat": augmented_chat})

    return {
        "response": response,
        "policy_seen": policy_seen
    }





# 5. Helper to update history
def update_history(history: list[str], user_input: str, assistant_response: str) -> list[str]:
    """
    Updates the chat history with the latest exchange.

    Args:
        history (list[str]): Existing chat history.
        user_input (str): User's message.
        assistant_response (str): Assistant's reply.

    Returns:
        list[str]: Updated history list.
    """
    if history is None:
        history = []
    history.append(user_input)
    history.append(assistant_response)
    return history

