# import os
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from langchain.output_parsers import ResponseSchema, StructuredOutputParser
# from dotenv import load_dotenv
# from model import llm_chain, get_llm

# # ---------------------------
# # ENV SETUP
# # ---------------------------
# load_dotenv()
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# llm = get_llm()

# # ---------------------------
# # MAIN CHAT PROMPT (For Normal Chat)
# # ---------------------------
# prompt = ChatPromptTemplate.from_messages([
#     ("system",
#      "You are AquaSense's AI Agent. "
#      "You assist users with water batch monitoring, sensor data, "
#      "and general water-related questions. "
#      "Always be polite, professional, and helpful."
#     ),
#     ("human", "{user_input}")
# ])

# chain = LLMChain(llm=llm, prompt=prompt)

# # ---------------------------
# # ✅ NEW SCHEMA: ONLY FOR BATCH DETECTION
# # ---------------------------
# schemas_extract = [
#     ResponseSchema(
#         name="intent",
#         description="Must be one of: 'get_batch', 'general_chat', 'unknown'"
#     ),
#     ResponseSchema(
#         name="batch_number",
#         description="Batch number if explicitly mentioned. Otherwise return null."
#     ),
#     ResponseSchema(
#         name="needs_api",
#         description="true if backend API must be called. false if normal AI reply is sufficient."
#     )
# ]

# parser_extract = StructuredOutputParser.from_response_schemas(schemas_extract)
# format_extract = parser_extract.get_format_instructions()

# # ---------------------------
# # ✅ EXTRACTION PROMPT
# # ---------------------------
# prompt_extract = ChatPromptTemplate.from_template("""
# You are a request classifier for a water batch monitoring system.

# User can:
# - Ask for batch details (today's batch, latest batch, batch 12, etc.)
# - Ask general water questions
# - Say random unclear things

# Rules:
# - If user asks for batch → intent = "get_batch"
# - If a number like "batch 12" appears → batch_number = 12
# - If asking for "latest" or "today" → batch_number = null
# - If API is needed → needs_api = true
# - If normal chat → needs_api = false
# - If unclear / nonsense → intent = "unknown"

# Return ONLY in this format:
# {format_instructions}

# User Query:
# {user_input}
# """)

# extract_chain = LLMChain(llm=llm, prompt=prompt_extract)

# # ---------------------------
# # ✅ MAIN ORCHESTRATOR (THIS IS YOUR CORE FUNCTION)
# # ---------------------------
# def process_request(api_prompt: str):
#     """
#     This function decides:
#     - Whether to call a backend API
#     - Which API to call
#     - Or whether to return a normal AI reply
#     """

#     # ---------- 1. INTENT EXTRACTION ----------
#     extracted_raw = extract_chain.run(
#         user_input=api_prompt,
#         format_instructions=format_extract
#     )

#     extracted = parser_extract.parse(extracted_raw)

#     intent = extracted.get("intent")
#     batch_number = extracted.get("batch_number")
#     needs_api = extracted.get("needs_api")

#     # ---------- 2. UNCLEAR / RANDOM QUERY ----------
#     if intent == "unknown":
#         return {
#             "needs_api": False,
#             "response": (
#                 "I couldn’t clearly understand what batch information you need. "
#                 "Please tell me a batch number (like 'batch 12') "
#                 "or say 'show today’s batch'."
#             )
#         }

#     # ---------- 3. NORMAL CHAT (NO API) ----------
#     if not needs_api:
#         return {
#             "needs_api": False,
#             "response": llm_chain(api_prompt)
#         }

#     # ---------- 4. BATCH DATA REQUIRED ----------
#     if intent == "get_batch":

#         # ✅ CASE 1: SPECIFIC BATCH NUMBER
#         if batch_number is not None:
#             return {
#                 "needs_api": True,
#                 "api_call": {
#                     "method": "POST",
#                     "url": "http://localhost:3000/api/batch/by-number",
#                     "body": {
#                         "batch_number": batch_number
#                     }
#                 }
#             }

#         # ✅ CASE 2: LATEST / TODAY’S BATCH
#         return {
#             "needs_api": True,
#             "api_call": {
#                 "method": "GET",
#                 "url": "http://localhost:3000/api/batch/latest",
#                 "body": {}
#             }
#         }

#     # ---------- 5. SAFETY FALLBACK ----------
#     return {
#         "needs_api": False,
#         "response": "I am not sure what you are trying to fetch. Please be more specific."
#     }


# import os
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from langchain.output_parsers import ResponseSchema, StructuredOutputParser
# from dotenv import load_dotenv
# from model import llm_chain, get_llm

# # ---------------------------
# # ENV SETUP
# # ---------------------------
# load_dotenv()
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# llm = get_llm()

