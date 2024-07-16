import os
import pandas as pd
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import re
import openai
from collections import Counter

# YouTube Data API 키
API_KEY = 'AIzaSyBmy9xL0wEjA125EetQ87Ehwbz3Lcg7EJ0'
# OpenAI API 키 설정
openai.api_key = 'sk-proj-3i9E2CfzcAlR7X5pJyW1T3BlbkFJJvTsKaTF14TIc8w7Datv'

# API 클라이언트 생성
youtube = build('youtube', 'v3', developerKey=API_KEY)

# 검색 키워드와 카테고리 입력
search_keyword = input("검색 키워드를 입력하세요: ")
category = input("유튜브 카테고리를 입력하세요 (예: 여행, 음식, 게임 등): ")

# 최근 한 달간의 날짜 범위 계산
today = datetime.utcnow()
last_month = today - timedelta(days=30)
published_after = last_month.strftime('%Y-%m-%dT%H:%M:%SZ')
published_before = today.strftime('%Y-%m-%dT%H:%M:%SZ')

# API 요청 (비디오 검색)
def fetch_videos(query, max_results=100):
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

# 첫 번째 검색: 키워드
response_keyword = fetch_videos(search_keyword, 100)
# 두 번째 검색: 카테고리
response_category = fetch_videos(category, 100)

# 결과 저장 리스트 초기화
videos_keyword = []
videos_category = []

# API 응답에서 필요한 정보 추출
def process_video_items(items, video_list):
    for item in items:
        video_id = item['id']['videoId']
        title = item['snippet']['title']
        description = item['snippet']['description']
        if any('\u3131' <= char <= '\uD79D' for char in title):  # 제목에 한국어 포함 확인
            video_list.append({'videoId': video_id, 'title': title, 'description': description})

# 첫 번째 검색 결과 처리
process_video_items(response_keyword, videos_keyword)
# 두 번째 검색 결과 처리
process_video_items(response_category, videos_category)

# 채널 정보 조회를 위한 videoId 목록 추출
video_ids_keyword = [video['videoId'] for video in videos_keyword]
video_ids_category = [video['videoId'] for video in videos_category]

# 비디오 ID를 50개씩 나누어 요청
def fetch_video_details(video_ids):
    details = []
    for i in range(0, len(video_ids), 50):
        response = youtube.videos().list(
            part='snippet,statistics',
            id=','.join(video_ids[i:i+50])
        ).execute()
        details.extend(response['items'])
    return details

# 비디오 상세 정보 가져오기
videos_response_keyword = fetch_video_details(video_ids_keyword)
videos_response_category = fetch_video_details(video_ids_category)

# 비디오 정보 업데이트 (채널 제목, 구독자 수, 조회수)
for video, video_info in zip(videos_keyword, videos_response_keyword):
    video['channelTitle'] = video_info['snippet']['channelTitle']
    video['channelSubscribers'] = video_info['statistics'].get('subscriberCount', 'Unknown')
    video['viewCount'] = video_info['statistics']['viewCount']

for video, video_info in zip(videos_category, videos_response_category):
    video['channelTitle'] = video_info['snippet']['channelTitle']
    video['channelSubscribers'] = video_info['statistics'].get('subscriberCount', 'Unknown')
    video['viewCount'] = video_info['statistics']['viewCount']

# DataFrame으로 변환
df_keyword = pd.DataFrame(videos_keyword)
df_category = pd.DataFrame(videos_category)
df_keyword = df_keyword[['title', 'description', 'channelTitle', 'channelSubscribers', 'viewCount']]  # 필요한 열 선택
df_category = df_category[['title', 'description', 'channelTitle', 'channelSubscribers', 'viewCount']]  # 필요한 열 선택

# 'viewCount' 열을 int 형식으로 변환
df_keyword['viewCount'] = df_keyword['viewCount'].astype(int)
df_category['viewCount'] = df_category['viewCount'].astype(int)

# 검색 키워드를 파일명에 사용
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9가-힣_]', '_', filename)

