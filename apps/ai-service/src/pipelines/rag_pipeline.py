from langchain_ollama import ChatOllama

def answer_question(store, question: str, base_url: str):
    retriever = store.as_retriever(search_kwargs={"k": 5})
    docs = retriever.invoke(question)
    context = "\n\n".join([d.page_content for d in docs])
    prompt = f"""You are the AEMS enterprise assistant. Use context only.\nQuestion: {question}\nContext:\n{context}\nAnswer with concise actionable bullet points and mention if data is insufficient."""
    llm = ChatOllama(model="llama3.1", base_url=base_url, temperature=0.2)
    response = llm.invoke(prompt)
    citations = [d.metadata.get("source", "unknown") for d in docs]
    return {"answer": response.content, "citations": citations}