# # ---------------------------
# # MAIN CHAT PROMPT (For Normal Conversations)
# # ---------------------------
# prompt = ChatPromptTemplate.from_messages([
#     ("system",
#      "You are AquaSense's AI Agent. "
#      "You assist users with water batch monitoring, sensor data, "
#      "and general water-related questions. "
#      "Always be polite, professional, and helpful."
#     ),
#     ("human", "{user_input}")
# ])

# chat_chain = LLMChain(llm=llm, prompt=prompt)

# # ---------------------------
# # SCHEMA FOR BATCH ROUTING
# # ---------------------------
# schemas_extract = [
#     ResponseSchema(
#         name="intent",
#         description="Must be one of: 'get_batch', 'general_chat', 'unknown'"
#     ),
#     ResponseSchema(
#         name="batch_number",
#         description="Batch number if explicitly mentioned. Otherwise null."
#     ),
#     ResponseSchema(
#         name="needs_api",
#         description="true if backend API must be called. false if normal AI reply is fine."
#     )
# ]

# parser_extract = StructuredOutputParser.from_response_schemas(schemas_extract)
# format_extract = parser_extract.get_format_instructions()

# # ---------------------------
# # EXTRACTION PROMPT
# # ---------------------------
# prompt_extract = ChatPromptTemplate.from_template("""
# You classify batch-related user requests for AquaSense.

# Rules:
# - If user asks for batch → intent = "get_batch"
# - If they mention "batch 12" → batch_number = 12
# - If they ask for "latest" or "today's batch" → batch_number = null
# - needs_api = true for any batch request
# - If it's normal chat → intent = "general_chat", needs_api = false
# - If it's unclear → intent = "unknown"

# Return ONLY:
# {format_instructions}

# User Query:
# {user_input}
# """)

# extract_chain = LLMChain(llm=llm, prompt=prompt_extract)

# # -------------------------------------------------
# # HELPER – also used by search_worker to avoid errors
# # -------------------------------------------------
# def get_data(api_prompt: str):
#     """
#     Wrapper for extraction only — used by search_worker.
#     """
#     extracted_raw = extract_chain.run(
#         user_input=api_prompt,
#         format_instructions=format_extract
#     )
#     return parser_extract.parse(extracted_raw)

# # ---------------------------
# # MAIN DECISION ENGINE
# # ---------------------------
# def process_request(api_prompt: str):
#     """
#     Decides:
#     - Should backend API be used?
#     - Which API?
#     - Or should LLM answer directly?
#     """

#     extracted_raw = extract_chain.run(
#         user_input=api_prompt,
#         format_instructions=format_extract
#     )
#     extracted = parser_extract.parse(extracted_raw)

#     intent = extracted.get("intent")
#     batch_number = extracted.get("batch_number")
#     needs_api = extracted.get("needs_api")

#     # Convert string numbers → int
#     if batch_number and isinstance(batch_number, str) and batch_number.isdigit():
#         batch_number = int(batch_number)

#     # ---------- 1. UNCLEAR REQUEST ----------
#     if intent == "unknown":
#         return {
#             "needs_api": False,
#             "response": (
#                 "I couldn't understand what batch you're asking about. "
#                 "Please specify a batch number (e.g., 'batch 12') "
#                 "or say 'show today’s batch'."
#             )
#         }

#     # ---------- 2. NORMAL CHAT ----------
#     if not needs_api:
#         return {
#             "needs_api": False,
#             "response": chat_chain.run(user_input=api_prompt)
#         }

#     # ---------- 3. BATCH REQUEST ----------
#     if intent == "get_batch":

#         # CASE A — Specific batch number
#         if batch_number is not None:
#             return {
#                 "needs_api": True,
#                 "api_call": {
#                     "method": "POST",
#                     "url": "http://localhost:3000/api/batch/by-number",
#                     "body": {"batch_number": batch_number}
#                 }
#             }

#         # CASE B — Latest batch
#         return {
#             "needs_api": True,
#             "api_call": {
#                 "method": "GET",
#                 "url": "http://localhost:3000/api/batch/latest",
#                 "body": {}
#             }
#         }

#     # ---------- 4. SAFETY FALLBACK ----------
#     return {
#         "needs_api": False,
#         "response": "I'm not sure what you're asking. Please be more specific."
#     }




# import os
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from langchain.output_parsers import ResponseSchema, StructuredOutputParser
# from dotenv import load_dotenv
# from model import get_llm

# # ---------------------------
# # ENV SETUP
# # ---------------------------
# load_dotenv()
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# llm = get_llm()

