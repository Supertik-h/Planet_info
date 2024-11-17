import streamlit as st
import pandas as pd
from datetime import datetime
import plotly.express as px
from utils.news_fetcher import fetch_space_news, format_news
from utils.planet_data import load_planet_data, get_planet_info

# Page configuration
st.set_page_config(
    page_title="Space Dashboard",
    page_icon="🚀",
    layout="wide"
)

# Load custom CSS
with open('assets/custom.css') as f:
    st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

# Initialize session state for missions
if 'missions' not in st.session_state:
    st.session_state.missions = []

# Main layout
st.title("🚀 Space Dashboard")

# Create three columns for layout
col1, col2 = st.columns([1, 1])

# Earth News Section
with col1:
    st.header("Earth News")
    news_articles = fetch_space_news()
    
    for article in news_articles:
        formatted_article = format_news(article)
        with st.container():
            st.markdown(f"### {formatted_article['title']}")
            if formatted_article['image_url']:
                st.image(formatted_article['image_url'])
            st.write(formatted_article['summary'])
            st.write(f"Published: {formatted_article['published_date']}")
            st.markdown(f"[Read more]({formatted_article['url']})")
            st.divider()

# Planet Information Section
    st.header("Planet Information")
    planets_df = load_planet_data()
    selected_planet = st.selectbox(
        "Select a planet",
        options=planets_df['name'].tolist()
    )
    
    planet_info = get_planet_info(selected_planet)
    if planet_info:
        st.markdown(f"### {planet_info['name']}")
        st.write(f"**Distance from Earth:** {planet_info['distance']} million km")
        st.write(f"**Climate:** {planet_info['climate']}")
        st.write(f"**Inhabitability:** {planet_info['inhabitability']}")
        st.write(f"**Description:** {planet_info['description']}")

# Missions Timeline Section
with col2:
    st.header("Missions")
    
    # Add new mission
    with st.form("new_mission"):
        mission_name = st.text_input("Mission Name")
        mission_date = st.date_input("Mission Date")
        mission_description = st.text_area("Mission Description")
        submitted = st.form_submit_button("Add Mission")
        
        if submitted and mission_name:
            st.session_state.missions.append({
                "name": mission_name,
                "date": mission_date,
                "description": mission_description,
                "completed": False
            })

    # Display missions timeline
    st.subheader("Timeline")
    if st.session_state.missions:
        # Create timeline data
        timeline_data = pd.DataFrame(st.session_state.missions)
        fig = px.timeline(
            timeline_data,
            x_start="date",
            y="name",
            color="completed",
            title="Mission Timeline"
        )
        st.plotly_chart(fig)

        # Display mission list
        for idx, mission in enumerate(st.session_state.missions):
            col1, col2 = st.columns([4, 1])
            with col1:
                st.write(f"**{mission['name']}**")
                st.write(f"Date: {mission['date']}")
                st.write(mission['description'])
            with col2:
                if st.checkbox("Complete", key=f"mission_{idx}", 
                             value=mission['completed']):
                    st.session_state.missions[idx]['completed'] = True
