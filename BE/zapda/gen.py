import openai
import pandas as pd
import re

# OpenAI API 키 설정
openai.api_key = 'sk-proj-M3Yd7YWki3iQZZCEBk10T3BlbkFJlAkrqOm0qk1IN3SFE99p'

# CSV 파일 읽기
def read_csv(filename):
    df = pd.read_csv(filename, encoding='utf-8-sig')
    return df['title'].tolist()

# 특수 문자 제거 함수
def sanitize_filename(filename):
    return re.sub(r'[^a-zA-Z0-9가-힣_]', '_', filename)

# 키워드 기반 파일명 생성
search_keyword = "먹방"
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