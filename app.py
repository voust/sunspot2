import streamlit as st
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

api_key = os.getenv("API_KEY")

st.title('Hello, world!')
st.write('This is a basic Streamlit app.')
st.write(f"API Key: {api_key}")
