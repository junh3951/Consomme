import os
import pandas as pd
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import re
import openai
# YouTube Data API 키
API_KEY = 'AIzaSyACRCCMi76L6B5Qbm5Rxbcva4iKjJJfQ4k'
# OpenAI API 키 설정
openai.api_key = 'sk-proj-M3Yd7YWki3iQZZCEBk10T3BlbkFJlAkrqOm0qk1IN3SFE99p'

# API 클라이언트 생성
youtube = build('youtube', 'v3', developerKey=API_KEY)

# 검색 키워드 설정, 변수 통제는 여기서만 하면된다 사실상 input
search_keyword = "켠왕"

# 최근 한 달간의 날짜 범위 계산
today = datetime.utcnow()
last_month = today - timedelta(days=30)
published_after = last_month.strftime('%Y-%m-%dT%H:%M:%SZ')
published_before = today.strftime('%Y-%m-%dT%H:%M:%SZ')

# API 요청 (비디오 검색)
response = youtube.search().list(
    q=search_keyword,
    part='snippet',
    type='video',
    regionCode='KR',
    relevanceLanguage='ko',
    publishedAfter=published_after,
    publishedBefore=published_before,
    maxResults=50  # 1회 요청 시 최대 50개 결과 반환
).execute()

# 결과 저장 리스트 초기화
videos = []

# API 응답에서 필요한 정보 추출 (비디오 검색)
for item in response['items']:
    video_id = item['id']['videoId']
    title = item['snippet']['title']
    description = item['snippet']['description']
    if any('\u3131' <= char <= '\uD79D' for char in title):  # 제목에 한국어 포함 확인
        videos.append({'videoId': video_id, 'title': title, 'description': description})

# 채널 정보 조회를 위한 videoId 목록 추출
video_ids = ','.join([video['videoId'] for video in videos])

# API 요청 (비디오 상세 정보 - 채널, 조회수)
videos_response = youtube.videos().list(
    part='snippet,statistics',
    id=video_ids
).execute()

# 비디오 정보 업데이트 (채널 제목, 구독자 수, 조회수)
for video, video_info in zip(videos, videos_response['items']):
    video['channelTitle'] = video_info['snippet']['channelTitle']
    video['channelSubscribers'] = video_info['statistics'].get('subscriberCount', 'Unknown')
    video['viewCount'] = video_info['statistics']['viewCount']

# DataFrame으로 변환
df = pd.DataFrame(videos)
df = df[['title', 'description', 'channelTitle', 'channelSubscribers', 'viewCount']]  # 필요한 열 선택

# 검색 키워드를 파일명에 사용
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9가-힣_]', '_', filename)

filename = sanitize_filename(search_keyword) + '_youtube_videos.csv'

# CSV 파일로 저장
df.to_csv(filename, index=False, encoding='utf-8-sig')

print(f'{len(videos)}개의 비디오를 {filename} 파일에 저장했습니다.')

# CSV 파일 읽기
def read_csv(filename):
    df = pd.read_csv(filename, encoding='utf-8-sig')
    return df['title'].tolist()

# 특수 문자 제거 함수
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9가-힣_]', '_', filename)

filename = sanitize_filename(search_keyword) + '_youtube_videos.csv'

# CSV 파일에서 제목 읽기
titles = read_csv(filename)

# 트렌드 제목 생성 함수
def generate_trending_title(titles):
    messages = [
        {"role": "system", "content": 
         "  ###임무### 너는 다양한 콘텐츠 소재를 상황과 트렌드에 기반하여 생성해주는 것이 너의 역할이야 \
            ###입력### csv파일에서 특정 keyword와 관련된 영상들의 제목들이 입력될거야\
            관심 있는 키워드와 참고하고 싶은 유튜버와 관련된 영상 정보를 받게 될거야\
            그리고 디테일 이라는 문장을 입력받게 될거야 이렇게 주어진 유튜브 영상 제목들과 유튜버와 관련된 영상 정보와 디테일을 바탕으로 신박한 콘텐츠 소재를 제공해야해\
            ###예시출력### 소재: 몽골로 민박 스탭으로 일하며 단돈 150만원으로 한달살기하기 소재 추천 이유: 현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다. 특히, 한달살기 콘텐츠에서 두드러지는 트렌드 요소인 ‘민박 스탭'으로 일하는 것은 어떨까요? 해당 이유로 위와 같은 소재를 추천드립니다 "},
        {"role": "user", "content": f"다음은 최근 한 달간의 유튜브 영상 제목입니다:\n\n{titles}\n\n이 제목들을 바탕으로 트렌드가 될 수 있는 콘텐츠 소재를 추천해 주고 소재 추천 이유도 기재해줘."}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=500,
        n=1,
        temperature=0.7
    )
    
    return response.choices[0].message['content'].strip()

# 제목 리스트를 문자열로 변환
titles_str = '\n'.join(titles)

# 트렌드 제목 생성
trending_title = generate_trending_title(titles_str)

print(f"추천된 트렌드 영상 제목: {trending_title}")