filename_keyword = sanitize_filename(search_keyword) + '_youtube_videos.csv'
filename_category = sanitize_filename(category) + '_youtube_videos.csv'

# CSV 파일로 저장
df_keyword.to_csv(filename_keyword, index=False, encoding='utf-8-sig')
df_category.to_csv(filename_category, index=False, encoding='utf-8-sig')

print(f'{len(videos_keyword)}개의 키워드 관련 비디오를 {filename_keyword} 파일에 저장했습니다.')
print(f'{len(videos_category)}개의 카테고리 관련 비디오를 {filename_category} 파일에 저장했습니다.')

# 키워드 분석 (카테고리 파일에서)
titles_category = df_category['title'].tolist()
all_words_category = ' '.join(titles_category).split()
words_filtered_category = [word for word in all_words_category if len(word) > 1]  # 한 글자 단어 제외
word_freq_category = Counter(words_filtered_category)
top_keywords_category = [word for word, freq in word_freq_category.most_common(7)]
print(f"카테고리 분석 결과 상위 7개 키워드: {top_keywords_category}")

# 유저가 상위 7개 키워드 중 하나 선택
chosen_keyword = input(f"상위 7개 키워드 중 하나를 선택하세요 {top_keywords_category}: ")

# 트렌드 제목 생성 함수
def generate_trending_titles(titles, chosen_keyword, n=3):
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

# 제목 리스트를 문자열로 변환 (카테고리)
titles_str_category = '\n'.join(titles_category)

# 트렌드 제목 생성 (카테고리)
trending_titles_category = generate_trending_titles(titles_str_category, chosen_keyword)
print(f"추천된 트렌드 영상 제목들: {trending_titles_category}")

# 유저의 선택과 디테일 입력 받기
def get_user_choice_and_detail():
    chosen_index = int(input("추천된 소재 중 하나를 선택하세요 (1, 2, 3): ")) - 1
    detail_input = input("디테일을 입력하세요: ")
    return chosen_index, detail_input

# 최종 추천 생성 함수
def generate_final_recommendation(search_keyword, category, chosen_title, details):
    messages = [
        {"role": "system", "content": 
         "###임무### 너는 다양한 콘텐츠 소재를 상황과 트렌드에 기반하여 생성해주는 것이 너의 역할이야 \
            ###입력### \
            user가 추천된 소재 중 하나를 선택할거야\
            디테일 이라는 문장을 입력받게 될 것이고, 선택된 추천 소재의 내용을 가져가면서 디테일에 해당하는 소재만 수정해서 한글로 소재를 재구성 해야해\
            ###예시출력### 소재: 몽골로 민박 스탭으로 일하며 단돈 150만원으로 한달살기하기 소재 추천 이유: 현재 227만 구독자를 보유한 빠니보틀이 몽골로 여행을 간 영상이 175만회라는 조회수를 기록하며 큰 인기를 끌고 있습니다. 더불어, 현재 한달살기 컨텐츠로 'n만원으로 살아남기' 소재가 유행하는 트렌드임에 주목해 해당 영상 소재를 추천드립니다. 특히, 한달살기 콘텐츠에서 두드러지는 트렌드 요소인 ‘민박 스탭'으로 일하는 것은 어떨까요? 해당 이유로 위와 같은 소재를 추천드립니다"},
        {"role": "user", "content": f"선택된 추천 소재: {chosen_title}\n\n\n유저가 선택한 키워드:\n\n{chosen_keyword}\n검색 키워드: {search_keyword}\n\n디테일: {details}\n\n이 내용을 바탕으로 선택된 추천 소재가 검색 키워드의 내용을 벗어나지 않는 선에서 전체적인 내용을 유지하면서 detail 부분을 참고하여 수정해서 최종 추천 콘텐츠 소재를 신박하고 자극적으로 재구성해주고 추천 이유는 간략하게 설명해줘."}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=messages,
        max_tokens=500,
        n=1,
        temperature=0.7
    )
    
    return response.choices[0].message['content'].strip()

