# from agent import get_data,got_only_search_batch
# from model import llm_chain, get_llm

# def searching(api_prompt):

#     # Extract data from the API prompt
#     extracted = get_data(api_prompt)
#     print(f"Extracted data: {extracted}")
#     # If it needs search, perform the search
#     print(f"Performing search for query: {extracted['query']}")
#     if extracted['needs_search']=="false":
#         return extracted;
#     else:
#         print("searching on users")
#         response=got_only_search_batch(extracted['query'])
#     if response.get("success") == False:
#         return {
#             "error": "Failed to perform search",
#             "details": response.get("error", "Unknown error"),
#             "msg": f"Some error occured while searching for you, please try again later",
#             "success": False
#         }
#     return {
#         "extracted": extracted,
#         "data": response.get("pinecone_results", []),
#         "success": True
#     }


# from agent import process_request

# def searching(api_prompt: str):
#     """
#     This function passes the user message to the agent decision engine
#     and returns either:
#     - An API call to hit (for batch data)
#     - Or a normal AI response
#     """

#     result = process_request(api_prompt)

#     # ✅ If backend API is needed (batch request)
#     if result.get("needs_api") is True:
#         return {
#             "success": True,
#             "type": "api_call",
#             "api_call": result.get("api_call")
#         }

#     # ✅ If normal AI chat response
#     return {
#         "success": True,
#         "type": "ai_response",
#         "response": result.get("response")
#     }


# from agent import process_request

# def searching(msg: str, history: list | None = None):
#     """
#     Passes msg + history to agent and returns:
#     - API call + friendly message
#     - OR AI-only polite reply
#     """

#     result = process_request(msg, history)

#     # ✅ If backend API is needed
#     if result.get("needs_api") is True:
#         return {
#             "success": True,
#             "type": "api_call",
#             "message": result.get("message"),
#             "api_call": result.get("api_call")
#         }

#     # ✅ Normal AI reply
#     return {
#         "success": True,
#         "type": "ai_response",
#         "response": result.get("response")
#     }

from agent import process_request

def searching(api_prompt: str, history=None):
    """
    Takes user query + optional history
    Uses the agent to decide:
    - Should the backend API be hit?
    - Or LLM respond directly?
    """

    result = process_request(api_prompt)

    # If backend API is needed (batch fetch)
    if result.get("needs_api") is True:
        return {
            "success": True,
            "type": "api_call",
            "message": result.get("message"),  # LLM generated
            "api_call": result.get("api_call")
        }

    # Otherwise normal chat
    return {
        "success": True,
        "type": "ai_response",
        "response": result.get("response")
    }
