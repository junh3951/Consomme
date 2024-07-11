import os
import pandas as pd
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import re

# YouTube Data API 키
API_KEY = 'AIzaSyACRCCMi76L6B5Qbm5Rxbcva4iKjJJfQ4k'

# API 클라이언트 생성
youtube = build('youtube', 'v3', developerKey=API_KEY)

# 검색 키워드 설정
search_keyword = "여행"

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
    channel_id = item['snippet']['channelId']
    channel_title = item['snippet']['channelTitle']
    if any('\u3131' <= char <= '\uD79D' for char in title):  # 제목에 한국어 포함 확인
        videos.append({'videoId': video_id, 'title': title, 'description': description, 'channelId': channel_id, 'channelTitle': channel_title})

# 채널 정보 조회를 위한 channelId 목록 추출
channel_ids = list(set([video['channelId'] for video in videos]))

# 채널 정보 조회 함수
def get_channel_info(channel_ids):
    channels = []
    for i in range(0, len(channel_ids), 50):
        response = youtube.channels().list(
            part='snippet,statistics',
            id=','.join(channel_ids[i:i+50])
        ).execute()
        
        for item in response['items']:
            channels.append({
                'channelId': item['id'],
                'channelTitle': item['snippet']['title'],
                'subscriberCount': int(item['statistics'].get('subscriberCount', 0))
            })
    return channels

# 채널 정보 조회
channels_info = get_channel_info(channel_ids)

# DataFrame으로 변환 및 구독자 수 기준 정렬
df_channels = pd.DataFrame(channels_info)
df_channels = df_channels.sort_values(by='subscriberCount', ascending=False).reset_index(drop=True)

# 상위 5개 채널 선택
top_channels = df_channels.head(5)
print(top_channels)

# 상위 5개 채널 ID 추출
top_channel_ids = top_channels['channelId'].tolist()
print(f"상위 5개 채널 ID: {top_channel_ids}")