chosen_index, detail_input = get_user_choice_and_detail()
chosen_title = trending_titles_category.split('\n')[chosen_index]
details = detail_input

while True:
    # 최종 추천 생성
    final_recommendation = generate_final_recommendation(search_keyword, category, chosen_title, details)
    
    print(f"최종 추천된 트렌드 영상 제목: {final_recommendation}")
    
    continue_choice = input("계속해서 디테일을 추가하시겠습니까? (yes/no): ").strip().lower()
    if continue_choice == 'no':
        break
    
    detail_input = input("추가 디테일을 입력하세요: ")
    details += f", {detail_input}"

match = re.search(r'소재:\s*(.*)', final_recommendation)
if match:
    final_search_video = match.group(1)
else:
    final_search_video = None

# 최종 추천된 트렌드 영상 제목을 바탕으로 연관된 영상 검색
def fetch_related_videos(final_search_video):
    response = youtube.search().list(
        q=final_search_video,
        part='snippet',
        type='video',
        regionCode='KR',
        relevanceLanguage='ko',
        maxResults=50
    ).execute()
    
    related_videos = []
    
    for item in response['items']:
        video_id = item['id']['videoId']
        title = item['snippet']['title']
        if any('\u3131' <= char <= '\uD79D' for char in title):  # 제목에 한국어 포함 확인
            related_videos.append({'videoId': video_id, 'title': title})
    
    return related_videos

related_videos = fetch_related_videos(final_search_video)
related_video_ids = ','.join([video['videoId'] for video in related_videos])

# 연관된 비디오의 상세 정보 조회
related_videos_response = fetch_video_details(related_video_ids.split(','))

# 최소 조회수 30만 이상의 비디오만 필터링
filtered_videos = []
for item in related_videos_response:
    view_count = int(item['statistics']['viewCount'])
    if view_count >= 300000:
        filtered_videos.append({
            'videoId': item['id'],
            'title': item['snippet']['title'],
            'viewCount': view_count,
            'channelTitle': item['snippet']['channelTitle'],
            'thumbnail': f"https://img.youtube.com/vi/{item['id']}/hqdefault.jpg",
            'videoLink': f"https://www.youtube.com/watch?v={item['id']}"
        })

# 키워드 관련 비디오에서 조회수 상위 2개 추출
top_videos_keyword = df_keyword.nlargest(2, 'viewCount')[['title', 'viewCount', 'channelTitle']]

# 상위 7개 키워드와 겹치는 키워드를 가진 카테고리 관련 비디오에서 조회수 상위 2개 추출
def find_videos_with_top_keywords(df, top_keywords):
    keyword_videos = df[df['title'].apply(lambda x: any(keyword in x for keyword in top_keywords))]
    top_videos = keyword_videos.nlargest(2, 'viewCount')[['title', 'viewCount', 'channelTitle']]
    return top_videos

top_videos_category = find_videos_with_top_keywords(df_category, top_keywords_category)

# 결과 병합
top_videos = pd.concat([top_videos_keyword, top_videos_category]).to_dict(orient='records')

# DataFrame으로 변환 및 저장
filtered_df = pd.DataFrame(filtered_videos)
filtered_filename = sanitize_filename(search_keyword + "_" + category) + '_final_youtube_videos.csv'
filtered_df.to_csv(filtered_filename, index=False, encoding='utf-8-sig')

print(f'{len(filtered_videos)}개의 관련 비디오를 {filtered_filename} 파일에 저장했습니다.')

# 상위 4개의 비디오 정보 출력 (링크와 썸네일 포함)
for i, video in enumerate(top_videos, start=1):
    print(f"추천 비디오 {i}")
    print(f"Title: {video['title']}")
    print(f"View Count: {video['viewCount']}")
    print(f"Channel Title: {video['channelTitle']}")
    video_id = related_videos[i-1]['videoId']
    print(f"Link: https://www.youtube.com/watch?v={video_id}")
    print(f"Thumbnail: https://img.youtube.com/vi/{video_id}/hqdefault.jpg")
    print()