# # ---------------------------
# # MAIN CHAT PROMPT (USES HISTORY)
# # ---------------------------
# chat_prompt = ChatPromptTemplate.from_messages([
#     ("system",
#      "You are AquaSense's AI Agent. "
#      "You assist users with water batch monitoring, sensor data, "
#      "and general water-related questions. "
#      "Always be polite, professional, and helpful."
#     ),
#     ("human", "{chat}")
# ])

# chat_chain = LLMChain(llm=llm, prompt=chat_prompt)

# # ---------------------------
# # SCHEMA FOR BATCH ROUTING
# # ---------------------------
# schemas_extract = [
#     ResponseSchema(
#         name="intent",
#         description="Must be one of: 'get_batch', 'general_chat', 'unknown'"
#     ),
#     ResponseSchema(
#         name="batch_number",
#         description="Batch number if explicitly mentioned. Otherwise null."
#     ),
#     ResponseSchema(
#         name="needs_api",
#         description="true if backend API must be called. false if normal AI reply is fine."
#     )
# ]

# parser_extract = StructuredOutputParser.from_response_schemas(schemas_extract)
# format_extract = parser_extract.get_format_instructions()

# # ---------------------------
# # EXTRACTION PROMPT
# # ---------------------------
# prompt_extract = ChatPromptTemplate.from_template("""
# You classify batch-related user requests for AquaSense.

# Rules:
# - If user asks for batch → intent = "get_batch"
# - If they mention "batch 12" → batch_number = 12
# - If they ask for "latest" or "today's batch" → batch_number = null
# - needs_api = true for any batch request
# - If it's normal chat → intent = "general_chat", needs_api = false
# - If it's unclear → intent = "unknown"

# Return ONLY:
# {format_instructions}

# User Query:
# {user_input}
# """)

# extract_chain = LLMChain(llm=llm, prompt=prompt_extract)

# # ---------------------------
# # ✅ MAIN DECISION ENGINE (USES MSG + HISTORY)
# # ---------------------------
# def process_request(msg: str, history: list | None = None):
#     """
#     Uses current msg + past history.
#     Returns:
#     - Polite AI reply
#     - OR API call + friendly message
#     """

#     # ---------- 1. BUILD CHAT USING HISTORY ----------
#     full_chat = ""
#     if history:
#         for h in history:
#             full_chat += f"{h}\n"
#     full_chat += f"User: {msg}"

#     # ---------- 2. CLASSIFY INTENT ----------
#     extracted_raw = extract_chain.run(
#         user_input=msg,
#         format_instructions=format_extract
#     )
#     extracted = parser_extract.parse(extracted_raw)

#     intent = extracted.get("intent")
#     batch_number = extracted.get("batch_number")
#     needs_api = extracted.get("needs_api")

#     if batch_number and isinstance(batch_number, str) and batch_number.isdigit():
#         batch_number = int(batch_number)

#     # ---------- 3. UNCLEAR MESSAGE ----------
#     if intent == "unknown":
#         return {
#             "needs_api": False,
#             "response": (
#                 "Thanks for your message! 😊 "
#                 "To help you better, please specify a batch number "
#                 "(like 'batch 12') or say 'show today’s batch'."
#             )
#         }

#     # ---------- 4. NORMAL CHAT ----------
#     if not needs_api:
#         ai_response = chat_chain.run(chat=full_chat)
#         return {
#             "needs_api": False,
#             "response": ai_response
#         }

#     # ---------- 5. BATCH REQUEST ----------
#     if intent == "get_batch":

#         # ✅ Specific batch
#         if batch_number is not None:
#             return {
#                 "needs_api": True,
#                 "message": f"✅ Sure! Fetching data for batch {batch_number} now.",
#                 "api_call": {
#                     "method": "POST",
#                     "url": "http://localhost:3000/api/batch/by-number",
#                     "body": {"batch_number": batch_number}
#                 }
#             }

#         # ✅ Latest batch
#         return {
#             "needs_api": True,
#             "message": "✅ Sure! Fetching the latest batch data for you.",
#             "api_call": {
#                 "method": "GET",
#                 "url": "http://localhost:3000/api/batch/latest",
#                 "body": {}
#             }
#         }

#     # ---------- 6. FALLBACK ----------
#     return {
#         "needs_api": False,
#         "response": "I'm not fully sure what you're asking. Could you please clarify?"
#     }


import os
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from dotenv import load_dotenv
from model import llm_chain, get_llm

# ---------------------------
# ENV SETUP
# ---------------------------
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

llm = get_llm()

# ---------------------------
# MAIN CHAT PROMPT (Normal Chat)
# ---------------------------
prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are AquaSense's AI Agent. You assist users with water batch monitoring, "
     "sensor data, ML predictions, and general water-quality questions. "
     "Always be polite, professional, and supportive."
    ),
    ("human", "{user_input}")
])

chat_chain = LLMChain(llm=llm, prompt=prompt)

