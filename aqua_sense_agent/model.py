
# from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
# from langchain.prompts import ChatPromptTemplate
# from dotenv import load_dotenv

# import os

# load_dotenv()

# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# gemini = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0
# )

# # -------------------
# # Prompt Template
# # -------------------
# prompt = ChatPromptTemplate.from_messages([
#     (
#         "system",
#         "You are AquaSense's official AI Agent. "
#         "Your role is to help users monitor water quality, analyze sensor data, upload batches, "
#         "predict water reuse categories, and guide them through treatment stages. "
#         "You can explain parameters like pH, turbidity, DO, TDS, and temperature, and assist users in "
#         "understanding model predictions. "
#         "You must always maintain accuracy, clarity, and safety when interpreting water-quality metrics. "
#         "If data looks abnormal or hazardous, warn the user politely. "
#         "You can help troubleshoot issues, guide users through dashboards, processing steps, "
#         "and system features such as batch uploads, alerts, and treatment recommendations. "
#         "Always be supportive, responsible, and technically correct. "
#         "Ask clarifying questions whenever the user's query is incomplete."
#     ),
#     ("human", "{user_input}")
# ])


# # -------------------
# # New LangChain v2 Pipeline
# # -------------------
# # Instead of LLMChain(llm=gemini, prompt=prompt)
# chain = prompt | gemini

# def llm_chain(user_input):
#     response = chain.invoke({"user_input": user_input})
#     return response.content  # response is a ChatMessage

# def get_llm():
#     return gemini







from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

# ✅ Make sure API key is loaded correctly
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")


# ✅ Gemini LLM with REQUIRED flag to support SystemMessage
gemini = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0,
    convert_system_message_to_human=True  # ✅ THIS FIXES YOUR CRASH
)


# -------------------
# Prompt Template
# -------------------
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are AquaSense's official AI Agent. "
        "Your role is to help users monitor water quality, analyze sensor data, upload batches, "
        "predict water reuse categories, and guide them through treatment stages. "
        "You can explain parameters like pH, turbidity, DO, TDS, and temperature, and assist users in "
        "understanding model predictions. "
        "You must always maintain accuracy, clarity, and safety when interpreting water-quality metrics. "
        "If data looks abnormal or hazardous, warn the user politely. "
        "You can help troubleshoot issues, guide users through dashboards, processing steps, "
        "and system features such as batch uploads, alerts, and treatment recommendations. "
        "Always be supportive, responsible, and technically correct. "
        "Ask clarifying questions whenever the user's query is incomplete."
    ),
    ("human", "{user_input}")
])


# -------------------
# LangChain v2 Pipeline
# -------------------
chain = prompt | gemini


def llm_chain(user_input: str):
    response = chain.invoke({"user_input": user_input})
    return response.content  # ✅ Always return clean text


def get_llm():
    return gemini





# from dotenv import load_dotenv
# import os

# try:
#     from langchain_community.llms import HuggingFaceHub
# except Exception:
#     HuggingFaceHub = None

# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.prompts import ChatPromptTemplate

# load_dotenv()

# # -----------------------
# # 1) HuggingFace Models (optional)
# # -----------------------
# # Use HuggingFaceHub if `HUGGING_FACE_API_KEY` is present in the environment.
# HUGGING_FACE_TOKEN = os.getenv("HUGGING_FACE_API_KEY")
# HF_MODEL = os.getenv("HF_MODEL", "meta-llama/Llama-3.1-8B-Instruct")
# hf_llm = None
# if HuggingFaceHub is not None and HUGGING_FACE_TOKEN:
#     try:
#         hf_llm = HuggingFaceHub(
#             repo_id=HF_MODEL,
#             huggingfacehub_api_token=HUGGING_FACE_TOKEN,
#             model_kwargs={
#                 "temperature": 0,
#                 "max_new_tokens": 512
#             }
#         )
#     except Exception:
#         hf_llm = None

# # -----------------------
# # 2) Google Gemini
# # -----------------------
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# gemini = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0
# )

# # Choose the active LLM: prefer HuggingFace if available, otherwise fall back to Gemini
# if hf_llm is not None:
#     selected_llm = hf_llm
# else:
#     selected_llm = gemini

