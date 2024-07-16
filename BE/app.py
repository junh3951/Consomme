import os
from flask import Flask, request, jsonify
import pandas as pd
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import re
import openai
from collections import Counter
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# API 키 설정
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# OpenAI API 키 설정
openai.api_key = OPENAI_API_KEY

# API 클라이언트 생성
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

app = Flask(__name__)

def fetch_videos(query, max_results=100):
    today = datetime.utcnow()
    last_month = today - timedelta(days=30)
    published_after = last_month.strftime('%Y-%m-%dT%H:%M:%SZ')
    published_before = today.strftime('%Y-%m-%dT%H:%M:%SZ')
    
    videos = []
    next_page_token = None
    while len(videos) < max_results:
        response = youtube.search().list(
            q=query,
            part='snippet',
            type='video',
            regionCode='KR',
            relevanceLanguage='ko',
            publishedAfter=published_after,
            publishedBefore=published_before,
            maxResults=min(50, max_results - len(videos)),
            pageToken=next_page_token
        ).execute()
        videos.extend(response['items'])
        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break
    return videos

def process_video_items(items, video_list):
    for item in items:
        video_id = item['id']['videoId']
        title = item['snippet']['title']
        description = item['snippet']['description']
        if any('\u3131' <= char <= '\uD79D' for char in title):  # 제목에 한국어 포함 확인
            video_list.append({'videoId': video_id, 'title': title, 'description': description})

def fetch_video_details(video_ids):
    details = []
    for i in range(0, len(video_ids), 50):
        response = youtube.videos().list(
            part='snippet,statistics',
            id=','.join(video_ids[i:i+50])
        ).execute()
        details.extend(response['items'])
    return details

def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9가-힣_]', '_', filename)

def generate_trending_titles(titles, chosen_keyword, search_keyword):
    messages = [
        {"role": "system", "content": 
        "###임무### 너는 다양한 콘텐츠 소재를 상황과 트렌드에 기반하여 생성해주는 것이 너의 역할이야 \
            ###입력### csv파일에서 특정 keyword와 관련된 영상들의 제목들이 입력될거야\
            관심 있는 키워드와 참고하고 싶은 유튜버와 관련된 영상 정보를 받게 될거야\
            그리고 디테일 이라는 문장을 입력받게 될거야 이렇게 주어진 유튜브 영상 제목들과 유튜버와 관련된 영상 정보와 디테일을 바탕으로 신박한 콘텐츠 소재를 제공해야해\
            ###예시출력### 소재: 몽골로 민박 스탭으로 일하며 단돈 150만원으로 한달살기하기 소재 추천 이유: 현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다. 특히, 한달살기 콘텐츠에서 두드러지는 트렌드 요소인 ‘민박 스탭'으로 일하는 것은 어떨까요? 해당 이유로 위와 같은 소재를 추천드립니다"},
        {"role": "user", "content": f"다음은 최근 한 달간의 유튜브 영상 제목입니다:\n\n{titles}\n\n다음은 user의 관심있는 키워드: {search_keyword}\n\n그리고 다음은 키워드 분석을 통해 나온 상위 7개의 키워드입니다:\n\n{chosen_keyword}\n\n이 제목들과 키워드들을 바탕으로 트렌드가 될 수 있는 콘텐츠 소재를 신박하고 자극적으로 3개 추천해 주고 소재 추천 이유도 기재해줘."}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=1000,
        n=1,
        temperature=0.7
    )
    
    return response.choices[0].message['content'].strip()

@app.route('/search', methods=['POST'])
def search_videos():
    data = request.json
    search_keyword = data.get('search_keyword')
    category = data.get('category')

    response_keyword = fetch_videos(search_keyword, 100)
    response_category = fetch_videos(category, 100)

    videos_keyword = []
    videos_category = []

    process_video_items(response_keyword, videos_keyword)
    process_video_items(response_category, videos_category)

    video_ids_keyword = [video['videoId'] for video in videos_keyword]
    video_ids_category = [video['videoId'] for video in videos_category]

    videos_response_keyword = fetch_video_details(video_ids_keyword)
    videos_response_category = fetch_video_details(video_ids_category)

    for video, video_info in zip(videos_keyword, videos_response_keyword):
        video['channelTitle'] = video_info['snippet']['channelTitle']
        video['channelSubscribers'] = video_info['statistics'].get('subscriberCount', 'Unknown')
        video['viewCount'] = video_info['statistics']['viewCount']

    for video, video_info in zip(videos_category, videos_response_category):
        video['channelTitle'] = video_info['snippet']['channelTitle']
        video['channelSubscribers'] = video_info['statistics'].get('subscriberCount', 'Unknown')
        video['viewCount'] = video_info['statistics']['viewCount']

    df_keyword = pd.DataFrame(videos_keyword)
    df_category = pd.DataFrame(videos_category)
    df_keyword = df_keyword[['title', 'description', 'channelTitle', 'channelSubscribers', 'viewCount']]
    df_category = df_category[['title', 'description', 'channelTitle', 'channelSubscribers', 'viewCount']]

    df_keyword['viewCount'] = df_keyword['viewCount'].astype(int)
    df_category['viewCount'] = df_category['viewCount'].astype(int)

    filename_keyword = sanitize_filename(search_keyword) + '_youtube_videos.csv'
    filename_category = sanitize_filename(category) + '_youtube_videos.csv'

    df_keyword.to_csv(filename_keyword, index=False, encoding='utf-8-sig')
    df_category.to_csv(filename_category, index=False, encoding='utf-8-sig')

    titles_category = df_category['title'].tolist()
    all_words_category = ' '.join(titles_category).split()
    words_filtered_category = [word for word in all_words_category if len(word) > 1]
    word_freq_category = Counter(words_filtered_category)
    top_keywords_category = [word for word, freq in word_freq_category.most_common(7)]

    return jsonify({
        'message': '검색 및 파일 저장 완료',
        'filename_keyword': filename_keyword,
        'filename_category': filename_category,
        'top_keywords_category': top_keywords_category
    })

@app.route('/generate', methods=['POST'])
def generate_titles():
    data = request.json
    search_keyword = data.get('search_keyword')
    category = data.get('category')
    chosen_keyword = data.get('chosen_keyword')

    titles_category = pd.read_csv(sanitize_filename(category) + '_youtube_videos.csv')['title'].tolist()
    titles_str_category = '\n'.join(titles_category)
    trending_titles_category = generate_trending_titles(titles_str_category, chosen_keyword, search_keyword)

    return jsonify({
        'trending_titles_category': trending_titles_category
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)