# ---------------------------
# EXTRACTION SCHEMA
# ---------------------------
schemas_extract = [
    ResponseSchema(
        name="intent",
        description="Must be one of: 'get_batch', 'general_chat', 'unknown'"
    ),
    ResponseSchema(
        name="batch_number",
        description="Batch number if present. Otherwise null."
    ),
    ResponseSchema(
        name="needs_api",
        description="true if backend API must be called. false if LLM can answer."
    )
]

parser_extract = StructuredOutputParser.from_response_schemas(schemas_extract)
format_extract = parser_extract.get_format_instructions()

# ---------------------------
# EXTRACTION PROMPT
# ---------------------------
prompt_extract = ChatPromptTemplate.from_template("""
You classify batch-related user requests for AquaSense.

Rules:
- If user asks for batch details → intent = "get_batch"
- If they mention "batch 12" → batch_number = 12
- If they say "today" or "latest" → batch_number = null
- Batch requests → needs_api = true
- Normal chat → needs_api = false
- If unclear → intent = "unknown"

Return ONLY:
{format_instructions}

User Query:
{user_input}
""")

extract_chain = LLMChain(llm=llm, prompt=prompt_extract)

# -------------------------------------------------
# HELPER: LLM-GENERATED MESSAGE (NO HARDCODE)
# -------------------------------------------------
def build_llm_message(query: str, mode: str, batch_number=None):
    """
    Generates a human-friendly message automatically using LLM.
    """
    if mode == "api_specific":
        prompt = f"""
        The user asked: "{query}"

        Generate a around 50 words, warm, human-like message explaining:
        - You understood they want batch {batch_number}
        - You are preparing to fetch the full batch details from the backend
        - It will include sensor readings, ML predictions, alerts, etc.
        - Be polite, detailed, supportive.
        - Do NOT mention URLs or APIs.
        """
    
    elif mode == "api_latest":
        prompt = f"""
        The user asked: "{query}"

        Generate a around 50 words, friendly message explaining:
        - You are now retrieving the latest batch from today
        - It will include all sensor values, predictions, and alerts
        - Reassure the user that data is being fetched
        """

    elif mode == "general":
        prompt = f"""
        The user asked: "{query}"

        Generate a detailed, conversational, supportive message as AquaSense’s assistant.
        """

    else:  # unclear
        prompt = f"""
        The user said: "{query}"

        You could not determine the batch.
        Generate a around 50 words, polite message asking them to specify:
        - A batch number (e.g., "batch 7")
        - Or "latest batch"
        - Or "today’s batch"
        Be patient and helpful.
        """

    result = llm_chain(prompt)
    return result

# -------------------------------------------------
# MAIN DECISION ENGINE
# -------------------------------------------------
def process_request(api_prompt: str):
    """
    Decides:
    - Whether to call backend API
    - Which API
    - Or return LLM response
    """

    extracted_raw = extract_chain.run(
        user_input=api_prompt,
        format_instructions=format_extract
    )
    extracted = parser_extract.parse(extracted_raw)

    intent = extracted.get("intent")
    batch_number = extracted.get("batch_number")
    needs_api = extracted.get("needs_api")

    # Convert batch_number to int when possible
    if batch_number and isinstance(batch_number, str) and batch_number.isdigit():
        batch_number = int(batch_number)

    # ---------- 1. UNCLEAR ----------
    if intent == "unknown":
        return {
            "needs_api": False,
            "response": build_llm_message(api_prompt, mode="unclear")
        }

    # ---------- 2. NORMAL CHAT ----------
    if not needs_api:
        return {
            "needs_api": False,
            "response": build_llm_message(api_prompt, mode="general")
        }

    # ---------- 3. BATCH REQUEST ----------
    if intent == "get_batch":

        # SPECIFIC BATCH NUMBER
        if batch_number is not None:
            return {
                "needs_api": True,
                "message": build_llm_message(api_prompt, mode="api_specific", batch_number=batch_number),
                "api_call": {
                    "method": "POST",
                    "url": "http://localhost:3000/api/batch/by-number",
                    "body": {"batch_number": batch_number}
                }
            }

        # LATEST BATCH
        return {
            "needs_api": True,
            "message": build_llm_message(api_prompt, mode="api_latest"),
            "api_call": {
                "method": "GET",
                "url": "http://localhost:3000/api/batch/latest",
                "body": {}
            }
        }

    # ---------- SAFETY FALLBACK ----------
    return {
        "needs_api": False,
        "response": "I’m not sure what you're asking. Please be more specific."
    }


# SIMPLE extraction wrapper
def get_data(api_prompt):
    extracted_raw = extract_chain.run(
        user_input=api_prompt,
        format_instructions=format_extract
    )
    return parser_extract.parse(extracted_raw)