# # -----------------------
# # 3) Prompt Template
# # -----------------------
# prompt = ChatPromptTemplate.from_messages([
#     ("system",
#      "You are AquaSense's official AI Agent. "
#      "Help users analyze water quality, sensor data, and treatment stages. "
#      "Warn users if values are abnormal."),
#     ("human", "{user_input}")
# ])

# # Use Gemini by default
# chain = prompt | selected_llm

# # -----------------------
# # 4) Chain Runner
# # -----------------------
# def llm_chain(user_input: str):
#     response = chain.invoke({"user_input": user_input})
#     return response.content

# def get_llm():
#     return selected_llm



# # from langchain_google_genai import GoogleGenerativeAIEmbeddings
# # from langchain_google_genai import ChatGoogleGenerativeAI
# # from langchain.prompts import ChatPromptTemplate
# # from langchain.chains import LLMChain
# # from dotenv import load_dotenv
# # from langchain_huggingface import HuggingFaceEndpoint
# # from langchain_community.llms import HuggingFaceHub
# # import os
# # from langchain_huggingface import ChatHuggingFace
# # load_dotenv()



# # mistral_llm = HuggingFaceEndpoint(
# #     repo_id="mistralai/Mistral-7B-Instruct-v0.2",
# #     temperature=0,
# #     max_new_tokens=512,
# #     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY") 
# # )


# # olama = HuggingFaceEndpoint(
# #     repo_id="meta-llama/Llama-3.1-8B-Instruct",
# #     temperature=0,
# #     max_new_tokens=512,
# #     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY") 
# # )

# # olama_llm = ChatHuggingFace(llm=olama)
# # # Wrap it as a chat model
# # mistral = ChatHuggingFace(llm=mistral_llm)

# # os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
# # gemini = ChatGoogleGenerativeAI(
# #     model="gemini-2.5-flash",
# #     temperature=0
# # )

# # prompt = ChatPromptTemplate.from_messages([
# #     ("system", 
# #      "You are SkillAmigo's AI Agent. "
# #      "You can book chats, arrange bargains on the user’s behalf, and assist them extensively. "
# #      "You are an official AI representative of SkillAmigo, a platform for exchanging services. "
# #      "Always be polite, efficient, and proactive. U can ask question if u like to know more about the user or query or anything"),
# #     ("human", "{user_input}")
# # ])
# # chain = LLMChain(llm=gemini, prompt=prompt)

# # def llm_chain(prompt):
# #     return chain.run({"user_input":prompt})

# # def get_llm():
# #     return gemini;

# from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
# from langchain.prompts import ChatPromptTemplate
# from dotenv import load_dotenv
# from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
# import os

# load_dotenv()

# # -------------------
# # LLM Setup
# # -------------------
# mistral_llm = HuggingFaceEndpoint(
#     repo_id="mistralai/Mistral-7B-Instruct-v0.2",
#     temperature=0,
#     max_new_tokens=512,
#     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY")
# )

# olama = HuggingFaceEndpoint(
#     repo_id="meta-llama/Llama-3.1-8B-Instruct",
#     temperature=0,
#     max_new_tokens=512,
#     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY")
# )

# # Wrap as chat models
# mistral = ChatHuggingFace(llm=mistral_llm)
# olama_llm = ChatHuggingFace(llm=olama)

# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# gemini = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0
# )

# # -------------------
# # Prompt Template
# # -------------------
# prompt = ChatPromptTemplate.from_messages([
#     ("system", 
#      "You are SkillAmigo's AI Agent. "
#      "You can book chats, arrange bargains on the user’s behalf, and assist them extensively. "
#      "You are an official AI representative of SkillAmigo, a platform for exchanging services. "
#      "Always be polite, efficient, and proactive. "
#      "You can ask questions if you want to know more about the user or query."),
#     ("human", "{user_input}")
# ])

# # -------------------
# # New LangChain v2 Pipeline
# # -------------------
# # Instead of LLMChain(llm=gemini, prompt=prompt)
# chain = prompt | gemini

# def llm_chain(user_input):
#     response = chain.invoke({"user_input": user_input})
#     return response.content  # response is a ChatMessage

# def get_llm():
#     return gemini
